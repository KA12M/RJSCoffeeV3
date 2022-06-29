import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import useCartItem from "../../../logic/private/ManageStock/useCartItem";
import * as functionService from "../../../helper/functionService";

const CartItemScreen = (props) => {
  const {
    cartItem,
    total,
    isLoading,
    GetCartItem,
    onDeleteItem,
    onPlusItem,
    onRemoveItem,
    onSubmitStock,
  } = useCartItem();

  useEffect(() => {
    GetCartItem();
  }, []);

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

  if (!cartItem)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img src="../../../../assets/img/isloading.gif" alt="Loading" />
      </div>
    );
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
