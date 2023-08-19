import { useState } from "react";
import { toast } from "react-toastify";
import { Logo, FormRow } from "../../components";
import "./Register.css";

import { useAppContext } from "../../context/AppContext";
const initialState = {
  name: "",
  email: "",
  password: "",
  loggedUser: null,
  isMember: true //Login or register
};
const Register = () => {
  const { doToast, isLoading, setUser, user } = useAppContext();

  const [values, setValues] = useState(initialState);

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  const handleChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const onSubmit = e => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      doToast({ message: "you must provide all values", type: "warn" });
      return;
    }
    const newUser = { name, email, password };
    if (isMember) {
      setUser({
        newUser,
        endPoint: "login",
        alertTextOnSuccess: "Login Successful! Redirecting..."
      });
    } else {
      setUser({
        newUser,
        endPoint: "register",
        alertTextOnSuccess: "User Created! Redirecting..."
      });
    }
  };
  return (
    <form className="form registerForm" onSubmit={onSubmit}>
      <Logo />
      <h3>{values.isMember ? "Login" : "Register"}</h3>
      {/*===> showAlert && <Alert />*/}
      {/* name input */}
      {!values.isMember && (
        <FormRow
          type="text"
          name="name"
          value={values.name}
          handleChange={handleChange}
        />
      )}

      {/* email input */}
      <FormRow
        type="email"
        name="email"
        value={values.email}
        handleChange={handleChange}
      />
      {/* password input */}
      <FormRow
        type="password"
        name="password"
        value={values.password}
        handleChange={handleChange}
      />
      <button
        type="submit"
        className="btn main-btn btn-block"
        disabled={isLoading}
      >
        submit
      </button>
      <p>
        {values.isMember ? "Not a member yet?" : "Already a member?"}
        <button type="button" onClick={toggleMember} className="member-btn">
          {values.isMember ? "Register" : "Login"}
        </button>
      </p>
    </form>
  );
};

export default Register;
