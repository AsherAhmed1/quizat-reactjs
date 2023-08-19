import React from "react";
import { Outlet } from "react-router-dom";
import { SmallSidebar, BigSidebar, Navbar } from "../../../components";

import "./SharedLayout.css";
const SharedLayout = () => {
  return (
    <section className="sharedLayout">
      <main className="dashboard">
        <SmallSidebar />
        <BigSidebar />
        <div>
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </section>
  );
};

export default SharedLayout;
