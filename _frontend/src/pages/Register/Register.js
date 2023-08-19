import { useState, useEffect } from "react";
import { RegisterForm } from "../../components";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
const Register = () => {
  const navigate = useNavigate();
  const { user } = useAppContext();
  useEffect(() => {
    if (user) navigate("/");
    // [user, navigate] run effect if user changes or navigation changes
  }, [user, navigate]);
  return (
    <main className="registerPage full-page">
      <RegisterForm />
    </main>
  );
};

export default Register;
