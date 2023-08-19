import React from "react";
import "./QuizInfo.css";
const QuizInfo = ({ icon, text }) => {
  return (
    <div className="quizInfo">
      <span className="icon">{icon}</span>
      <span className="text">{text}</span>
    </div>
  );
};
export default QuizInfo;
