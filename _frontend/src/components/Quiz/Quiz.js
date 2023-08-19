import React from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import "./Quiz.css";
import { QuizInfo, CopyToClipboard } from "../index";
import formatDate from "../../utils/formatDate";

const Quiz = ({
  _id,
  title,
  subject,
  description,
  numberOfQuestions,
  bgUrl,
  shortUrl,
  createdAt
}) => {
  const { setEditQuiz, deleteQuiz, setQuizId } = useAppContext();
  const date = formatDate(createdAt);
  return (
    <article className="quizComponent">
      <header>
        <div className="mainQuizImage">
          <img src={bgUrl} alt={title} />
        </div>

        <h5>{title}</h5>
        <p>{description}</p>
        <CopyToClipboard value={shortUrl} />
      </header>
      <div className="content">
        {/* Content here */}
        <div className="content-center">
          <QuizInfo
            icon={<FaQuestionCircle />}
            text={`${numberOfQuestions} Questions`}
          ></QuizInfo>
          <div className={`status ${subject}`}>{subject}</div>
        </div>
        <footer>
          <div className="actions">
            <div>
              <Link
                to="/quizzes/quiz-questions"
                className="btn main-btn"
                onClick={() => setQuizId(_id)}
              >
                View Questions
              </Link>
            </div>
            <div>
              <Link
                to="/add-quiz"
                className="btn  green-btn"
                onClick={() => setEditQuiz(_id)}
              >
                Edit
              </Link>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => deleteQuiz(_id)}
              >
                Delete
              </button>
            </div>
          </div>
        </footer>
      </div>
    </article>
  );
};

export default Quiz;
