import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import useDetailOrder from "./useDetailOrder";
import * as functionService from "../../../helper/functionService";

const DetailOrderScreen = (props) => {
  const { data, GetOrderDetail } = useDetailOrder();

  useEffect(() => {
    GetOrderDetail();
  }, []);

  const BuildCol1 = () => (
    <div className="card-body">
      <div className="row g-0">
        <Link
          to={"/detailaccount/" + data.account.id}
          className="col-md-2 d-flex justify-content-center align-items-center"
        >
          <img
            className="shadow"
            style={{
              objectFit: "cover",
              width: 90,
              height: 90,
              borderRadius: "100%",
              margin: 4,
            }}
            src={
              data.account.profileImage
                ? data.account.profileImage
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
            }
            alt={data.account.profileImage}
          />
        </Link>
        <div className="col-md-10">
          <div className="card-body">
            <h5 className="card-title">{data.account.name}</h5>
            <p className="card-text">{data.account.username}</p>
            <p className="card-text">
              <small className="text-muted">
                เข้าระบบเมื่อ{" "}
                {functionService.timeSince(data.account.createDate)}{" "}
                {functionService.Dateformat(data.account.createDate)}
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const BuildCol2 = () => {
    const { address } = data;
    return (
      <div className="card-body">
        <h5 className="card-title">{address.name}</h5>
        <p className="card-text">
          {address.detail} ต.{address.subDistrict} อ.{address.district} จ.
          {address.province} {address.zipcode}
        </p>
        <p className="card-text">
          <small className="text-muted">เบอร์โทรศัพท์: {address.telephone}</small>
        </p>
      </div>
    );
  };

  const BuildCol3 = () =>
    data.orderItem.map((item, i) => (
      <div key={i} className="card mb-2">
        <div className="row g-0">
          <Link
            to={"/detailproduct/" + item.productId}
            className="col-md-2 d-flex justify-content-center align-items-center"
          >
            <img
              src={item.productImage}
              style={{ width: "100%", height: "100px", objectFit: "cover" }}
              alt="..."
            />
          </Link>
          <div className="col-md-10">
            <div className="card-body">
              <h5 className="card-title">{item.productName}</h5>
              <p className="card-text">
                {item.categoryName},{" "}
                {functionService.IntMoney(item.productPrice)} บาท
              </p>
              <p className="card-text">
                <small className="text-muted">
                  x{item.amount} {functionService.IntMoney(item.sumAmountPrice)}{" "}
                  บาท
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    ));

  const BuildAccordionPayment = () => (
    <div className="accordion-item">
      <h2 className="accordion-header" id="flush-headingOne">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#payment"
          aria-expanded="false"
          aria-controls="payment"
        >
          การชำระเงิน
        </button>
      </h2>
      <div
        id="payment"
        className="accordion-collapse collapse"
        aria-labelledby="flush-headingOne d-flex justify-content-center align-items-center"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          {data.payment ? "" : "ยังไม่มีการชำระเงินจากลูกค้า"}
        </div>
      </div>
    </div>
  );

  const BuildAccordionTransportation = () => (
    <div className="accordion-item">
      <h2 className="accordion-header" id="flush-headingTwo">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapseTwo"
          aria-expanded="false"
          aria-controls="flush-collapseTwo"
        >
          การจัดส่งสินค้า
        </button>
      </h2>
      <div
        id="flush-collapseTwo"
        className="accordion-collapse collapse"
        aria-labelledby="flush-headingTwo"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">ยังไม่การจัดส่งสินค้า</div>
      </div>
    </div>
  );

  if (!data) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img src="/src/isloading.gif" alt="Loading" />
      </div>
    );
  }
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

        <div className="card mb-4 shadow-sm">
          <div className="card-header mb-2 d-flex justify-content-between">
            <h5>{props.NameTH} </h5>
            <div>
              <div className="badge bg-light fs-5 text-warning">
                {functionService.timeSince(data.createDate)}{" "}
                {functionService.Dateformat(data.createDate)}
              </div>
              <div
                className={
                  "p-2 float-end badge bg-" +
                  (data.status == "0"
                    ? "danger"
                    : data.status == "1"
                    ? "warning"
                    : data.status == "4"
                    ? "success"
                    : "primary")
                }
              >
                {functionService.OrderStatusFilter(data.status)}{" "}
              </div>
            </div>
          </div>

          <div className="card-body row">
            <div className="col-md-6">
              <div className="card mb-4">
                <div className="card-header">
                  <i className="fas fa-cart-shopping me-1"></i>
                  หมายเลขคำสั่งซื้อ {data.id}
                </div>
                <BuildCol1 />
              </div>
            </div>

            <div className="col-md-6">
              <div className="card mb-4">
                <div className="card-header">
                  <i className="fas fa-location-dot me-1"></i>
                  ที่อยู่ในการจัดส่ง
                </div>
                <BuildCol2 />
              </div>
            </div>

            <div className="col-md-6">
              <div className="card mb-4">
                <div className="card-header">
                  <i className="fas fa-basket-shopping me-1"></i>
                  รายการสินค้า ยอดรวม: {functionService.IntMoney(
                    data.total
                  )}{" "}
                  บาท
                </div>
                <div className="card-body">
                  <BuildCol3 />
                </div>
              </div>
            </div>

            <div className="col mb-4">
              <div className="card text-center">
                <div
                  className="accordion accordion-flush"
                  id="accordionFlushExample"
                >
                  <BuildAccordionPayment />

                  <BuildAccordionTransportation />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DetailOrderScreen;
