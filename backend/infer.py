import cv2
import numpy as np
import mediapipe as mp
from tensorflow.keras.models import load_model
from collections import deque
prediction_queue = deque(maxlen=10)

model = load_model("models/asl_cnn_model.h5")
label_map = np.load("models/label_map.npy", allow_pickle=True).item()
inv_label_map = {v: k for k, v in label_map.items()}

mp_hands = mp.solutions.hands
hands = mp_hands.Hands(max_num_hands=1)
mp_draw = mp.solutions.drawing_utils

cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = hands.process(frame_rgb)

    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            # Get bounding box of hand
            h, w, _ = frame.shape
            x_min = w
            y_min = h
            x_max = y_max = 0

            for lm in hand_landmarks.landmark:
                x, y = int(lm.x * w), int(lm.y * h)
                x_min = min(x_min, x)
                y_min = min(y_min, y)
                x_max = max(x_max, x)
                y_max = max(y_max, y)

            # Padding
            offset = 20
            x_min = max(x_min - offset, 0)
            y_min = max(y_min - offset, 0)
            x_max = min(x_max + offset, w)
            y_max = min(y_max + offset, h)

            # Extract ROI and predict
            roi = frame[y_min:y_max, x_min:x_max]
            if roi.size == 0:
                continue

            img = cv2.resize(roi, (64, 64))
            img = img / 255.0
            pred = model.predict(np.expand_dims(img, axis=0))[0]
            predicted_label = inv_label_map[np.argmax(pred)]
            prediction_queue.append(predicted_label)
            label = max(set(prediction_queue), key=prediction_queue.count)

            # Draw hand and prediction
            mp_draw.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)
            cv2.putText(frame, f"Prediction: {label}", (x_min, y_min - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2)
            cv2.rectangle(frame, (x_min, y_min), (x_max, y_max), (0, 255, 0), 2)

    cv2.imshow("ASL Recognition", frame)
    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

cap.release()
cv2.destroyAllWindows()
