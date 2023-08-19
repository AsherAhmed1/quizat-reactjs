import React from "react";
import "./FormRow.css";
const FormRow = ({ lableText, inputId, type, name, value, handleChange }) => {
  return (
    <div className="form-row">
      <label htmlFor={inputId || name} className="form-label">
        {lableText || name}
      </label>
      <input
        type={type}
        id={inputId || name}
        name={name}
        className="form-input"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default FormRow;
