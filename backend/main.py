# main.py
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import numpy as np
import cv2
import mediapipe as mp
import tensorflow as tf
from collections import deque

app = FastAPI()

# Allow React frontend to access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development; restrict later for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model and labels
model = tf.keras.models.load_model('./models/asl_cnn_model.h5')
label_map = np.load("models/label_map.npy", allow_pickle=True).item()
inv_label_map = {v: k for k, v in label_map.items()}

# Mediapipe Hands
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(max_num_hands=1)
mp_draw = mp.solutions.drawing_utils

# Prediction queue for smoothing
prediction_queue = deque(maxlen=10)

@app.get("/")
async def root():
    return {"message": "ASL Model API is running!"}

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    if frame is None:
        return JSONResponse(content={"error": "Invalid image"}, status_code=400)

    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = hands.process(frame_rgb)

    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            h, w, _ = frame.shape
            x_min, y_min = w, h
            x_max, y_max = 0, 0

            for lm in hand_landmarks.landmark:
                x, y = int(lm.x * w), int(lm.y * h)
                x_min = min(x_min, x)
                y_min = min(y_min, y)
                x_max = max(x_max, x)
                y_max = max(y_max, y)

            # Add some padding
            offset = 20
            x_min = max(x_min - offset, 0)
            y_min = max(y_min - offset, 0)
            x_max = min(x_max + offset, w)
            y_max = min(y_max + offset, h)

            roi = frame[y_min:y_max, x_min:x_max]

            if roi.size == 0:
                continue

            img = cv2.resize(roi, (64, 64))
            img = img.astype('float32') / 255.0
            img = np.expand_dims(img, axis=0)

            pred = model.predict(img)[0]
            predicted_label = inv_label_map[np.argmax(pred)]
            prediction_queue.append(predicted_label)

        # Most common prediction
        label = max(set(prediction_queue), key=prediction_queue.count)

        return JSONResponse(content={"prediction": label})

    else:
        return JSONResponse(content={"prediction": "No Hand Detected"})
