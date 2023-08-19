import React from "react";
import { useAppContext } from "../../context/AppContext";
import { NavLinks, Logo } from "../index";
import "./BigSidebar.css";
const BigSidebar = () => {
  const { isSidebarOpened } = useAppContext();

  return (
    <aside className="bigSidebar">
      <div
        className={`sidebar-container ${isSidebarOpened ? "show-sidebar" : ""}`}
      >
        <div className="content">
          <header>
            <Logo color="white" />
          </header>
          <NavLinks toggleSidebar={() => {}} />
        </div>
      </div>
    </aside>
  );
};
export default BigSidebar;
