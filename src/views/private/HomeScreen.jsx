import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import * as functionService from "../../helper/functionService";
import useHome from "../../logic/private/useHome";

const Home = (props) => {
  const { accountData, GetData, productData, navigation, orderData } =
    useHome();

  useEffect(() => {
    GetData();
  }, []);

  const BuildAccountData = () =>
    accountData.map((item, index) => {
      return (
        <div key={index} className="d-flex position-relative">
          <img
            style={{
              width: "90px",
              height: "90px",
              objectFit: "cover",
              borderRadius: "100%",
              padding: "8px",
            }}
            src={
              item.profileImage
                ? item.profileImage
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
            }
            className="flex-shrink-0 me-3"
            alt="..."
          />
          <div>
            <h5 className="mt-3">
              {item.name} {item.username}
            </h5>
            <small>
              เข้าสู่ระบบ: {functionService.timeSince(item.createDate)}{" "}
              {functionService.Dateformat(item.createDate)}
            </small>
          </div>
        </div>
      );
    });

  const BuildProductData = () =>
    productData.map((item, index) => {
      return (
        <div key={index} className="d-flex position-relative">
          <img
            style={{
              width: "90px",
              height: "90px",
              objectFit: "cover",
              borderRadius: "100%",
              padding: "8px",
            }}
            src={
              item.productImage
                ? item.productImage
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
            }
            className="flex-shrink-0 me-3"
            alt="..."
          />
          <div>
            <h5 className="mt-3">{item.name}</h5>
            <small>
              เพิ่มเข้าระบบเมื่อ: {functionService.timeSince(item.createDate)}{" "}
              {functionService.Dateformat(item.createDate)}
            </small>
          </div>
        </div>
      );
    });

  const BuildColumnOrder = () =>
    orderData.map((item, index) => (
      <tr key={index}>
        <th className="text-center" scope="row">
          {" "}
          <Link to={"/detailorder/" + item.id}>
            <img
              src={
                item.productImage
                  ? item.productImage
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
              }
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "5px",
              }}
              className="flex-shrink-0 me-3"
              alt="..."
            />
          </Link>
        </th>
        <td className="text-center">{item.id}</td>
        <td className="text-center">{item.itemCount} รายการ</td>
        <td className="text-center">
          {functionService.IntMoney(item.total)} บาท
        </td>
        <td className="text-center">
          <div
            className={
              "badge bg-" +
              (item.status == "0"
                ? "danger"
                : item.status == "1"
                ? "warning"
                : item.status == "4"
                ? "success"
                : "primary")
            }
          >
            {functionService.OrderStatusFilter(item.status)}{" "}
          </div>
        </td>
        <td className="text-center">
          <div className="badge bg-light fs-5 text-warning">
            {functionService.timeSince(item.createDate)}{" "}
            {functionService.Dateformat(item.createDate)}
          </div>
        </td>
        <td className="text-center">
          <Link to={"/detailorder/" + item.id} className="btn btn-warning">
            รายละเอียด
          </Link>
        </td>
      </tr>
    ));
  return (
    <main>
      <div className="container-fluid px-4">
        <h1 className="mt-4">{props.TitleTH}</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item active">{props.NameTH}</li>
        </ol>
        <div className="row">
          <div className="col-xl-3 col-md-6">
            <div className="card bg-primary text-white mb-4">
              <div className="card-body">CoffeeShopV3</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <a className="small text-white stretched-link" href="#">
                  ReactJs | ASP.NET Core Web API 
                </a>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-warning text-white mb-4">
              <div className="card-body">CoffeeShopV3</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <a className="small text-white stretched-link" href="#">
                  ReactJs | ASP.NET Core Web API
                </a>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-success text-white mb-4">
              <div className="card-body">CoffeeShopV3</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <a className="small text-white stretched-link" href="#">
                  ReactJs | ASP.NET Core Web API
                </a>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-danger text-white mb-4">
              <div className="card-body">CoffeeShopV3</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <a className="small text-white stretched-link" href="#">
                  ReactJs | ASP.NET Core Web API
                </a>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-6">
            <div className="card mb-4">
              <div className="card-header">
                <i className="fas fa-align-left me-1"></i>
                สินค้า
              </div>
              <div className="card-body">
                {productData && <BuildProductData />}
              </div>
              <div className="card-footer">
                <div
                  onClick={() => navigation("/mainproducts")}
                  className="d-flex justify-content-center"
                  style={{ cursor: "pointer" }}
                >
                  เพิ่มเติม
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="card mb-4">
              <div className="card-header">
                <i className="fas fa-user me-1"></i>
                ผู้ใช้งาน
              </div>
              <div className="card-body">
                {accountData && <BuildAccountData />}
              </div>
              <div className="card-footer">
                <div
                  onClick={() => navigation("/mainaccounts")}
                  className="d-flex justify-content-center"
                  style={{ cursor: "pointer" }}
                >
                  เพิ่มเติม
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card mb-4">
          <div className="card-header">
            <i className="fas fa-table me-1"></i>
            คำสั่งซื้อของลูกค้า
          </div>
          <div className="card-body table-responsive">
            <div className="row  p-2">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th className="text-center col-1" scope="col">
                      รายการ
                    </th>
                    <th className="text-center col-2" scope="col">
                      เลขสั่งซื้อ
                    </th>
                    <th className="text-center col-1" scope="col">
                      ทั้งหมด
                    </th>
                    <th className="text-center col-1" scope="col">
                      ยอดรวม
                    </th>
                    <th className="text-center col-1" scope="col">
                      สถานะ
                    </th>
                    <th className="text-center col-2" scope="col">
                      วันที่
                    </th>
                    <th className="text-center col-2" scope="col">
                      จัดการ
                    </th>
                  </tr>
                </thead>
                <tbody>{orderData ? <BuildColumnOrder /> : <tr></tr>}</tbody>
              </table>
            </div>
          </div>
          <div className="card-footer">
            <div
              onClick={() => navigation("/mainorders")}
              className="d-flex justify-content-center"
              style={{ cursor: "pointer" }}
            >
              เพิ่มเติม
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
