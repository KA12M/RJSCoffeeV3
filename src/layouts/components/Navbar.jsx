import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import * as accountActions from "../../actions/account.action";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { cartItem } = useSelector((state) => state.manageStock);
  const [isNavbar, setIsNavbar] = useState(true);
  const slideNavbar = () => {
    if (isNavbar) document.body.classList.add("sb-sidenav-toggled");
    else document.body.classList.remove("sb-sidenav-toggled");
    setIsNavbar(!isNavbar);
  };

  const Logout = () => {
    localStorage.removeItem("token");
    dispatch(accountActions.clear());
    navigation("/");
  };
  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
      <Link className="navbar-brand ps-3" to="/">
        CoffeeShopV3
      </Link>
      <button
        className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
        onClick={() => slideNavbar()}
        id="sidebarToggle"
      >
        <i className="fas fa-bars"></i>
      </button>

      <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            placeholder="ค้นหา"
            aria-label="Search for..."
            aria-describedby="btnNavbarSearch"
          />
          <button
            className="btn btn-secondary"
            id="btnNavbarSearch"
            type="button"
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
      </form>
      <div className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
        <button
          type="button"
          className="btn btn-primary position-relative"
          onClick={() => navigation("/cartitem")}
        >
          <i className="fa-solid fa-cart-shopping"></i>
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {cartItem ? cartItem.length > 0 && cartItem.length : ""}
          </span>
        </button>
      </div>
      <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fas fa-user fa-fw"></i>
          </a>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdown"
          >
            <li>
              <a className="dropdown-item" href="#!">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#!">
                Activity Log
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="" onClick={() => Logout()}>
                ออกจากระบบ
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
