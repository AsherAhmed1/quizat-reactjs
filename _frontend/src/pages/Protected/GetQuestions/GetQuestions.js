import React, { useEffect, useState } from "react";
import "./GetQuestions.css";
import { FaUserAlt, FaUserGraduate, FaQuestionCircle } from "react-icons/fa";
import { useAppContext } from "../../../context/AppContext";
import {
  Loading,
  Question,
  StatsItem,
  StudentsTable,
  CopyToClipboard
} from "../../../components";
import { Link, useNavigate } from "react-router-dom";

const GetQuestions = () => {
  const {
    isLoading,
    questionQuiz,
    quizQuestions,
    getQuizQuestion,
    getQuizStudents,
    IdOfQuestionQuiz,
    quizStudents,
    totalQuizStudents
  } = useAppContext();
  useEffect(() => {
    if (!IdOfQuestionQuiz) {
      navigate("/quizzes");
    }
    getQuizQuestion();
    getQuizStudents();
  }, []);
  const navigate = useNavigate();
  const { title, numberOfQuestions, shortUrl } = questionQuiz;
  const [view, setView] = useState("questions");
  const defaultQuizStats = [
    {
      title: "Questions",
      count: numberOfQuestions || 0,
      icon: <FaQuestionCircle />,
      color: "var(--primary-500)"
    },
    {
      title: "Students",
      count: totalQuizStudents || 0,
      icon: <FaUserGraduate />,
      color: "#e9b949"
    }
  ];

  const toggleView = () => {
    if (view === "questions") {
      return setView("students");
    }
    setView("questions");
  };
  if (isLoading) {
    return <Loading center />;
  }
  return (
    <section className="getQuestionPage">
      <h2>Quiz : {title}</h2>
      <CopyToClipboard value={shortUrl} />
      <section className="quizStats grid-2-xlg">
        {defaultQuizStats.map((item, index) => {
          return <StatsItem key={index} {...item} />;
        })}
      </section>

      <div className="divRow addBtnContainer">
        <button className="btn blue-btn" onClick={toggleView}>{`View ${
          view === "questions" ? "Students" : "Question"
        }`}</button>
        {view === "questions" && (
          <Link to="/add-question" className="btn green-btn">
            + Add question
          </Link>
        )}
      </div>

      {view === "questions" ? (
        quizQuestions.map((question, index) => {
          return (
            <Question key={question._id} index={index + 1} {...question} />
          );
        })
      ) : (
        <StudentsTable quizStudents={quizStudents} />
      )}
    </section>
  );
};

export default GetQuestions;
