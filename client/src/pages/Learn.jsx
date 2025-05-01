import React, { Fragment, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Learn() {
  const videoRef = useRef(null)
  const [prediction, setPrediction] = useState('None')
  const [isPredicting, setIsPredicting] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream
      })
      .catch(err => {
        console.error("Error accessing webcam:", err)
      })
  }, [])

  const captureAndPredict = async () => {
    if (!videoRef.current) return

    const canvas = document.createElement('canvas')
    canvas.width = 640
    canvas.height = 480
    const context = canvas.getContext('2d')
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)

    canvas.toBlob(async (blob) => {
      const formData = new FormData()
      formData.append('file', blob, 'capture.png')

      try {
        const response = await axios.post('http://localhost:8000/predict/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        setPrediction(response.data.prediction)
      } catch (error) {
        console.error('Prediction error:', error)
      }
    }, 'image/png')
  }

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
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </Link>
          <h1>Learn ISL</h1>
        </header>
        
        <div className="try" style={{ marginBottom: "30px", padding: "10px 20px"}}>
          <p><span>What is you</span> name?</p>
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
  )
}

export default Learn