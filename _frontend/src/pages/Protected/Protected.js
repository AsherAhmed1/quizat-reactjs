import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
const Protected = ({ children }) => {
  const { user } = useAppContext();
  if (!user) return <Navigate to="/welcome" />;

  return children;
};

export default Protected;
