import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";
import img from "../../assets/images/404.png";
const NotFound = () => {
  return (
    <main className="not-found full-page">
      <div>
        <img src={img} alt="not found" />
        <h3>Ohh! page not found</h3>
        <p>We can't seem to find the page you're looking for</p>
        <Link to="/">back home</Link>
      </div>
    </main>
  );
};

export default NotFound;
