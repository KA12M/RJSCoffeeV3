import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import * as functionService from "../../../helper/functionService";

import UseDetailAccount from "./useDetailAccount";

const DetailAccountScreen = (props) => {
  const { id, navigation, accoutData, address, cartItemData, GetDataAccount } =
    UseDetailAccount();

  useEffect(() => {
    if (id) GetDataAccount();
    else navigation(-1);
  }, []);

  if (!accoutData)
    return (
      <div className="d-flex justify-content-center">
        <button className="btn btn-primary" type="button" disabled>
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          กำลังโหลด...
        </button>
      </div>
    );

  const BuildAddressCard = () =>
    address.map((item, i) => (
      <div key={i} class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">{item.name}</h5>
          <p class="card-text">
            {item.detail} ต.{item.subDistrict} อ.{item.district} จ.
            {item.province} {item.zipCode}
          </p>
          <p class="card-text">
            <small class="text-muted">เบอร์โทรศัพท์: {item.telephone}</small>
          </p>
        </div>
      </div>
    ));

  const BuildCartItem = () =>
    cartItemData.map((item, i) => (
      <div key={i} class="card mb-3">
        <div class="row g-0">
          <Link
            to={"/detailproduct/" + item.productId}
            class="col-md-2"
            style={{ alignContent: "center" }}
          >
            <img
              style={{
                width: "100%",
                height: 115,
                objectFit: "cover",
              }}
              src={item.productImage}
              class="img-fluid rounded-start"
              alt="..."
            />
          </Link>
          <div class="col-md-10">
            <div class="card-body">
              <h5 class="card-title">{item.productName}</h5>
              <p class="card-text">
                {item.productCategoryName},{" "}
                {functionService.IntMoney(item.productPrice)} บาท
              </p>
              <p class="card-text">
                x{item.amount} ชิ้น{" "}
                {functionService.IntMoney(item.sumAmountPrice)} บาท
              </p>
              <p class="card-text">
                <small class="text-muted">
                  เพิ่มเมื่อ {functionService.timeSince(item.createDate)}{" "}
                  {functionService.Dateformat(item.createDate)}
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    ));

  return (
    <main>
      <div className="container-fluid px-4 ">
        <h1 className="mt-4">{props.TitleTH}</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item">
            <Link to="/">หน้าหลัก</Link>
          </li>
          <li className="breadcrumb-item active">{props.NameTH}</li>
        </ol>

        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="card mb-4">
                  <div className="card-header">
                    <i className="fas fa-user me-1"></i>
                    {accoutData.id}
                  </div>
                  <div className="card-body">
                    <h3 className="my-3">
                      <img
                        style={{
                          objectFit: "cover",
                          width: 90,
                          height: 90,
                          borderRadius: "100%",
                        }}
                        src={
                          accoutData.profileImage
                            ? accoutData.profileImage
                            : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
                        }
                        alt={accoutData.profileImage}
                      />{" "}
                      {accoutData.name}
                    </h3>
                    <ul>
                      <li>{accoutData.username}</li>
                      <li>สถานะ: {accoutData.role}</li>
                      <li>
                        เข้าระบบเมื่อ:{" "}
                        {functionService.timeSince(accoutData.createDate) + " "}
                        {functionService.Dateformat(accoutData.createDate)}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {address && (
                <div className="col-md-6">
                  <div className="card mb-4">
                    <div className="card-header">
                      <i className="fa-solid fa-location-dot me-1"> </i>
                      ที่อยู่
                    </div>
                    <div className="card-body">
                      {address && <BuildAddressCard />}
                    </div>
                  </div>
                </div>
              )}

              {cartItemData && (
                <div className="col-md-6">
                  <div className="card mb-4">
                    <div className="card-header">
                      <i className="fa-solid fa-cart-shopping me-1"> </i>
                      สินค้าในตะกร้าของ {accoutData.name}
                    </div>
                    <div className="card-body">
                      {cartItemData && <BuildCartItem />}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DetailAccountScreen;
