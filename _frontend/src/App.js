import "./App.css";
import {
  Landing,
  Register,
  NotFound,
  SharedLayout,
  Stats,
  Profile,
  AddQuiz,
  AddQuestion,
  GetQuestions,
  GetQuizzes,
  Protected
} from "./pages";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Protected>
              <SharedLayout />
            </Protected>
          }
        >
          <Route index element={<Navigate to="/stats" />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/add-quiz" element={<AddQuiz />} />
          <Route path="/quizzes" element={<GetQuizzes />} />
          <Route path="/add-question" element={<AddQuestion />} />
          <Route path="/quizzes/quiz-questions" element={<GetQuestions />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/welcome" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
