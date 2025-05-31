// 

import React from "react";
import "./landing_page.css";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/login");
  };

  return (
    <div className="landing-container">
      <div className="bottom-left">
        <div className="title">URBANSYNC</div>
        <div className="subtitle">WHERE CITIES AND CITIZENS CONNECT</div>
      </div>

      <div className="bottom-right">
        <button
          className="arrow-button"
          onClick={handleNext}
          aria-label="Next"
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
