import React from "react";
import { FormRow, SelectFormRow } from "../../../components";
import { useAppContext } from "../../../context/AppContext";
import "./AddQuiz.css";

const AddQuiz = () => {
  const {
    isEditing,
    idIfItIsEditing,
    quizTitle,
    quizSubject,
    quizSubjectTypes,
    quizDescription,
    quizBgUrl,
    doToast,
    isLoading,
    handleFormChange,
    clearForm,
    createQuiz,
    editQuiz
  } = useAppContext();
  //--Start handle submit and call appContext create or update quiz
  const handleSubmit = e => {
    e.preventDefault();
    /*     if (!quizTitle ) {
      return doToast({
        message: "Please provide title value",
        Type: "danger"
      });
    } */
    if (isEditing) {
      editQuiz();
      return;
    }
    createQuiz();
  };
  //--End handle submit and call appContext create or update quiz

  // use handleChange of the context
  const handleJobInput = e => {
    const { name, value } = e.target;
    console.log({ name, value });

    handleFormChange({ name, value });
  };

  return (
    <section className="editSubmitFormSection">
      <form className="form">
        <h3>{isEditing ? "Edit Quiz" : "Add Quiz"}</h3>
        <div className="form-center">
          {/* title */}
          <FormRow
            type="text"
            lableText="Quiz Title"
            name="quizTitle"
            value={quizTitle}
            handleChange={handleJobInput}
          />
          {/* description */}
          <FormRow
            type="text"
            lableText="Quiz Description"
            name="quizDescription"
            value={quizDescription}
            handleChange={handleJobInput}
          />
          {/* main image */}
          <FormRow
            type="text"
            lableText="background image URL"
            name="quizBgUrl"
            value={quizBgUrl}
            handleChange={handleJobInput}
          />
          {/* quiz subject */}
          <SelectFormRow
            inputId="subject"
            lableText="quiz subject"
            name="quizSubject"
            value={quizSubject}
            itemOptions={quizSubjectTypes}
            handleChange={handleJobInput}
          />
          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block btn-submit"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Wait ..." : "submit"}
            </button>
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={e => {
                e.preventDefault();
                clearForm();
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default AddQuiz;
