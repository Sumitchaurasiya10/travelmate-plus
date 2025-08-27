import React from "react";
import { useNavigate } from "react-router-dom";
import "animate.css";

function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleGetStarted = () => {
    if (user) {
      navigate("/dashboard"); // already logged in → go to dashboard
    } else {
      navigate("/register"); // not logged in → go to register
    }
  };

  return (
    <div
      className="container text-center animate__animated animate__fadeIn"
      style={{
        marginTop: "80px",
        padding: "40px",
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        borderRadius: "20px",
        color: "white",
      }}
    >
      <h1 className="animate__animated animate__fadeInDown">
        🌍 Welcome to TravelMate Plus
      </h1>
      <p className="animate__animated animate__fadeInUp">
        Your ultimate travel bucket list companion 🚀
      </p>
      <button
        className="btn btn-light btn-lg animate__animated animate__pulse animate__infinite"
        style={{ marginTop: "20px", borderRadius: "50px" }}
        onClick={handleGetStarted}
      >
        Get Started
      </button>
    </div>
  );
}

export default Home;
