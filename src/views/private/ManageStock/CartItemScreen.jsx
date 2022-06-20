import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import * as manageStockService from "../../../services/manageStock.service";
import * as functionService from "../../../helper/functionService";
import { IsCheckToken } from "../../../services/account.service";
import { clear } from "../../../actions/account.action";
import { setCartItem, setTotal } from "../../../actions/managestock.action";

const CartItemScreen = (props) => {
  const dispatch = useDispatch();
  const { cartItem, total } = useSelector((state) => state.manageStock);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    GetCartItem();
  }, []);

  const GetCartItem = async () => {
    var token = localStorage.getItem("token");
    var isToken = await IsCheckToken(token);
    if (isToken) {
      var response = await manageStockService.GetAddStocks(token);
      if (response.statusCode == 200) {
        dispatch(setCartItem(response.data));
        dispatch(setTotal(response.total));
      } else console.log(response);
    } else {
      localStorage.removeItem("token");
      dispatch(clear());
    }
  };

  const onDeleteItem = async (id) => {
    Swal.fire({
      title: "ยืนยัน?",
      text: "ลบรายการสั่งซื้อ!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        var token = localStorage.getItem("token");
        var isToken = await IsCheckToken(token);
        if (isToken) {
          var response = await manageStockService.Delete(id, token);
          if (response.statusCode == 200) {
            GetCartItem();
            Swal.fire("Deleted!", response.message, "success");
          } else
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: response.message,
            });
        } else {
          localStorage.removeItem("token");
          dispatch(clear());
        }
      }
    });
  };

  const onPlusItem = async (id) => {
    var token = localStorage.getItem("token");
    var isToken = await IsCheckToken(token);
    if (isToken) {
      var response = await manageStockService.Plus(id, token);
      if (response.statusCode == 200) GetCartItem();
      else console.log(response);
    } else {
      localStorage.removeItem("token");
      dispatch(clear());
    }
  };

  const onRemoveItem = async (id) => {
    var token = localStorage.getItem("token");
    var isToken = await IsCheckToken(token);
    if (isToken) {
      var response = await manageStockService.Remove(id, token);
      if (response.statusCode == 200) GetCartItem();
      else console.log(response);
    } else {
      localStorage.removeItem("token");
      dispatch(clear());
    }
  };

  const onSubmitStock = async () => {
    Swal.fire({
      title: "ยืนยัน?",
      text: "ยืนยันการสั่งซื้อสินค้า!",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        var token = localStorage.getItem("token");
        var isToken = await IsCheckToken(token);
        if (isToken) {
          var response = await manageStockService.CreateManageStock(
            total,
            cartItem,
            token
          );
          if (response.statusCode == 200) {
            GetCartItem();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: response.message,
              showConfirmButton: false,
              timer: 1500,
            });
          } else console.log(response);
        } else {
          localStorage.removeItem("token");
          dispatch(clear());
        }
        setIsLoading(false);
      }
    });
  };

  const BuildColumn = () => {
    if (cartItem)
      return cartItem.map((item, index) => (
        <tr key={index}>
          <td>
            <div className="row">
              <div className="col-md-4 text-left">
                <Link to={"/detailproduct/" + item.product.id}>
                  <img
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                    }}
                    src={
                      item.product.productImage
                        ? item.product.productImage
                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
                    }
                    alt=""
                    className="img-fluid d-md-block rounded mb-2 shadow "
                  />
                </Link>
              </div>
              <div className="col-md-8 text-left mt-sm-2">
                <h4>{item.product.name}</h4>
                <p className="font-weight-light">
                  {item.product.categoryName}
                  {", "}
                  {functionService.IntMoney(item.product.price)} บาท
                </p>
              </div>
            </div>
          </td>
          <td className="text-center">
            <h4 className="">
              {functionService.IntMoney(item.sunAmountPrice)} บาท
            </h4>
          </td>
          <td className="text-center">
            <div className="btn-group" role="group">
              <button
                className="btn btn-primary"
                onClick={() => onRemoveItem(item.id)}
              >
                <i className="fa-solid fa-minus"></i>
              </button>
              <span className="btn btn-primary">{item.amount}</span>
              <button
                className="btn btn-primary"
                onClick={() => onPlusItem(item.id)}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
              <button
                className="btn btn-danger btn-md"
                onClick={() => onDeleteItem(item.id)}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      ));
  };

  if (!cartItem) return <></>;
  return (
    <main>
      <div className="container-fluid px-4">
        <h1 className="mt-4">{props.TitleTH}</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item">
            <Link to="/">หน้าหลัก</Link>
          </li>
          <li className="breadcrumb-item active">{props.NameTH}</li>
        </ol>
        <section className="pt-5 pb-5">
          <div className="container">
            <div className="row w-100">
              <div className="col-lg-12 col-md-12 col-12">
                <h3 className="display-5 mb-2 text-center">ตะกร้าสั่งซื้อ</h3>
                <p className="mb-5 text-center">
                  <i className="text-info font-weight-bold">
                    {cartItem && cartItem.length > 0 ? cartItem.length : 0}
                  </i>{" "}
                  รายการ ในตะกร้าสั่งซื้อ
                </p>
                <table
                  id="shoppingCart"
                  className="table table-condensed table-responsive"
                >
                  <thead>
                    <tr>
                      <th style={{ width: "20%" }}>สินค้า</th>
                      <th className="text-center" style={{ width: "20%" }}>
                        ราคา
                      </th>
                      <th className="text-center" style={{ width: "20%" }}>
                        จัดการ
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <BuildColumn />
                  </tbody>
                </table>
                <div className="float-right text-right">
                  <h4>ยอดรวม:</h4>
                  <h1>
                    {cartItem && cartItem.length > 0
                      ? functionService.IntMoney(total)
                      : 0}
                  </h1>
                </div>
              </div>
            </div>
            <div className="row mt-4 d-flex align-items-center">
              <div className="col-md-6">
                <Link to="/mainproducts">
                  <i className="fas fa-arrow-left mr-2"></i> หน้ารายการสินค้า
                </Link>
              </div>
              <div className="col-md-6">
                <button
                  href="catalog.html"
                  className="btn btn-primary mb-4 float-end btn-lg pl-5 pr-5"
                  onClick={() => onSubmitStock()}
                >
                  {isLoading ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    <span>ยืนยันการสั่งซื้อ</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default CartItemScreen;
