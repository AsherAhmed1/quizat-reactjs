import React from "react";
import LogoImg from "../../assets/images/logo.png";
import LogoImgWhite from "../../assets/images/logo-white.png";
const Logo = ({ color = "orange" }) => {
  if (color === "white") {
    return <img src={LogoImgWhite} alt="quizat" className="logo" />;
  }
  return <img src={LogoImg} alt="quizat" className="logo" />;
};

export default Logo;
