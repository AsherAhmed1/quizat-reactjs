import React from "react";
import { useAppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
const Question = ({ _id, title, index }) => {
  const { setEditQuestion, deleteQuestion } = useAppContext();
  return (
    <div className="divRow" key={_id}>
      <p>{`${index}. ${title}`} </p>
      <div className="btn-controller">
        <Link
          to="/add-question"
          className="btn blue-btn"
          onClick={() => setEditQuestion(_id)}
        >
          edit
        </Link>
        <button className="btn btn-danger" onClick={() => deleteQuestion(_id)}>
          delete
        </button>
      </div>
    </div>
  );
};

export default Question;
