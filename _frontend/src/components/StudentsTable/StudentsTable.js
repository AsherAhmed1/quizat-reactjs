import React from "react";

const StudentsTable = ({ quizStudents }) => {
  return (
    <table>
      <thead>
        <td>Num</td>
        <td>Name</td>
        <td>Email</td>
        <td>grade</td>
      </thead>
      {quizStudents.map((student, index) => {
        const { userEmail, userName, grade } = student;
        return (
          <tr>
            <td>{index + 1}</td>
            <td>{userName}</td>
            <td>{userEmail}</td>
            <td>{grade}</td>
          </tr>
        );
      })}
    </table>
  );
};

export default StudentsTable;
