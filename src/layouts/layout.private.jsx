import React from "react";
import { Outlet } from "react-router-dom";

import NavBar from "./components/Navbar";
import SideBar from "./components/Slidebar";
import Footer from "./components/Footer";

const LayoutPrivate = () => (
  <div>
    <NavBar />
    <div id="layoutSidenav">
      <SideBar />
      <div id="layoutSidenav_content">
        <Outlet />
        <Footer />
      </div>
    </div>
  </div>
);

export default LayoutPrivate;
