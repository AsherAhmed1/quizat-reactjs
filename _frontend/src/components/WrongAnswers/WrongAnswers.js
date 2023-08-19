import React, { useState, useEffect } from "react";
import "./WrongAnswers.css";
import { FormRow } from "../index";
import { useAppContext } from "../../context/AppContext";

const inputs = [{ name: "answer1", lableText: "answer 1" }];
const WrongAnswers = () => {
  const {
    doToast,
    questionWrongAnswers: inputs,
    handleWrongAnswersChange
  } = useAppContext();
  const [inputsNum, setInputsNum] = useState(3);

  const handleChange = (e, index) => {
    const { value } = e.target;
    handleWrongAnswersChange({ index, value });
  };
  return (
    <div className=" wrongAnswers fullGrid ">
      {Array.from({ length: inputsNum }).map((_, index) => {
        const name = `Answer${index + 1}`;
        return (
          <FormRow
            key={index}
            type="text"
            lableText={`Wrong Answer ${index + 1}`}
            name={name}
            value={inputs[index] ? inputs[index] : ""}
            handleChange={e => handleChange(e, index)}
          />
        );
      })}
    </div>
  );
};

export default WrongAnswers;
