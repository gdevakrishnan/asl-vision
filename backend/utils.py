import os
import cv2
import time
import numpy as np
import mediapipe as mp

def load_data(data_dir, image_size=(64, 64), max_per_class=1000):
    X, y = [], []
    labels = sorted(os.listdir(data_dir))
    label_map = {label: i for i, label in enumerate(labels)}

    for label in labels:
        count = 0
        path = os.path.join(data_dir, label)
        if not os.path.isdir(path): continue

        for img_name in os.listdir(path):
            if count >= max_per_class: break
            img_path = os.path.join(path, img_name)
            img = cv2.imread(img_path)
            if img is None: continue
            img = cv2.resize(img, image_size)
            X.append(img)
            y.append(label_map[label])
            count += 1

    return np.array(X), np.array(y), label_map

# Create dataset folder if not exists
def create_folder(label):
    path = os.path.join("dataset", label)
    if not os.path.exists(path):
        os.makedirs(path)
    return path

# Capture hand images using MediaPipe and save them
def capture_hand_images(label, image_count=1000):
    mp_hands = mp.solutions.hands
    hands = mp_hands.Hands(static_image_mode=False, max_num_hands=1)
    mp_draw = mp.solutions.drawing_utils

    folder_path = create_folder(label)
    cap = cv2.VideoCapture(0)

    print(f"\nGet ready! Starting in 10 seconds...")
    time.sleep(10)
    print("Capturing images...")

    count = 0
    while count < image_count:
        ret, frame = cap.read()
        if not ret:
            continue

        img_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = hands.process(img_rgb)

        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                x_min = min([lm.x for lm in hand_landmarks.landmark])
                x_max = max([lm.x for lm in hand_landmarks.landmark])
                y_min = min([lm.y for lm in hand_landmarks.landmark])
                y_max = max([lm.y for lm in hand_landmarks.landmark])

                h, w, _ = frame.shape
                x1, y1 = int(x_min * w) - 20, int(y_min * h) - 20
                x2, y2 = int(x_max * w) + 20, int(y_max * h) + 20

                x1, y1 = max(0, x1), max(0, y1)
                x2, y2 = min(w, x2), min(h, y2)

                roi = frame[y1:y2, x1:x2]
                if roi.size == 0:
                    continue

                roi_resized = cv2.resize(roi, (64, 64))
                cv2.imwrite(os.path.join(folder_path, f"{label}_{count}.jpg"), roi_resized)
                count += 1

                mp_draw.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)
                cv2.putText(frame, f"Capturing {count}/{image_count}", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,255,0), 2)

        cv2.imshow("Capture", frame)
        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

    cap.release()
    cv2.destroyAllWindows()
    print(f"\n✅ Done! {count} images saved under folder: dataset/{label}")

# Example usage
if __name__ == "__main__":
    word = input("Enter the label for this hand gesture (e.g. a, b, hello): ").strip().lower()
    capture_hand_images(label=word)
