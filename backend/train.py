import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
from tensorflow.keras.callbacks import EarlyStopping
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from utils import load_data

# -----------------------------
# Load and preprocess data
# -----------------------------
X, y, label_map = load_data("dataset", image_size=(64, 64), max_per_class=1000)
X = X / 255.0
y_cat = to_categorical(y, num_classes=len(label_map))

# -----------------------------
# Train/Validation/Test Split
# -----------------------------
X_trainval, X_test, y_trainval, y_test = train_test_split(
    X, y_cat, test_size=0.2, random_state=42, stratify=y_cat
)
X_train, X_val, y_train, y_val = train_test_split(
    X_trainval, y_trainval, test_size=0.1, random_state=42, stratify=y_trainval
)

# -----------------------------
# Data Augmentation
# -----------------------------
datagen = ImageDataGenerator(
    rotation_range=15,
    width_shift_range=0.1,
    height_shift_range=0.1,
    zoom_range=0.1,
    horizontal_flip=False  # Usually false for sign language
)
datagen.fit(X_train)

# -----------------------------
# Early Stopping
# -----------------------------
early_stopping = EarlyStopping(
    monitor='val_loss',
    patience=5,
    restore_best_weights=True,
    verbose=1
)

# -----------------------------
# Improved CNN Model
# -----------------------------
model = Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(64, 64, 3)),
    MaxPooling2D(2, 2),
    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D(2, 2),
    Conv2D(128, (3, 3), activation='relu'),
    MaxPooling2D(2, 2),
    Flatten(),
    Dense(256, activation='relu'),
    Dropout(0.5),
    Dense(len(label_map), activation='softmax')
])

# -----------------------------
# Compile Model
# -----------------------------
model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# -----------------------------
# Train the Model
# -----------------------------
history = model.fit(
    datagen.flow(X_train, y_train, batch_size=32),
    epochs=75,
    validation_data=(X_val, y_val),
    callbacks=[early_stopping]
)

# -----------------------------
# Evaluate the Model
# -----------------------------
test_loss, test_acc = model.evaluate(X_test, y_test)
print(f"\n✅ Test Accuracy: {test_acc:.4f}")

# -----------------------------
# Classification Report
# -----------------------------
y_pred = model.predict(X_test)
y_true = np.argmax(y_test, axis=1)
y_pred_classes = np.argmax(y_pred, axis=1)

print("\n🔍 Classification Report:")
print(classification_report(y_true, y_pred_classes, target_names=list(label_map.keys())))

# -----------------------------
# Save Model and Labels
# -----------------------------
model.save('models/isl_cnn_model.h5')
np.save('models/label_map.npy', label_map)

print("✅ Model and label map saved successfully.")
