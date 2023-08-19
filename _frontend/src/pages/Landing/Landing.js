import React from "react";
import "./Landing.css";
import { Logo } from "../../components";
import main from "../../assets/images/main.png";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <main className="appLanding">
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* Start Landing info */}
        <div className="info">
          <h3>There's a better way to ask</h3>
          <h5>
            You don't want to make a boring quiz. And your audience won't answer
            one. Create a quizat quiz instead—and make everyone happy..
          </h5>
          {/* button to Link */}
          <Link to="/register" className="btn main-btn btn-hero">
            Get started - it's free
          </Link>
        </div>
        {/* End Landing info */}
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </main>
  );
};

export default Landing;
