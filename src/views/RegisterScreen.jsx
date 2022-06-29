import React from "react";
import { Formik } from "formik";

import useRegister from "../logic/useRegister";

const RegisterScreen = () => {
  const { isLoading, onRegister, navigation } = useRegister();

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        confirmPassword: "",
        name: "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.name) errors.name = "กรุณากรอกข้อมูล";
        if (!values.username) errors.username = "กรุณากรอกข้อมูล";
        if (!values.password) errors.password = "กรุณากรอกข้อมูล";
        if (!values.confirmPassword) errors.confirmPassword = "กรุณากรอกข้อมูล";
        else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.username)
        )
          errors.username = "รูปแบบอีเมลไม่ถูกต้อง";
        else if (values.password != values.confirmPassword)
          errors.confirmPassword = "รหัสผ่านไม่ตรงกัน";
        return errors;
      }}
      onSubmit={(values) => onRegister(values)}
    >
      {({ values, errors, touched, handleSubmit, handleChange }) => (
        <div className="bg-secondary">
          <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
              <main>
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-lg-7">
                      <div className="card shadow-lg border-0 rounded-lg mt-5">
                        <div className="card-header">
                          <h3 className="text-center font-weight-light my-4">
                            สมัครสมาชิก
                          </h3>
                        </div>
                        <div className="card-body">
                          <form onSubmit={handleSubmit}>
                            <div className="form-floating mb-3">
                              <div className="form-floating mb-3 mb-md-0">
                                <input
                                  type="text"
                                  placeholder="Name"
                                  className={
                                    "form-control " +
                                    (errors.name && touched.name && errors.name
                                      ? "is-invalid"
                                      : "")
                                  }
                                  name="name"
                                  value={values.name}
                                  onChange={handleChange}
                                />
                                <label>ชื่อ-นามสกุล</label>
                                <div className="invalid-feedback">
                                  {errors.name}
                                </div>
                              </div>
                            </div>
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                placeholder="Email address"
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
                            <div className="row mb-3">
                              <div className="col-md-6">
                                <div className="form-floating mb-3 mb-md-0">
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
                              </div>
                              <div className="col-md-6">
                                <div className="form-floating mb-3 mb-md-0">
                                  <input
                                    type="password"
                                    placeholder="Confirm password"
                                    className={
                                      "form-control " +
                                      (errors.confirmPassword &&
                                      touched.confirmPassword &&
                                      errors.confirmPassword
                                        ? "is-invalid"
                                        : "")
                                    }
                                    name="confirmPassword"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                  />
                                  <label>ยืนยันรหัสผ่าน</label>
                                  <div className="invalid-feedback">
                                    {errors.confirmPassword}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="mt-4 mb-0">
                              <div className="d-grid">
                                <button
                                  className="btn btn-primary btn-block"
                                  type="submit"
                                >
                                  {isLoading ? (
                                    <>
                                      <div
                                        className="spinner-border spinner-border-sm"
                                        role="status"
                                      />{" "}
                                      กำลังโหลด
                                    </>
                                  ) : (
                                    <span>สมัครสมาชิก</span>
                                  )}
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                        <div className="card-footer text-center py-3">
                          <div className="small">
                            <a href="#" onClick={() => navigation("/")}>
                              มีบัญชีผู้ใช้? ไปหน้าเข้าสู่ระบบ
                            </a>
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

export default RegisterScreen;
