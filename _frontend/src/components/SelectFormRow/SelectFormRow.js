import React from "react";

const SelectFormRow = ({
  inputId,
  lableText,
  name,
  value,
  itemOptions,
  handleChange
}) => {
  return (
    <div className="form-row">
      <label htmlFor={inputId} className="form-label">
        {lableText || name}
      </label>
      <select
        className="form-select"
        name={name}
        id={inputId}
        value={value}
        onChange={handleChange}
      >
        {itemOptions.map((item, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default SelectFormRow;
