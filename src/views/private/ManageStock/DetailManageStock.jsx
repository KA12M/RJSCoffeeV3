import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import useDetailManageStock from "../../../logic/private/ManageStock/useDetailManageStock";
import * as functionService from "../../../helper/functionService";

const DetailManageStock = (props) => {
  const { navigation, id, data, GetManageStockById } = useDetailManageStock();

  useEffect(() => {
    if (id) GetManageStockById();
    else navigation(-1);
  }, []);

  const BuildMangeItem = () => {
    if (data && data.manageItem)
      return data.manageItem.map((item, i) => (
        <div key={i} className="card mb-3 m-2">
          <div className="row g-0">
            <Link to={"/detailproduct/" + item.product.id} className="col-md-2">
              <img
                src={
                  item.product.productImage
                    ? item.product.productImage
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
                }
                style={{
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
                className="img-fluid rounded-start"
                alt="..."
              />
            </Link>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{item.product.name}</h5>
                <p className="card-text">
                  {item.product.categoryName},{" "}
                  {functionService.IntMoney(item.product.price)} บาท
                </p>
                <p className="card-text">
                  <small className="text-muted">
                    x{item.amount}{" "}
                    {functionService.IntMoney(item.sumAmountPrice)} บาท
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      ));
  };

  if (!data)
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

        <div className="card mb-4 shadow-sm">
          <div className="card-header mb-3">
            <h4>
              {props.NameTH}{" "}
              <div className="badge bg-light fs-5 text-warning">
                {functionService.timeSince(data.createdDate)}{" "}
                {functionService.Dateformat(data.createdDate)}
              </div>
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
              <BuildMangeItem />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DetailManageStock;
