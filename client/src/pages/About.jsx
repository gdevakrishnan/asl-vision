import { Hand, Video, Users, BookOpen, Award, MessageSquare } from 'lucide-react';

const About = () => {
  return (
    <div className="about-container">
      {/* Header Section */}
      <div className="about-header">
        <div className="about-header-content">
          <h1 className="about-title">About ASL Vision</h1>
          <div className="about-header-divider"></div>
          <p className="about-subtitle">
            Empowering communication through technology and accessibility
          </p>
        </div>
      </div>
      
      {/* Mission Section */}
      <section className="about-section mission-section">
        <div className="section-container">
          <h2 className="section-title">Our Mission</h2>
          <div className="section-content">
            <div className="mission-image">
              <svg 
                viewBox="0 0 300 300" 
                xmlns="http://www.w3.org/2000/svg"
                className="mission-svg"
              >
                <circle cx="150" cy="150" r="120" fill="#f0f9ff" />
                <g transform="translate(90, 70)">
                  <path 
                    d="M60,100 Q80,60 100,80 Q120,100 140,90 Q120,150 80,150 Q40,150 60,100 Z" 
                    fill="#3b82f6" 
                    opacity="0.9"
                  />
                  <path 
                    d="M70,80 Q60,40 80,30 Q100,20 110,50 Q120,80 100,80 Z" 
                    fill="#2563eb"
                    opacity="0.8"
                  />
                </g>
                <text x="150" y="220" textAnchor="middle" fill="#1e40af" fontWeight="bold" fontSize="24">ASL</text>
              </svg>
            </div>
            <div className="mission-text">
              <p>
                At ASL Vision, our mission is to break down communication barriers by making American 
                Sign Language education accessible to everyone. We believe that language should never 
                be a barrier to human connection.
              </p>
              <p>
                Through cutting-edge technology and thoughtful design, we aim to create an intuitive 
                learning experience that empowers users to communicate confidently in ASL, fostering 
                inclusivity and understanding between deaf and hearing communities.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="about-section features-section">
        <div className="section-container">
          <h2 className="section-title">Features & Learning Approach</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Video />
              </div>
              <h3 className="feature-title">Interactive Video Lessons</h3>
              <p className="feature-description">
                Learn from crystal-clear instructional videos featuring native ASL signers, with 
                multiple angles and speeds to perfect your technique.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <Hand />
              </div>
              <h3 className="feature-title">Real-time Feedback</h3>
              <p className="feature-description">
                Our computer vision technology analyzes your signing in real-time, providing 
                instant feedback to help you refine your movements and expressions.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <BookOpen />
              </div>
              <h3 className="feature-title">Structured Curriculum</h3>
              <p className="feature-description">
                Progress through carefully designed lessons that build upon each other, 
                from basic handshapes to complex conversations and storytelling.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <Users />
              </div>
              <h3 className="feature-title">Community Practice</h3>
              <p className="feature-description">
                Connect with other learners through our community platform for practice sessions, 
                challenges, and cultural exchange.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <Award />
              </div>
              <h3 className="feature-title">Achievement System</h3>
              <p className="feature-description">
                Stay motivated with our gamified learning approach, earning badges and certificates 
                as you advance through vocabulary and grammar milestones.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <MessageSquare />
              </div>
              <h3 className="feature-title">Conversational Practice</h3>
              <p className="feature-description">
                Apply what you've learned in simulated conversations with our AI assistant, preparing 
                you for real-world communication scenarios.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="about-section team-section">
        <div className="section-container">
          <h2 className="section-title">Our Team</h2>
          <p className="team-intro">
            ASL Vision was founded by a diverse team of deaf and hearing professionals passionate about 
            accessibility, education, and technology. Our collective expertise spans linguistics, 
            education, computer vision, and user experience design.
          </p>
          
          <div className="team-values">
            <div className="value-item">
              <h3>Accessibility First</h3>
              <p>We design every feature with accessibility in mind, ensuring our platform serves all users.</p>
            </div>
            
            <div className="value-item">
              <h3>Community Collaboration</h3>
              <p>We work closely with the deaf community to ensure cultural authenticity in our curriculum.</p>
            </div>
            
            <div className="value-item">
              <h3>Continuous Innovation</h3>
              <p>We're constantly integrating new technologies to improve the learning experience.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;