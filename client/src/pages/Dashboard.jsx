// Dashboard.jsx
import { useState } from 'react';
import { Hand } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="hero-container">
      {/* Left Side - Content */}
      <div className="hero-content">
        <div className="hero-title-container">
          <Hand className="hero-icon" size={60} />
          <h1 className="hero-title">ISL Vision</h1>
        </div>

        <p className="hero-tagline">
          Your gateway to Indian Sign Language fluency
        </p>

        <p className="hero-description">
          ISL Vision is an innovative platform designed to make learning Indian Sign Language accessible,
          engaging, and effective. Through interactive lessons, real-time feedback, and a supportive community,
          we're breaking down communication barriers one sign at a time.
        </p>

        <div className="hero-buttons">
          <Link to={'/learn'} >
            <button
              className="primary-button"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Start Learning Now
            </button>
          </Link>
          <button className="secondary-button">
            Learn More
          </button>
        </div>
      </div>

      {/* Right Side - SVG Illustration */}
      <div className="hero-illustration">
        <svg
          viewBox="0 0 500 400"
          xmlns="http://www.w3.org/2000/svg"
          className="hero-svg"
        >
          {/* Background circle */}
          <circle cx="250" cy="200" r="180" fill="#f0f9ff" />

          {/* Hand silhouette */}
          <g transform="translate(150, 50) scale(0.8)">
            {/* Palm */}
            <path
              d="M160,240 Q180,280 200,320 Q140,340 100,320 Q60,300 80,240 Q100,180 160,180 Q220,180 220,240 Q220,280 180,300 Z"
              fill="#3b82f6"
              opacity="0.9"
            />

            {/* Thumb */}
            <path
              d="M80,240 Q60,220 70,180 Q80,140 100,120 Q120,100 140,120 Q160,140 150,180 Z"
              fill="#2563eb"
              opacity="0.85"
            />

            {/* Index finger */}
            <path
              d="M160,180 Q160,140 170,100 Q180,60 200,40 Q220,20 235,40 Q250,60 240,100 Q230,140 220,180 Z"
              fill="#2563eb"
              opacity="0.85"
            />

            {/* Middle finger */}
            <path
              d="M200,170 Q210,130 215,90 Q220,50 240,30 Q260,10 275,30 Q290,50 285,90 Q280,130 270,170 Z"
              fill="#2563eb"
              opacity="0.85"
            />

            {/* Ring finger */}
            <path
              d="M240,180 Q245,140 245,100 Q245,60 265,40 Q285,20 300,40 Q315,60 305,100 Q295,140 280,180 Z"
              fill="#2563eb"
              opacity="0.85"
            />

            {/* Pinky */}
            <path
              d="M280,190 Q280,160 275,130 Q270,100 280,70 Q290,40 310,50 Q330,60 325,100 Q320,140 310,190 Z"
              fill="#2563eb"
              opacity="0.85"
            />
          </g>

          {/* Circular motion lines */}
          <g className={isHovered ? "motion-lines active" : "motion-lines"}>
            <path d="M170,120 Q250,80 330,120" fill="none" stroke="#60a5fa" strokeWidth="3" strokeDasharray="5,5" />
            <path d="M150,150 Q250,100 350,150" fill="none" stroke="#60a5fa" strokeWidth="3" strokeDasharray="5,5" />
            <path d="M130,180 Q250,120 370,180" fill="none" stroke="#60a5fa" strokeWidth="3" strokeDasharray="5,5" />
          </g>

          {/* Sign language symbols */}
          <g transform="translate(380, 80)">
            <circle cx="0" cy="0" r="20" fill="#1d4ed8" />
            <text x="0" y="7" textAnchor="middle" fill="white" fontWeight="bold" fontSize="22">A</text>
          </g>

          <g transform="translate(400, 150)">
            <circle cx="0" cy="0" r="20" fill="#1d4ed8" />
            <text x="0" y="7" textAnchor="middle" fill="white" fontWeight="bold" fontSize="22">S</text>
          </g>

          <g transform="translate(390, 220)">
            <circle cx="0" cy="0" r="20" fill="#1d4ed8" />
            <text x="0" y="7" textAnchor="middle" fill="white" fontWeight="bold" fontSize="22">L</text>
          </g>

          {/* Decorative elements */}
          <g>
            <circle cx="120" cy="90" r="8" fill="#3b82f6" opacity="0.6" />
            <circle cx="380" cy="280" r="12" fill="#3b82f6" opacity="0.6" />
            <circle cx="320" cy="340" r="6" fill="#3b82f6" opacity="0.6" />
            <circle cx="150" cy="330" r="10" fill="#3b82f6" opacity="0.6" />
            <circle cx="410" cy="120" r="5" fill="#3b82f6" opacity="0.6" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Dashboard;