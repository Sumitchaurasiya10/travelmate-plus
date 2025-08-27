import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleGetStarted = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="landing-page">
      <div className="landing-content text-center">
        <h1 className="fw-bold">
          🌍 Welcome to TravelMate+
        </h1>
        <p>Your ultimate travel bucket list companion 🚀</p>
        <button onClick={handleGetStarted} className="btn-start">
          Get Started
        </button>
      </div>

      {/* Floating travel icons */}
      <div className="floating-icons">
        <div className="icon plane">✈️</div>
        <div className="icon globe">🌐</div>
        <div className="icon backpack">🎒</div>
        <div className="icon luggage">🧳</div>
      </div>

      {/* Floating bubbles */}
      <div className="bubbles">
        {[...Array(10)].map((_, i) => (
          <div key={i} className={`bubble bubble-${i}`}></div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
