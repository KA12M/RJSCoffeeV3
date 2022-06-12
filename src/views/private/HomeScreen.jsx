import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import * as functionService from "../../helper/functionService";
import * as accountService from "../../services/account.service";

const Home = (props) => {
  const navigation = useNavigate();
  const [accountData, setAccountData] = useState();

  useEffect(() => {
    GetByCraeteDateLast();
  }, []);

  const GetByCraeteDateLast = async () => {
    var token = localStorage.getItem("token");
    var isToken = await accountService.IsCheckToken(token);
    if (isToken) {
      var response = await accountService.GetByCraeteDateLast(3, token);
      if (response.statusCode === 200) setAccountData(response.data);
      else console.log(response.message);
    }
  };

  const BuildAccountData = () =>
    accountData.map((item, index) => {
      return (
        <div key={index} className="d-flex position-relative">
          <img
            style={{
              width: "120px",
              height: "120px",
              objectFit: "cover",
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
            <h5 className="mt-0">
              {functionService.timeSince(item.createDate)}
            </h5>
            <p>
              This is some placeholder content for the custom component. It is
              intended to mimic what some real-world content would look like,
              and we're using it here to give the component a bit of body and
              size.
            </p>
          </div>
        </div>
      );
    });
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
              <div className="card-body">Primary Card</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <a className="small text-white stretched-link" href="#">
                  View Details
                </a>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-warning text-white mb-4">
              <div className="card-body">Warning Card</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <a className="small text-white stretched-link" href="#">
                  View Details
                </a>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-success text-white mb-4">
              <div className="card-body">Success Card</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <a className="small text-white stretched-link" href="#">
                  View Details
                </a>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-danger text-white mb-4">
              <div className="card-body">Danger Card</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <a className="small text-white stretched-link" href="#">
                  View Details
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
                <i className="fas fa-chart-area me-1"></i>
                Area Chart Example
              </div>
              <div className="card-body">
                <canvas id="myAreaChart" width="100%" height="40"></canvas>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="card mb-4">
              <div className="card-header">
                <i className="fas fa-chart-bar me-1"></i>
                ผู้ใช้งาน
              </div>
              <div className="card-body">
                {accountData && <BuildAccountData />}
              </div>
              <div className="card-footer">
                <div
                  onClick={() => navigation("/mainaccounts")}
                  className="d-flex justify-content-center"
                  style={{cursor: "pointer"}}
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
            DataTable Example
          </div>
          <div className="card-body"></div>
        </div>
      </div>
    </main>
  );
};

export default Home;
