import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import useDetailOrder from "../../../logic/private/Orders/useDetailOrder";
import * as functionService from "../../../helper/functionService";
import { Formik } from "formik";

const DetailOrderScreen = (props) => {
  const {
    data,
    GetOrderDetail,
    handleConfirmPayment,
    idIsUpdate,
    setIdIsUpdate,
    isUpdate,
    setIsUpdate,
    handleUpdatePayment,
    jsonTransportationStatus,
    setIndexUpdateTransportation,
    isFormTransportation,
    setIsFormTransportation,
    status,
    setStatus,
    detail,
    setDetail,
    handleSubmitFormTransportation,
    handleDeleteTransportation,
  } = useDetailOrder();

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
          <small className="text-muted">
            เบอร์โทรศัพท์: {address.telephone}
          </small>
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
          <span>การชำระเงิน</span>
          <span style={{ marginLeft: 10 }} className="badge btn btn-primary">
            {data.payment && data.payment.length}
          </span>
        </button>
      </h2>
      <div
        id="payment"
        className="accordion-collapse collapse"
        aria-labelledby="flush-headingOne d-flex justify-content-center align-items-center"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          {!data.payment && "ยังไม่มีการชำระเงินจากลูกค้า"}
          {data.payment && (
            <div className="table-responsive">
              {data.status === "2" && (
                <div className="d-flex flex-row-reverse">
                  <button
                    className="btn btn-primary m-2"
                    type="button"
                    onClick={handleConfirmPayment}
                  >
                    ยืนยันการชำระเงิน
                  </button>
                </div>
              )}
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th className="text-center col-1" scope="col">
                      ใบเสร็จ
                    </th>
                    <th className="text-center col-2" scope="col">
                      วันที่
                    </th>
                    <th className="text-center col-2" scope="col">
                      สถานะ
                    </th>
                    <th className="text-center col-2" scope="col">
                      รายละเอียด
                    </th>
                    {data.status === "2" && (
                      <th className="text-center col-1" scope="col">
                        จัดการ
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {data.payment.map((item, index) => (
                    <tr key={index}>
                      <td className="text-center">
                        <img
                          style={{
                            height: 140,
                            width: 140,
                            objectFit: "cover",
                          }}
                          src={item.imgPay}
                          alt=""
                        />
                      </td>
                      <td className="text-center">
                        {functionService.timeSince(item.createdate)}{" "}
                        {functionService.Dateformat(item.createdate)}
                      </td>
                      <td className="text-center">{item.status}</td>
                      <td className="text-center">{item.detail}</td>
                      {data.status === "2" && (
                        <td className="text-center">
                          <button
                            type="button"
                            className="btn btn-warning"
                            onClick={(e) => {
                              e.preventDefault();
                              setIsUpdate(true);
                              setIdIsUpdate(index);
                            }}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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
          <span>การจัดส่งสินค้า</span>
          <span style={{ marginLeft: 10 }} className="badge btn btn-warning">
            {data.transportation && data.transportation.length}
          </span>
        </button>
      </h2>
      <div
        id="flush-collapseTwo"
        className="accordion-collapse collapse"
        aria-labelledby="flush-headingTwo"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          {data.status != "3" && "ยังไม่การจัดส่งสินค้า"}
          {data.status != "1" && data.status != "2" && data.status != "0" ? (
            <div className="table-responsive">
              <div className="d-flex flex-row-reverse">
                <button
                  className="btn btn-success m-2"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsFormTransportation(true);
                  }}
                >
                  เพิ่มการขนส่ง
                </button>
              </div>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th className="text-center col-1" scope="col">
                      วันที่
                    </th>
                    <th className="text-center col-2" scope="col">
                      สถานะ
                    </th>
                    <th className="text-center col-2" scope="col">
                      รายละเอียด
                    </th>
                    <th className="text-center col-2" scope="col">
                      จัดการ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.transportation &&
                    data.transportation.map((item, index) => (
                      <tr key={index}>
                        <td className="text-center">
                          {functionService.timeSince(item.date)}{" "}
                          {functionService.Dateformat(item.date)}
                        </td>
                        <td className="text-center">{item.status}</td>
                        <td className="text-center">{item.detail}</td>
                        <td className="text-center">
                          <div className="btn-group">
                            <button
                              type="button"
                              className="btn btn-warning"
                              onClick={(e) => {
                                e.preventDefault();
                                setIsFormTransportation(true);
                                setIndexUpdateTransportation(index);
                                setStatus(data.transportation[index].status);
                                setDetail(data.transportation[index].detail);
                              }}
                            >
                              <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() =>
                                handleDeleteTransportation(item.id)
                              }
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            ""
          )}
        </div>
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
        <img src="../../../../assets/img/isloading.gif" alt="Loading" />
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

            <div className="col-md-6">
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

            {isUpdate && idIsUpdate != null ? (
              <div className="col-md-6 mt-2">
                <div className="card p-4">
                  <span>
                    {functionService.timeSince(
                      data.payment[idIsUpdate].createdate
                    )}{" "}
                    {functionService.Dateformat(
                      data.payment[idIsUpdate].createdate
                    )}
                  </span>
                  <img
                    style={{
                      height: 280,
                      width: 280,
                      objectFit: "cover",
                    }}
                    src={data.payment[idIsUpdate].imgPay}
                    alt=""
                  />
                </div>
              </div>
            ) : (
              ""
            )}
            {isUpdate && idIsUpdate != null ? (
              <Formik
                enableReinitialize
                initialValues={{
                  status: idIsUpdate ? data.payment[idIsUpdate].status : "",
                  detail: idIsUpdate ? data.payment[idIsUpdate].detail : "",
                }}
                onSubmit={(values) => {
                  if (values.status != "" && values.detail != "")
                    handleUpdatePayment({
                      ...data.payment[idIsUpdate],
                      ...values,
                    });
                }}
              >
                {({ values, handleSubmit, handleChange }) => (
                  <div className="col-md-6 mt-2">
                    <form onSubmit={handleSubmit} className="card p-4">
                      <div className="mb-3">
                        <label className="form-label">สถานะ</label>
                        <input
                          type="text"
                          className="form-control"
                          name="status"
                          value={values.status}
                          onChange={handleChange}
                        />
                      </div>
                      <div class="mb-3">
                        <label className="form-label">รายละเอียด</label>
                        <textarea
                          className="form-control"
                          rows="3"
                          name="detail"
                          value={values.detail}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                      <button className="btn btn-success" type="submit">
                        บันทึก
                      </button>
                    </form>
                  </div>
                )}
              </Formik>
            ) : (
              ""
            )}

            {isFormTransportation && (
              <div className="col-md-6 mt-2">
                <div className="card p-4" style={{ alignItems: "center" }}>
                  <img
                    style={{
                      width: "57.3%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    src="https://www.kindpng.com/picc/m/182-1828684_van-truck-transport-vehicle-comments-shipping-icon-png.png"
                    alt=""
                  />
                </div>
              </div>
            )}

            {isFormTransportation && (
              <div className="col-md-6 mt-2">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmitFormTransportation();
                  }}
                  className="card p-4"
                >
                  <div className="mb-3">
                    <label className="form-label">สถานะ</label>
                    <select
                      className="form-select"
                      name="status"
                      values={status}
                      defaultValue={status}
                      onChange={(e) => {
                        e.preventDefault();
                        setStatus(e.target.value);
                      }}
                    >
                      <option value="">กรุณาเลือกสถานะ</option>
                      {jsonTransportationStatus.map((item) => (
                        <option key={item.id} value={item.NameTH}>
                          {item.NameTH}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">รายละเอียด</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      name="detail"
                      value={detail}
                      onChange={(e) => setDetail(e.target.value)}
                    ></textarea>
                  </div>
                  <button className="btn btn-success" type="submit">
                    บันทึก
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DetailOrderScreen;
