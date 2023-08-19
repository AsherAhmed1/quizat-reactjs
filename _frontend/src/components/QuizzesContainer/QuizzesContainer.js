import React, { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import "./QuizzesContainer.css";
import { Loading, Quiz, PageBtnContainer } from "../index";

function QuizzesContainer() {
  const {
    isLoading,
    quizzes,
    getAllQuizzes,
    totalQuizzes,
    numOfPages,
    page,
    searchFilter,
    quizSubjectFilter,
    sort
  } = useAppContext();
  // refetch jobs on every change to [page, searchFilter,quizSubjectFilter, sort]
  useEffect(() => {
    getAllQuizzes();
  }, [page, searchFilter, quizSubjectFilter, sort]);

  if (isLoading) return <Loading center />;

  if (quizzes.length === 0) {
    return (
      <section className="quizzesContainer">
        <h2>No Quizzes to display ....</h2>
      </section>
    );
  }

  return (
    <section className="quizzesContainer">
      <h5>
        {totalQuizzes} quiz{totalQuizzes > 1 ? "zes" : ""} found
      </h5>
      <div className="quizzes">
        {quizzes.map(quiz => {
          return <Quiz key={quiz._id} {...quiz} />;
        })}
      </div>
      {/*create  PageContainer , import and use it */}
      {numOfPages > 1 && <PageBtnContainer />}
    </section>
  );
}

export default QuizzesContainer;
