import React, { useContext, useState, useReducer } from "react";
import { toast } from "react-toastify";
import reducer from "./reducer";
import axios from "axios";

import {
  TOGGLE_LOADING,
  TOGGLE_SIDEBAR,
  CLEAR_FORM,
  HANDLE_FORM_CHANGE,
  SETUP_USER_SUCCESS,
  LOGOUT_USER,
  UPDATE_USER_SUCCESS,
  CREATE_QUIZ_SUCCESS,
  EDIT_QUIZ_SUCCESS,
  CHANGE_WRONG_ANSERS,
  GET_QUIZZES_SUCCESS,
  CLEAR_FILTERS,
  SET_EDIT_QUIZ,
  SET_QUIZ_ID,
  CREATE_QUESTION_SUCCESS,
  GET_QUESTIONS_SUCCESS,
  GET_STATS_SUCCESS,
  GET_QUIZ_STUDENTS_SUCCESS,
  DELETE_QUESTION_SUCCESS,
  SET_EDIT_QUESTION,
  CHANGE_PAGE
} from "./actions";

// first of all get what in local storage
const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialValues = {
  user: user ? JSON.parse(user) : null,
  token: token,
  isLoading: false,
  isSidebarOpened: false,
  //state of current quiz adding or editing
  quizTitle: "",
  quizSubject: "english",
  quizSubjectTypes: ["english", "programing", "math", "marketing"],
  quizDescription: "",
  quizBgUrl: "",
  shortUrl: "",
  //check form mode whether is editing or adding
  isEditing: false,
  idIfItIsEditing: "",
  // filter related  values
  numOfPages: 1,
  page: 1,
  searchFilter: "",
  quizSubjectFilter: "all",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
  sort: "a-z",
  // state of all quizzes from backend
  quizzes: [],
  totalQuizzes: 0,
  // stats from backend
  stats: {},
  // state related to quiz  =>>>  question
  isEditingQuestion: false,
  IdOfQuestionQuiz: "", //quiz
  questionQuiz: {},
  quizQuestions: [],
  totalQuizQuestion: 0,
  //-- question added or edited
  idOfQuestion: "",
  questionTitleType: "text",
  questionTitleTypeOptions: ["text", "photo", "audio", "video"],
  questionTitleTypeAssetUrl: "",
  questionTitle: "",
  questionWrongAnswers: [],
  questionCorrectAnswer: "",
  //quizId will be  idIfItIsEditing
  // state related to quiz  =>>>  students
  quizStudents: [],
  totalQuizStudents: 0,
  // state related to teacher  =>>>  students
  totalTeacherStudents: 0,
  // state related to teacher  =>>>  quizzes
  totalTeacherQuizzes: 0
};
const appContext = React.createContext();

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValues);
 // const baseUrl = "https://quizatime.herokuapp.com/api";
  const baseUrl = "http://localhost:5000/api";

  /**** Start setting up axios        */
  //axios.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;
  const authFetch = axios.create({
    baseURL: `${baseUrl}`
  });
  // create axios instance is good but not allow
  // me to handle success or error of 4 results
  // request interceptor
  authFetch.interceptors.request.use(
    requestConfig => {
      requestConfig.headers.common["Authorization"] = `Bearer ${state.token}`;
      return requestConfig;
    },
    error => {
      return Promise.reject(error);
    }
  );
  // response interceptor
  authFetch.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      console.log(error.response);
      if (error.response.status === 401)
        console.log("Auth Error not any error");
      return Promise.reject(error);
    }
  );
  /**** End setting up axios         */

  /**** Start data presistanc in localStorage   */
  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };
  /**** End data presistanc in localStorage     */

  // Toggle loading either to true or false
  const toggleLoading = (value = false) => {
    dispatch({ type: TOGGLE_LOADING, payload: { value } });
  };

  // display toast on web view
  const doToast = ({ message, type }) => {
    const toastOption = {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    };
    if (type === "success") toast.success(message, toastOption);
    else if (type === "error") toast.error(message, toastOption);
    else if (type === "warn") toast.warn(message, toastOption);
    else if (type === "info") toast.info(message, toastOption);
    else toast(message, toastOption);
  };
  // State is isolated up to be accessed any where in the app
  // handle form to change this state is also isolated
  // in context not in single component
  const handleFormChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_FORM_CHANGE,
      payload: { name, value }
    });
  };
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };
  const clearForm = () => {
    dispatch({ type: CLEAR_FORM });
  };
  // setup user by login or register
  const setUser = async ({ newUser, endPoint, alertTextOnSuccess }) => {
    dispatch({ type: TOGGLE_LOADING, payload: { value: true } });
    try {
      const response = await axios.post(`${baseUrl}/auth/${endPoint}`, newUser);
      console.log(response);
      const { user, token } = response.data;
      doToast({ message: alertTextOnSuccess, type: "success" });
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token }
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      console.log("login Error");
      console.log(error);
      dispatch({ type: TOGGLE_LOADING, payload: { value: false } });
      doToast({ message: "somthing went wrong", type: "error" });
    }
  };
  const updateUser = async currentUser => {
    dispatch({ type: TOGGLE_LOADING, payload: { value: true } });
    try {
      // axios put the server response data into  data  =>response.data
      // later change post to patch
      const { data } = await authFetch.post(`/auth/update`, currentUser);
      const { user, token } = data;
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, token }
      });
      doToast({ message: "User updated", type: "success" });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      //error.response || error.response.data
      console.log("update user Error");
      console.log(error);
      dispatch({ type: TOGGLE_LOADING, payload: { value: false } });
      doToast({ message: error.response.data.msg, type: "error" });
    }
  };
  /**start get stats  */
  const getStats = async () => {
    dispatch({ type: TOGGLE_LOADING, payload: { value: true } });
    try {
      const { data } = await authFetch("/quizzes/stats");
      const { stats, monthlyApplications } = data;
      dispatch({
        type: GET_STATS_SUCCESS,
        payload: { stats, monthlyApplications }
      });
    } catch (error) {
      doToast({ message: error.response.data.msg, type: "error" });
      logoutUser();
    }
  };
  /**start get stats  */
  /* Start create quiz  */
  const createQuiz = async () => {
    console.log("Creating quiz");
    dispatch({ type: TOGGLE_LOADING, payload: { value: true } });
    try {
      // var:alias to be clear and I used these names in backend
      const {
        quizTitle: title,
        quizSubject: subject,
        quizDescription: description,
        quizBgUrl: bgUrl
      } = state;
      const newQuiz = { title, subject, description, bgUrl };
      const { data } = await authFetch.post(`/quizzes`, newQuiz);

      doToast({ message: `Quiz ${data.title} created `, type: "success" });
      dispatch({
        type: CREATE_QUIZ_SUCCESS
      });
      dispatch({ type: CLEAR_FORM });
    } catch (error) {
      console.log(error);
      dispatch({ type: TOGGLE_LOADING, payload: { value: false } });
      doToast({ message: error.response.data.msg, type: "error" });
      /* 
    if (error.response.status === 401) {
      custom error for this case
       doToast({ message: error.response.data.msg, type: "error" });
    } */
    }
  };
  /* End create quiz  */
  /** start set edit quiz  */
  const setEditQuiz = (id = "xyz") => {
    console.log(`Editing : ${id}`);
    dispatch({ type: SET_EDIT_QUIZ, payload: { id } });
  };
  /** End set edit quiz */
  /* Start Edit quiz */
  const editQuiz = async () => {
    console.log("Editing");
    dispatch({ type: TOGGLE_LOADING, payload: { value: true } });

    try {
      const {
        quizTitle: title,
        quizSubject: subject,
        quizDescription: description,
        quizBgUrl: bgUrl,
        idIfItIsEditing
      } = state; //quizzes/6330ab8d481098346390ec12
      const editedQuiz = { title, subject, description, bgUrl };
      const { data } = await authFetch.patch(
        `/quizzes/${idIfItIsEditing}`,
        editedQuiz
      );

      doToast({
        message: `Quiz  edited `,
        type: "success"
      });
      dispatch({
        type: EDIT_QUIZ_SUCCESS
      });
      dispatch({ type: CLEAR_FORM });
    } catch (error) {
      console.log(error);
      dispatch({ type: TOGGLE_LOADING, payload: { value: false } });
      doToast({ message: error.response.data.msg, type: "error" });
    }
  };
  /** End edit quiz  */

  /** Start delete quiz */
  const deleteQuiz = async _id => {
    console.log("deleting");
    dispatch({ type: TOGGLE_LOADING, payload: { value: true } });
    try {
      await authFetch.delete(`/quizzes/${_id}`);
      doToast({ message: "quiz deleted", type: "success" });
      getAllQuizzes();
    } catch (error) {
      console.log(error.response);
      // logoutUser();
    }
  };
  /* End delete quiz */

  /** Start get Quizzes  */
  const getAllQuizzes = async () => {
    dispatch({ type: TOGGLE_LOADING, payload: { value: true } });
    // backend { title, subject}

    const { page, searchFilter, quizSubjectFilter, sort } = state;
    let getUrl = `/quizzes?page=${page}&subject=${quizSubjectFilter}&sort=${sort}`;
    if (searchFilter) {
      getUrl = getUrl + `&search=${searchFilter}`;
    }
    try {
      const { data } = await authFetch.get(getUrl);
      const { quizzes, totalQuizzes, numOfPages } = data;

      dispatch({
        type: GET_QUIZZES_SUCCESS,
        payload: { quizzes, totalQuizzes, numOfPages }
      });
    } catch (error) {
      console.log(error.response);
      //if error log out and start over
      // logoutUser();
    }
  };

  /** End get Quizzes */
  /**Start removing filter values */
  const clearFilter = () => {
    console.log(" clear filter ");
    dispatch({ type: CLEAR_FILTERS });
  };
  /** */
  /** Start question wrong answers edit */
  const handleWrongAnswersChange = ({ index, value }) => {
    dispatch({ type: CHANGE_WRONG_ANSERS, payload: { index, value } });
  };
  /** End question wrong answers edit */

  /** Satrt Set quiz id */

  const setQuizId = id => {
    dispatch({ type: SET_QUIZ_ID, payload: { id } });
  };
  /** EndSet quiz id */

  /** Start create question */
  const createQuestion = async () => {
    console.log("Creating question");
    dispatch({ type: TOGGLE_LOADING, payload: { value: true } });
    try {
      // var:alias to be clear and I used these names in backend
      const {
        IdOfQuestionQuiz: quizId,
        questionTitleType: titleType,
        questionTitleTypeAssetUrl: titleTypeAssetUrl,
        questionTitle: title,
        questionWrongAnswers: wrongAnswers,
        questionCorrectAnswer: correctAnswer
      } = state;
      const newQuestion = {
        titleType,
        quizId,
        titleTypeAssetUrl,
        title,
        wrongAnswers,
        correctAnswer
      };
      const { data } = await authFetch.post(`/questions`, newQuestion);

      doToast({ message: `question  created `, type: "success" });
      dispatch({
        type: CREATE_QUESTION_SUCCESS
      });
      dispatch({ type: CLEAR_FORM });
    } catch (error) {
      console.log(error);
      dispatch({ type: TOGGLE_LOADING, payload: { value: false } });
      doToast({ message: error.response.data.msg, type: "error" });
      /* 
      if (error.response.status === 401) {
        custom error for this case
         doToast({ message: error.response.data.msg, type: "error" });
      } */
    }
  };

  /** End create question */

  /** Start set edit question */
  const setEditQuestion = (id = "xyz") => {
    console.log(`Editing : ${id}`);
    dispatch({ type: SET_EDIT_QUESTION, payload: { id } });
  };
  /** End set edit question */
  /* Start Edit question */
  const editQuestion = async () => {
    console.log("Editing question");
    dispatch({ type: TOGGLE_LOADING, payload: { value: true } });

    try {
      const {
        questionTitleType: titleType,
        questionTitleTypeAssetUrl: titleTypeAssetUrl,
        questionTitle: title,
        questionWrongAnswers: wrongAnswers,
        questionCorrectAnswer: correctAnswer,
        IdOfQuestionQuiz: quizId,
        idOfQuestion
      } = state; //{{URL}}api/questions/6330c1acde5b40eba215e937
      const editedQuestion = {
        title,
        titleType,
        titleTypeAssetUrl,
        wrongAnswers,
        quizId,
        correctAnswer
      };
      const { data } = await authFetch.patch(
        `/questions/${idOfQuestion}`,
        editedQuestion
      );

      doToast({
        message: `question  edited `,
        type: "success"
      });
      dispatch({
        type: EDIT_QUIZ_SUCCESS
      });
      dispatch({ type: CLEAR_FORM });
    } catch (error) {
      console.log(error);
      dispatch({ type: TOGGLE_LOADING, payload: { value: false } });
      doToast({ message: error.response.data.msg, type: "error" });
    }
  };
  /** End edit question  */
  /** Start delete question */
  const deleteQuestion = async _id => {
    console.log("deleting");
    dispatch({ type: TOGGLE_LOADING, payload: { value: true } });
    try {
      //questions/633a087b9efc41c7352e8924
      await authFetch.delete(`/questions/${_id}`);
      doToast({ message: "question deleted", type: "success" });
      dispatch({ type: DELETE_QUESTION_SUCCESS, payload: { id: _id } });
    } catch (error) {
      dispatch({ type: TOGGLE_LOADING, payload: { value: false } });
      console.log(error.response);
      // logoutUser();
    }
  };
  /* End delete question */
  /** Start Get Quiz Question */
  const getQuizQuestion = async () => {
    dispatch({ type: TOGGLE_LOADING, payload: { value: true } });
    const { IdOfQuestionQuiz } = state;
    if (!IdOfQuestionQuiz) {
      doToast({ message: "Something went wrong", type: "error" });
      return;
    }
    try {
      const { data } = await authFetch.get(`/questions/${IdOfQuestionQuiz}`);
      const { quiz, questions } = data;

      dispatch({
        type: GET_QUESTIONS_SUCCESS,
        payload: { quiz, questions }
      });
    } catch (error) {
      console.log(error.response);
      //if error log out and start over
      // logoutUser();
    }
  };
  /** Start Get Quiz Question */
  /** Start Get Quiz Students */
  const getQuizStudents = async () => {
    dispatch({ type: TOGGLE_LOADING, payload: { value: true } });
    const { IdOfQuestionQuiz } = state;
    if (!IdOfQuestionQuiz) {
      return;
    }
    try {
      const { data } = await authFetch.get(`/grades`, {
        quizId: IdOfQuestionQuiz
      });
      const { quizId, grades, gradesLength } = data;

      dispatch({
        type: GET_QUIZ_STUDENTS_SUCCESS,
        payload: { quizId, grades, gradesLength }
      });
    } catch (error) {
      console.log(error.response);
      //if error log out and start over
      // logoutUser();
    }
  };
  /** Start Get Quiz Students */

  /* Start logout user*/
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };
  /* End logout user */
  /** start change page number */
  const changePage = page => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };
  /** start change page number */
  return (
    <appContext.Provider
      value={{
        ...state,
        toggleSidebar,
        handleFormChange,
        clearForm,
        doToast,
        updateUser,
        setUser,
        toggleLoading,
        getStats,
        createQuiz,
        editQuiz,
        clearFilter,
        getAllQuizzes,
        setEditQuiz,
        deleteQuiz,
        handleWrongAnswersChange,
        createQuestion,
        getQuizQuestion,
        getQuizStudents,
        changePage,
        setQuizId,
        setEditQuestion,
        editQuestion,
        deleteQuestion,
        logoutUser
      }}
    >
      {children}
    </appContext.Provider>
  );
};
const useAppContext = () => {
  return useContext(appContext);
};

export { AppContextProvider, useAppContext };
