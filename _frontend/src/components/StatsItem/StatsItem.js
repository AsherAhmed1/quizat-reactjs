import React from "react";
const StatsItem = ({ title, count, icon, color }) => {
  return (
    <article
      className="statsItem"
      style={{ borderBottom: ` 5px solid ${color}` }}
    >
      <header>
        <span className="count" style={{ color: color }}>
          {count}
        </span>
        <div className="icon" style={{ background: color }}>
          {icon}
        </div>
      </header>
      <h5 className="title">{title}</h5>
    </article>
  );
};

export default StatsItem;
