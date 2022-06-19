import { Formik, Field } from "formik";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import * as accountActions from "../../../actions/account.action";
import * as accountService from "../../../services/account.service";
import * as categoryService from "../../../services/category.service";
import * as productService from "../../../services/product.service";
import { IsCheckToken } from "../../../services/account.service";
import { DeleteImageProductById } from "../../../services/productImage.service";

const FormProductScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState();
  const [category, setCategory] = useState();

  useEffect(() => {
    fetchCategory();
    if (id) GetProductById();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const fetchCategory = async () => {
    var response = await categoryService.GetCategory();
    if (response) setCategory(response);
    else console.log(response);
  };

  const onSubmitProduct = async (values) => {
    setIsLoading(true);
    if (values.categoryId != 3) {
      values.seed = "";
      values.level = "";
    }
    const token = localStorage.getItem("token");
    let isChkToken = await accountService.IsCheckToken(token);
    if (isChkToken)
      if (!id) onCreateProduct(values, token);
      else onUpdateProduct(values, token);
    else {
      localStorage.removeItem("token");
      dispatch(accountActions.clear());
    }
  };

  const onCreateProduct = async (values, token) => {
    var response = await productService.CreateProduct(
      values, 
      token
    );
    DialogAlert(response);
  };

  const onUpdateProduct = async (values, token) => {
    var response = await productService.UpdateProduct(
      { ...values, id }, 
      token
    );
    DialogAlert(response);
  };

  const DialogAlert = (response) => {
    if (response.statusCode === 200) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: response.message,
        showConfirmButton: false,
        timer: 1500,
      });
      navigation("/mainproducts", { replace: true });
    } else alrtError(response.message);
  };

  const alrtError = (msg) =>
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: msg,
    });
  const alertSuccess = (msg) => {
    GetProductById();
    return Swal.fire({
      icon: "success",
      title: "Success",
      text: msg,
    });
  };

  const DeleteImgById = async (id) => {
    let token = localStorage.getItem("token");
    let isToken = await IsCheckToken(token);
    if (isToken) {
      Swal.fire({
        title: "ยืนยัน?",
        text: "ต้องการลบรูปภาพ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
      }).then(async (result) => {
        if (result.isConfirmed) {
          var response = await DeleteImageProductById(id, token);
          if (response.statusCode == 200) alertSuccess(response.message);
          else alrtError(response.message);
        }
      });
    } else {
      dispatch(accountActions.clear());
      localStorage.removeItem("token");
    }
  };

  const LoopShowOldImage = ({ data }) => (
    <div className="card-body">
      <div className="row">
        {data.map((item, i) => (
          <div className="col-md-4" key={i}>
            <button
              onClick={() => DeleteImgById(item.id)}
              style={{ position: "absolute" }}
              type="button"
              className="float-end btn-close btn-close bg-danger"
              aria-label="Close"
            ></button>
            <img
              style={{
                width: "100%",
                height: "234px",
                objectFit: "cover",
              }}
              src={item.img}
            />
          </div>
        ))}
      </div>
    </div>
  );

  const GetProductById = async () => {
    var response = await productService.GetById(id);
    if (response.statusCode === 200) setData(response.data);
    else console.log(response);
  };

  return (
    <main>
      <div className="container-fluid px-4">
        <h1 className="mt-4">{props.TitleTH}</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item">
            <a href="/#/">หน้าหลัก</a>
          </li>
          <li className="breadcrumb-item active">{props.NameTH}</li>
        </ol>

        <Formik
          enableReinitialize={true}
          initialValues={{
            name: data && data.name ? data.name : "",
            price: data && data.price ? data.price : "",
            detail: data && data.detail ? data.detail : "",
            seed: data && data.seed ? data.seed : "",
            level: data && data.level ? data.level : "",
            categoryId: data && data.categoryId ? data.categoryId : "",
            upfileList: null,
          }}
          validate={(values) => {
            let errors = {};
            if (!values.name) errors.name = "กรุณากรอกข้อมูล";
            if (!values.price) errors.price = "กรุณากรอกข้อมูล";
            if (!values.categoryId) errors.categoryId = "กรุณาเลือกประเภท";
            if (values.categoryId == 3 && !values.seed)
              errors.seed = "กรุณากรอกข้อมูล";
            if (values.categoryId == 3 && !values.level)
              errors.level = "กรุณาเลือกระดับกาแฟ";
            return errors;
          }}
          onSubmit={(values) => {
            onSubmitProduct(values);
          }}
        >
          {({
            values,
            handleSubmit,
            handleChange,
            errors,
            touched,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">รูปภาพสินค้า</label>
                        <input
                          className="form-control mb-3"
                          type="file"
                          multiple
                          name="upfileList"
                          onChange={(e) =>
                            setFieldValue("upfileList", e.target.files)
                          }
                        />
                        {values.upfileList && (
                          <div className="card mb-3">
                            <div className="card-header">
                              <h3>รูปภาพสินค้าที่จะบันทึก</h3>
                            </div>
                            <LoopShowImage data={values.upfileList} />
                          </div>
                        )}
                        {data &&
                          data.productImages &&
                          data.productImages.length && (
                            <div className="card mb-3">
                              <div className="card-header">
                                <h3>รูปภาพสินค้าเดิม</h3>
                              </div>
                              <LoopShowOldImage data={data.productImages} />
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div>
                        <div className="mb-3">
                          <label className="form-label">ชื่อสินค้า</label>
                          <input
                            type="text"
                            className={
                              "form-control " +
                              (errors.name && touched.name && errors.name
                                ? "is-invalid"
                                : "")
                            }
                            placeholder="กรอกชื่อสินค้า"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                          />
                          <div className="invalid-feedback">{errors.name}</div>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">ประเภท</label>
                          <Field
                            className={
                              "form-control " +
                              (errors.categoryId &&
                              touched.categoryId &&
                              errors.categoryId
                                ? "is-invalid"
                                : "")
                            }
                            as="select"
                            name="categoryId"
                          >
                            <option value="">เลือกประเภท</option>
                            {category &&
                              category.map((item, i) => (
                                <option key={i} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                          </Field>
                          <div className="invalid-feedback">
                            {errors.categoryId}
                          </div>
                        </div>
                        {values.categoryId == 3 && (
                          <>
                            <div className="mb-3">
                              <label className="form-label">เมล็ดพันธ์</label>
                              <input
                                type="text"
                                className={
                                  "form-control " +
                                  (errors.seed && touched.seed && errors.seed
                                    ? "is-invalid"
                                    : "")
                                }
                                placeholder="กรอกเมล็ดพันธ์"
                                name="seed"
                                value={values.seed}
                                onChange={handleChange}
                              />
                              <div className="invalid-feedback">
                                {errors.seed}
                              </div>
                            </div>
                            <div className="mb-3">
                              <label className="form-label">ระดับการคั่ว</label>
                              <Field
                                className={
                                  "form-control " +
                                  (errors.level && touched.level && errors.level
                                    ? "is-invalid"
                                    : "")
                                }
                                as="select"
                                name="level"
                              >
                                <option value="">เลือกระดับ</option>
                                <option value="คั่วอ่อน">คั่วอ่อน</option>
                                <option value="คั่วกลาง">คั่วกลาง</option>
                                <option value="คั่วเข็ม">คั่วเข็ม</option>
                              </Field>
                              <div className="invalid-feedback">
                                {errors.level}
                              </div>
                            </div>
                          </>
                        )}
                        <div className="mb-3">
                          <label className="form-label">ราคา</label>
                          <input
                            type="number"
                            className={
                              "form-control " +
                              (errors.price && touched.price && errors.price
                                ? "is-invalid"
                                : "")
                            }
                            placeholder="กรอกราคาสินค้า"
                            name="price"
                            value={values.price}
                            onChange={handleChange}
                          />
                          <div className="invalid-feedback">{errors.price}</div>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">รายละเอียด</label>
                          <textarea
                            type="text"
                            className="form-control"
                            placeholder="กรอกรายละเอียด"
                            name="detail"
                            value={values.detail}
                            onChange={handleChange}
                            rows="8"
                          />
                        </div>
                        <div className="mb-3">
                          <button
                            type="submit"
                            className="btn btn-success float-end"
                          >
                            {isLoading && isLoading}บันทึก
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </main>
  );
};

const LoopShowImage = ({ data }) => (
  <div className="card-body">
    <div className="row">
      {Array.from(data).map((item, i) => (
        <div className="col-md-4" key={i}>
          <img
            style={{
              width: "100%",
              height: "234px",
              objectFit: "cover",
            }}
            src={URL.createObjectURL(item)}
          />
        </div>
      ))}
    </div>
  </div>
);

export default FormProductScreen;
