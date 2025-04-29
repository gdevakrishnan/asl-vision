# ASL-VISION: ASL Learning and Detection App

This project is an American Sign Language (ASL) recognition system built using deep learning and computer vision technologies. The app allows users to learn ASL through real-time hand gesture recognition via webcam, using a pre-trained convolutional neural network (CNN) model.

## Project Overview

The ASL Learning and Detection App consists of two primary components:

1. **Backend (FastAPI)**: The backend is responsible for serving the ASL model and making predictions based on images sent from the frontend.
2. **Frontend (React)**: The frontend provides a user-friendly interface to allow users to interact with the ASL detection model in real-time via webcam input.

## Features

- **Real-time ASL Gesture Recognition**: The app captures the user's hand gestures using a webcam and predicts the corresponding ASL letter or sign.
- **Learn ASL**: Users can start the ASL learning process and test predictions using their webcam.
- **Prediction Feedback**: Predictions are updated every 2 seconds, with visual feedback of the model's detection on the screen.
- **Responsive UI**: The app is designed to be responsive, ensuring good usability on both desktop and mobile devices.

## Technologies Used

- **Backend**:
  - Python
  - FastAPI (Web Framework)
  - TensorFlow (Deep Learning Framework)
  - OpenCV (Computer Vision)
  - Mediapipe (Hand Gesture Detection)
  
- **Frontend**:
  - React.js
  - Axios (HTTP client for communication with the FastAPI backend)
  - CSS (for styling)

## Requirements

### Backend

- Python 3.7 or higher
- FastAPI
- TensorFlow
- OpenCV
- Mediapipe
- Uvicorn (ASGI server for FastAPI)

### Frontend

- Node.js (with npm or yarn)
- React.js

## Setup Instructions

### 1. Clone the Repository

Clone the project repository to your local machine.

```bash
git clone https://github.com/yourusername/asl-learning-detection.git
cd asl-learning-detection
```

### 2. Backend Setup

1. Navigate to the `server` folder:

   ```bash
   cd server
   ```

2. Create a virtual environment and activate it:

   ```bash
   python -m venv venv
   source venv/bin/activate  # For Windows, use `venv\Scripts\activate`
   ```

3. Install the required Python packages:

   ```bash
   pip install -r requirements.txt
   ```

4. Download or place your trained model (`asl_cnn_model.h5`) and label map (`label_map.npy`) into the appropriate folders (`./models/`).

5. Run the FastAPI server:

   ```bash
   uvicorn main:app --reload
   ```

   The server will start at `http://localhost:8000`.

### 3. Frontend Setup

1. Navigate to the `client` folder:

   ```bash
   cd client
   ```

2. Install the required Node.js packages:

   ```bash
   npm install
   ```

3. Start the React app:

   ```bash
   npm start
   ```

   The React app will start at `http://localhost:3000`.

### 4. Usage

1. Open the React app in your browser (`http://localhost:3000`).
2. On the **Dashboard** page, click "Start Learning" to navigate to the **Learn** page.
3. Grant access to your webcam when prompted.
4. Start making ASL hand gestures in front of the webcam. The model will detect and predict the corresponding ASL sign every 2 seconds.
5. The red indicator circle will pulse while the model is predicting.

### 5. Stopping the Prediction

- You can stop the prediction process by clicking the "Stop Prediction" button.

## Model Details

The model used for ASL gesture recognition is a Convolutional Neural Network (CNN) trained on hand gesture images. The model is designed to classify images into different ASL letters (A-Z). The model was trained using TensorFlow/Keras and is loaded using FastAPI to make predictions.

### Model File:
- `asl_cnn_model.h5`: Trained CNN model for ASL gesture recognition.
- `label_map.npy`: Label map that maps the model’s output to corresponding ASL letters.

## Notes

- Ensure that your webcam is working and accessible to the browser when using the app.
- The model's performance can be improved with more data, tuning, and hyperparameter adjustments.

## License

This project is open-source under the MIT License.
