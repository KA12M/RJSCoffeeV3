import React from "react";
import { Link } from "react-router-dom";

const Slidebar = () => {
  return (
    <div id="layoutSidenav_nav">
      <nav
        className="sb-sidenav accordion sb-sidenav-dark"
        id="sidenavAccordion"
      >
        <div className="sb-sidenav-menu">
          <div className="nav">
            <Link to="/" className="nav-link">
              <div className="sb-nav-link-icon">
                <i className="fa-solid fa-house-chimney"></i>
              </div>
              หน้าหลัก
            </Link>
            <div className="sb-sidenav-menu-heading">เมนู</div>
            <a
              className="nav-link collapsed"
              href="#"
              data-bs-toggle="collapse"
              data-bs-target="#collapseLayouts"
              aria-expanded="false"
              aria-controls="collapseLayouts"
            >
              <div className="sb-nav-link-icon">
                <i className="fa-solid fa-user"></i>
              </div>
              บัญชีผู้ใช้งาน
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </a>
            <div
              className="collapse"
              id="collapseLayouts"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordion"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <Link to="/mainaccounts" className="nav-link">
                  ข้อมูลผู้ใช้งาน
                </Link>
              </nav>
            </div>
            <a
              className="nav-link collapsed"
              href="#"
              data-bs-toggle="collapse"
              data-bs-target="#collapsePages"
              aria-expanded="false"
              aria-controls="collapsePages"
            >
              <div className="sb-nav-link-icon">
                <i className="fa-solid fa-mug-saucer"></i>
              </div>
              สินค้า
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </a>
            <div
              className="collapse"
              id="collapsePages"
              aria-labelledby="headingTwo"
              data-bs-parent="#sidenavAccordion"
            >
              <nav className="sb-sidenav-menu-nested nav ">
                <Link to="/mainproducts" className="nav-link">
                  ข้อมูลสินค้า
                </Link>
                <Link to="/mainmanagestock" className="nav-link">
                  ข้อมูลจัดการคลังสินค้า
                </Link>
                <Link to="/formproduct" className="nav-link">
                  เพิ่มสินค้า
                </Link>
              </nav>
            </div>
            <a
              className="nav-link collapsed"
              href="#"
              data-bs-toggle="collapse"
              data-bs-target="#orders"
              aria-expanded="false"
              aria-controls="orders"
            >
              <div className="sb-nav-link-icon">
                <i className="fa-solid fa-cart-shopping"></i>
              </div>
              คำสั่งซื้อ
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </a>
            <div
              className="collapse"
              id="orders"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordion"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <Link to="/mainorders" className="nav-link">
                  ข้อมูลคำสั่งซื้อ
                </Link>
              </nav>
            </div>
            <div className="sb-sidenav-menu-heading">อื่นๆ</div>
            <a
              className="nav-link"
              href="http://tee.kru.ac.th/cs63/s11/coffeev3/backend/swagger/index.html"
            >
              <div className="sb-nav-link-icon">
                <i className="fa-solid fa-server"></i>
              </div>
              Server Swagger
            </a>
          </div>
        </div>
        <div className="sb-sidenav-footer">
          <div className="small">ReactJs with ViteJs</div>
        </div>
      </nav>
    </div>
  );
};

export default Slidebar;
