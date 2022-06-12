import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import * as functionService from "../../../helper/functionService";
import { IsCheckToken } from "../../../services/account.service";
import { GetById } from "../../../services/manageStock.service";

const DetailManageStock = (props) => {
  const navigation = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    if (id) GetManageStockById();
    else navigation(-1);
  }, []);

  const GetManageStockById = async () => {
    var token = localStorage.getItem("token");
    var isToken = await IsCheckToken(token);
    if (isToken) {
      var response = await GetById(id, token);
      if (response.statusCode === 200) setData(response.data);
      else console.log(response.message);
    }
  };

  const BuildMangeItem = () => {
    if (data && data.manageItem)
      return data.manageItem.map((item, i) => (
        <div key={i} className="d-flex position-relative p-3">
          <Link to={"/detailproduct/" + item.product.id}>
            <img
              src={
                item.product.productImage
                  ? item.product.productImage
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
              }
              style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
                borderRadius: "5px",
              }}
              className="flex-shrink-0 me-3"
              alt="..."
            />
          </Link>
          <div style={{ width: "50%" }}>
            <h5 className="mt-0">{item.product.name}</h5>
            <p>
              {item.product.categoryName},{" "}
              {functionService.IntMoney(item.product.price)} บาท
            </p>
            <div className="d-flex justify-content-between">
              <div className="p-2">x{item.amount}</div>
              <div className="ml-auto p-2">
                {functionService.IntMoney(item.sumAmountPrice)} บาท
              </div>
            </div>
          </div>
        </div>
      ));
  };

  if (!data) return <></>;
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

        <div className="card mb-4 shadow-sm">
          <div className="card-header mb-3">
            <h4>
              {props.NameTH} <div className="badge bg-light fs-5 text-warning">{functionService.Dateformat(data.createdDate)}</div>
            </h4>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="m-3">
                <p>เลขสั่งซื้อ: {data.id}</p>
                <p> ทั้งหมด: {data.itemCount} รายการ</p>
                <p>ยอดรวม: {functionService.IntMoney(data.total)} บาท</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row">
                <BuildMangeItem />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DetailManageStock;
