import React from "react";
import "./ToggleRow.css";
/*
toggleValues = [
    {labelText : "Image attached",id:"imageAttached"}
    {labelText : "Image attached"}
]


["text", "photo", "audio", "video"]
*/
const ToggleRow = ({
  inputId,
  lableText,
  name,
  value,
  toggleValues,
  defaultValue,
  handleChange
}) => {
  console.log("toogle included");

  return (
    <div className="fullGrid">
      <label className="form-label">{lableText}</label>
      <div className="toggleRow">
        {toggleValues.map((toggleValue, index) => {
          return (
            <div className="form__radio-group" key={index}>
              <input
                type="radio"
                className="form__radio-input"
                id={`${inputId}${index}`}
                checked={value === toggleValue}
                name={name}
                value={toggleValue}
                onChange={handleChange}
              />
              <label
                htmlFor={`${inputId}${index}`}
                className="form__radio-label"
              >
                <span className="form__radio-button"></span>
                {toggleValue == defaultValue.value
                  ? defaultValue.label
                  : `${toggleValue}`}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ToggleRow;
