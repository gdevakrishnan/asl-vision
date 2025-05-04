import React, { Fragment, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Play() {
  const videoRef = useRef(null);
  const [prediction, setPrediction] = useState('None');
  const [isPredicting, setIsPredicting] = useState(false);
  const [match, setMatch] = useState(false);
  const [randomWord, setRandomWord] = useState('');
  const intervalRef = useRef(null);

  const fetchRandomWord = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/random-word/`);
      console.log(response.data.random_word);
      setRandomWord(response.data.random_word);
    } catch (error) {
      console.error("Failed to fetch random word:", error);
    }
  };

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream
      })
      .catch(err => {
        console.error("Error accessing webcam:", err)
      })
  }, [])

  useEffect(() => {
    fetchRandomWord();
  }, []);

  useEffect(() => {
    if (match && prediction && prediction.toLowerCase() === randomWord.toLowerCase()) {
      alert(`🎉 Success! You correctly signed "${randomWord}"`);
      stopPredicting();
      fetchRandomWord();
    }
  }, [match, prediction, randomWord]);

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
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        // Optional: set multiple values
        console.log(response.data.predicted);
        setPrediction(response.data.predicted);
        setMatch(response.data.match);
      } catch (error) {
        console.error('Prediction error:', error);
      }
    }, 'image/png');
  };


  const startPredicting = () => {
    if (!isPredicting) {
      setIsPredicting(true)
      intervalRef.current = setInterval(() => {
        captureAndPredict()
      }, 2000)  // Predict every 2 seconds
    }
  }

  const stopPredicting = () => {
    setIsPredicting(false)
    setPrediction('None');
    clearInterval(intervalRef.current)
  }

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

        {
          (randomWord) && <h1 className='random_word'>Your word: <span>{randomWord}</span></h1>
        }

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
  )
}

export default Play