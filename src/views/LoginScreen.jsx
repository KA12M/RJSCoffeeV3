import React, { useState } from "react";
import { Formik } from "formik";
import Swal from "sweetalert2";
import { Link } from "react-router-dom"; 
import * as actionAccounts from "../actions/account.action";
import { useDispatch } from "react-redux";

import * as accountService from "../services/account.service";

const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const onLogin = async (values) => {
    setIsLoading(true);
    var res = await accountService.Login(values);
    setIsLoading(false);
    if (res.statusCode === 200) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: res.message,
        showConfirmButton: false,
        timer: 1500,
      });
      getAccountData(res.token);
    } else
      Swal.fire({
        icon: "error",
        text: res.message,
      });
  };
  const getAccountData = async (token) => {
    const response = await accountService.GetByToken(token);
    if (response.statusCode === 200) {
      dispatch(actionAccounts.setUser(response.data));
      dispatch(actionAccounts.setToken(token));
      localStorage.setItem("token", token);
    } else alert(response.message);
  };
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.username) errors.username = "กรุณากรอกข้อมูล";
        if (!values.password) errors.password = "กรุณากรอกข้อมูล";
        else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.username)
        )
          errors.username = "รูปแบบอีเมลไม่ถูกต้อง";
        return errors;
      }}
      onSubmit={(values) => onLogin(values)}
    >
      {({ values, errors, touched, handleChange, handleSubmit }) => (
        <div className="bg-secondary">
          <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
              <main>
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-lg-5">
                      <div className="card shadow-lg border-0 rounded-lg mt-5">
                        <div className="card-header">
                          <h3 className="text-center font-weight-light my-4">
                            เข้าสู่ระบบ
                          </h3>
                        </div>
                        <div className="card-body">
                          <form onSubmit={handleSubmit}>
                            <div className="form-floating mb-3">
                              <input
                                placeholder="name@example.com"
                                className={
                                  "form-control " +
                                  (errors.username &&
                                  touched.username &&
                                  errors.username
                                    ? "is-invalid"
                                    : "")
                                }
                                name="username"
                                value={values.username}
                                onChange={handleChange}
                              />
                              <label>ชื่อผู้ใช้งาน</label>
                              <div className="invalid-feedback">
                                {errors.username}
                              </div>
                            </div>
                            <div className="form-floating mb-3">
                              <input
                                type="password"
                                placeholder="Password"
                                className={
                                  "form-control " +
                                  (errors.password &&
                                  touched.password &&
                                  errors.password
                                    ? "is-invalid"
                                    : "")
                                }
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                              />
                              <label>รหัสผ่าน</label>
                              <div className="invalid-feedback">
                                {errors.password}
                              </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                              <a className="small" href="password.html">
                                ลืมรหัสผ่าน?
                              </a>
                              <button className="btn btn-primary" type="submit">
                                {isLoading ? (
                                  <>
                                    <div
                                      className="spinner-border spinner-border-sm"
                                      role="status"
                                    />{" "}
                                    กำลังโหลด
                                  </>
                                ) : (
                                  <span>เข้าสู่ระบบ</span>
                                )}
                              </button>
                            </div>
                          </form>
                        </div>
                        <div className="card-footer text-center py-3">
                          <div className="small">
                            <Link to="/register">
                              ต้องการบัญชีผู้ใช้? สมัครสมาชิก!
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default LoginScreen;
