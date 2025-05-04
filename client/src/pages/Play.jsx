import React, { Fragment, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

function Play() {
  const videoRef = useRef(null);
  const intervalRef = useRef(null);

  const [prediction, setPrediction] = useState('None');
  const [isPredicting, setIsPredicting] = useState(false);
  const [match, setMatch] = useState(false);
  const [randomWord, setRandomWord] = useState('');
  const [score, setScore] = useState(0);

  const { user } = useUser();
  const userId = user?.id;

  // Fetch random word
  const fetchRandomWord = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/random-word/`);
      console.log(response.data.random_word);
      setRandomWord(response.data.random_word);
    } catch (error) {
      console.error("Failed to fetch random word:", error);
    }
  };

  // Fetch current score
  const fetchScore = async () => {
    if (!userId) return;
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/get-score`, {
        params: { userId }
      });
      setScore(response.data.score);
    } catch (error) {
      console.error("Failed to fetch score:", error);
    }
  };

  // Update score by 1
  const updateScore = async () => {
    if (!userId) return;
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/update-score`, {
        userId
      });
      setScore(response.data.score); // Update local score
    } catch (error) {
      console.error("Failed to update score:", error);
    }
  };

  // Capture frame and predict
  const captureAndPredict = async () => {
    if (!videoRef.current || !randomWord) return;

    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append('file', blob, 'capture.png');

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/similar-prediction/?word=${encodeURIComponent(randomWord)}`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        setPrediction(response.data.predicted);
        setMatch(response.data.match);
      } catch (error) {
        console.error('Prediction error:', error);
      }
    }, 'image/png');
  };

  // Start interval prediction
  const startPredicting = () => {
    if (!isPredicting) {
      setIsPredicting(true);
      intervalRef.current = setInterval(() => {
        captureAndPredict();
      }, 2000);
    }
  };

  // Stop prediction
  const stopPredicting = () => {
    setIsPredicting(false);
    setPrediction('None');
    clearInterval(intervalRef.current);
  };

  // Handle success
  useEffect(() => {
    if (match && prediction.toLowerCase() === randomWord.toLowerCase()) {
      alert(`🎉 Success! You correctly signed "${randomWord}"`);
      stopPredicting();
      updateScore();
      fetchScore();
      fetchRandomWord();
    }
  }, [match, prediction, randomWord]);

  // On mount: setup video, fetch word & score
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch(err => {
        console.error("Error accessing webcam:", err);
      });

    fetchRandomWord();
    fetchScore();
  }, [userId]);

  return (
    <Fragment>
      <div className="learn-container">
        <header className="learn-header">
          <Link to="/" className="back-link">
            <svg className="back-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1>Play ISL</h1>
        </header>

        <div className="score-word-container">
          {randomWord && (
            <h1 className="random-word">Your word: <span>{randomWord}</span></h1>
          )}
          {score !== null && (
            <h1 className="score">Your score: <span>{score}</span></h1>
          )}
        </div>

        <div className="video-container">
          <video ref={videoRef} autoPlay muted className="webcam-feed" />
          <div className="prediction-overlay">
            <div className="prediction-card">
              <span className="prediction-label">Current Sign:</span>
              <span className="prediction-value">{prediction}</span>
            </div>
          </div>
        </div>

        <div className="controls">
          <button
            className={`control-button ${isPredicting ? 'disabled' : 'start'}`}
            onClick={startPredicting}
            disabled={isPredicting}
          >
            Start Recognition
          </button>
          <button
            className={`control-button ${!isPredicting ? 'disabled' : 'stop'}`}
            onClick={stopPredicting}
            disabled={!isPredicting}
          >
            Stop Recognition
          </button>
        </div>

        <div className="instructions">
          <h3>Instructions:</h3>
          <ol>
            <li>Position your hand clearly in view of the camera</li>
            <li>Click "Start Recognition" to begin detecting signs</li>
            <li>Hold each sign steady for best results</li>
            <li>The recognized sign will appear above</li>
          </ol>
        </div>
      </div>
    </Fragment>
  );
}

export default Play;