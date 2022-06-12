import React, { useState, useEffect } from "react";
import { Formik, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

import * as functionService from "../../../helper/functionService";
import * as accountActions from "../../../actions/account.action";
import * as accountService from "../../../services/account.service";
import * as productActions from "../../../actions/product.action";
import * as productService from "../../../services/product.service.js";
import * as manageStockService from "../../../services/manageStock.service";
import Pagination from "../../../components/Pagination";
import { setCartItem } from "../../../actions/managestock.action";

const MainProductsScreen = (props) => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const { pagination } = useSelector((state) => state.product);
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState(0);

  useEffect(() => {
    GetData();
  }, []);

  const GetData = async () => {
    var response = await productService.GetProducts({
      ...pagination,
      search,
      categoryId,
    });
    if (response.statusCode === 200) {
      setData(response.data);
      dispatch(productActions.setPagination(response.pagination));
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onChangeCurrentPage = (page) => {
    pagination.currentPage = page;
    dispatch(productActions.setPagination(pagination));
    GetData();
  };

  const onDelete = async (item) => {
    Swal.fire({
      title: "ยืนยันการลบ?",
      text: `ลบสินค้า ${item.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");
        var isToken = await accountService.IsCheckToken(token);
        if (isToken) {
          var response = await productService.DeleteProduct({
            id: item.id,
            token,
          });
          if (response.statusCode === 200) {
            GetData();
            Swal.fire("Deleted!", response.message, "success");
          } else if (response.response.status === 401) clearAuthen();
        }
      }
    });
  };

  const clearAuthen = () => {
    localStorage.removeItem("token");
    dispatch(accountActions.clear());
  };

  const GetAddStockAndSetState = async (token) => {
    var response = await manageStockService.GetAddStocks(token);
    if (response.statusCode == 200) dispatch(setCartItem(response.data));
    else console.log(response);
  };

  const BuildColumn = () => {
    if (data)
      return data.map((item, index) => (
        <tr key={index}>
          <td className="text-center" scope={"" + (index == 0 && "row")}>
            <img
              style={{
                objectFit: "cover",
                width: 140,
                height: 140,
                borderRadius: "10px",
              }}
              src={
                item.productImage
                  ? item.productImage
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
              }
              alt={item.productImage}
            />
          </td>
          <td className="text-center">{item.name}</td>
          <td className="text-center">{item.categoryName}</td>
          <td className="text-center">{item.stock} ชิ้น</td>
          <td className="text-center">{item.stockSell} ชิ้น</td>
          <td className="text-center">
            {functionService.IntMoney(item.price)} บาท
          </td>
          <td className="text-center">
            <div className="btn-group">
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => navigation("/detailproduct/" + item.id)}
              >
                <i className="fa-solid fa-bars-staggered"></i>
              </button>
              <button
                className="btn btn-warning"
                type="button"
                onClick={() => navigation("/formproduct/" + item.id)}
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
              <button
                className="btn btn-danger"
                type="button"
                onClick={() => onDelete(item)}
              >
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </td>
        </tr>
      ));
  };

  const onAddCartItem = async (values) => {
    const token = localStorage.getItem("token");
    var isToken = await accountService.IsCheckToken(token);
    if (isToken) {
      var response = await manageStockService.CraeteCartItem(values, token);
      if (response.statusCode == 200) {
        Swal.fire("Success!", response.message, "success");
        GetAddStockAndSetState(token);
      } else
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.message,
        });
    } else clearAuthen();
  };

  const ModalAddCart = () => (
    <Formik
      initialValues={{ productId: "", amount: 1 }}
      onSubmit={(values) => {
        if (!values.productId) alert("กรุณาเลือกสินค้า");
        else onAddCartItem(values);
      }}
    >
      {({ values, handleChange, handleSubmit }) => (
        <div className="modal fade" id="addCart" aria-hidden="true">
          <form onSubmit={handleSubmit}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">เพิ่มลงตะกร้าการสั่งซื้อ</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <Field
                      className="form-select-sm form-select "
                      as="select"
                      name="productId"
                    >
                      <option value="">เลือกสินค้า</option>
                      {data &&
                        data.map((item, index) => (
                          <option key={index} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                    </Field>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      จำวนวน {values.amount} ชิ้น
                    </label>
                    <input
                      type="range"
                      className="form-range"
                      name="amount"
                      value={values.amount}
                      min="1"
                      max="99"
                      onChange={handleChange}
                      id="customRange2"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    ปิด
                  </button>
                  <button type="submit" className="btn btn-primary">
                    เพิ่งลงตะกร้า
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </Formik>
  );

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
        <div className="card mb-4">
          <div className="card-body">
            <form
              className="hstack gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                GetData();
              }}
            >
              <input
                className="form-control me-auto"
                type="text"
                placeholder="ค้นหา"
                aria-label="Search for..."
                aria-describedby="btnNavbarSearch"
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="btn btn-secondary"
                id="btnNavbarSearch"
                type="submit"
              >
                <i className="fas fa-search"></i>
              </button>
              <div className="vr" />
              <button
                className="btn btn-danger"
                id="btnNavbarSearch"
                type="button"
                onClick={() => {
                  setSearch("");
                  GetData();
                }}
              >
                <i className="fa-solid fa-arrow-rotate-left"></i>
              </button>
            </form>
            <div className="float-end mt-3">
              <div className="input-group">
                <Link
                  to="/formproduct"
                  className="btn btn-success"
                  id="btnNavbarSearch"
                  type="button"
                >
                  <i className="fas fa-plus"></i> เพิ่มสินค้า
                </Link>
                <button
                  className="btn btn-info"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#addCart"
                >
                  <i className="fa-solid fa-plus"></i> สั่งซื้อ
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="card mb-4">
          <div className="card-header">
            <i className="fas fa-table me-1"></i>
            ตารางข้อมูลสินค้า
          </div>
          <div className="card-body table-responsive">
            <table className="table table-striped table-hover ">
              <thead>
                <tr>
                  <th scope="col" className="col-md-2 text-center">
                    สินค้า
                  </th>
                  <th scope="col" className="col-md-2 text-center">
                    ชื่อสินค้า
                  </th>
                  <th scope="col" className="col-md-1 text-center">
                    ประเภท
                  </th>
                  <th scope="col" className="col-md-2 text-center">
                    จำนวนในคลัง
                  </th>
                  <th scope="col" className="col-md-1 text-center">
                    ยอดขาย
                  </th>
                  <th scope="col" className="col-md-2 text-center">
                    ราคา
                  </th>
                  <th scope="col" className="col-md-2 text-center">
                    จัดการ
                  </th>
                </tr>
              </thead>
              <tbody>
                <BuildColumn />
              </tbody>
            </table>

            {!data && (
              <div className="d-flex justify-content-center">
                <button
                className="btn btn-primary"
                type="button"
                disabled
              >
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                กำลังโหลด...
              </button>
              </div>
            )}

            <Pagination
              onChange={async (page) => onChangeCurrentPage(page)}
              currentPage={pagination.currentPage}
              totalPage={pagination.totalPage}
              count={pagination.count}
            />
          </div>
        </div>
      </div>
      <ModalAddCart />
    </main>
  );
};

export default MainProductsScreen;
