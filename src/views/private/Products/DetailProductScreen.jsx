import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import useDetailProduct from "../../../logic/private/Products/useDetailProduct";
import * as functionService from "../../../helper/functionService";

const DetailProductScreen = (props) => {
  const { id, navigation, data, GetProductDetail } = useDetailProduct();

  useEffect(() => {
    if (id) GetProductDetail();
    else navigation(-1);
    functionService.ScrollToTop();
  }, [id]);

  const BuildGallery = () => {
    return (
      <div className="">
        <h1 className="fw-light text-center text-lg-start mt-4 mb-0">รูปภาพ</h1>
        <hr className="mt-2 mb-5" />
        <div className="row text-center text-lg-start">
          {data.productImages.map((item, i) => (
            <div key={i} className="col-lg-3 col-md-4 col-6">
              <a href="#" className="d-block mb-4 h-100">
                <img
                  style={{ width: "100%", height: "280px", objectFit: "cover" }}
                  className="img-fluid img-thumbnail"
                  src={item.img}
                  alt=""
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const BuildImgSlide = () => {
    if (data.productImages)
      return (
        <div
          id="carouselExampleIndicators"
          className="carousel slide shadow rounded-4"
          data-bs-ride="true"
        >
          <div className="carousel-indicators">
            {data.productImages &&
              data.productImages.length > 0 &&
              data.productImages.map((item, i) => (
                <button
                  key={i}
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to={i}
                  className={0 == i ? "active" : ""}
                  aria-current="true"
                  aria-label={"Slide " + i}
                ></button>
              ))}
          </div>
          <div className="carousel-inner rounded-2">
            {data &&
              data.productImages.length > 0 &&
              data.productImages.map((item, index) => (
                <div
                  key={index}
                  className={"carousel-item " + (0 == index && "active")}
                >
                  <img
                    src={item.img}
                    style={{ height: "480px", objectFit: "cover" }}
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
              ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      );
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
      <div className="container-fluid px-4 ">
        <h1 className="mt-4">{props.TitleTH}</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item">
            <Link to="/">หน้าหลัก</Link>
          </li>
          <li className="breadcrumb-item active">{props.NameTH}</li>
        </ol>

        <div className="card mb-4 shadow-sm">
          <div className="card-header">
            <h3 className="my-4">
              <small> {data.name} </small>
              <button
                onClick={() => navigation("/formproduct/" + data.id)}
                className="btn btn-warning"
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
              <button type="button" className="btn btn-success float-end">
                ยอดขาย{" "}
                <span className="badge text-bg-secondary">
                  {data.stockSell} ชิ้น
                </span>
              </button>
              <button type="button" className="btn btn-primary float-end">
                ในคลัง{" "}
                <span className="badge text-bg-secondary">
                  {data.stock} ชิ้น
                </span>
              </button>
            </h3>
          </div>
        </div>

        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <div className="row mb-3">
              {data.productImages && (
                <div className="col-md-4">
                  <BuildImgSlide />
                </div>
              )}

              <div className="col-md-5">
                <h3 className="my-3">เลขสินค้า: {data.id}</h3>
                <h5 className="my-3">{data.categoryName}</h5>
                <ul>
                  {data.categoryId == 3 && (
                    <>
                      <li>เมล็ดพันธ์: {data.seed}</li>
                      <li>ระดับการคั่ว: {data.level}</li>
                    </>
                  )}
                  <li>ราคา: {functionService.IntMoney(data.price)} บาท</li>
                  <li>
                    เข้าระบบเมื่อ:{" "}
                    {functionService.timeSince(data.createDate) + " "}
                    {functionService.Dateformat(data.createDate)}
                  </li>
                </ul>
                <p>รายละเอียดสินค้า: {data.detail}</p>
              </div>
            </div>
          </div>
        </div>
        {data.productImages && (
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              {data.productImages.length > 0 && <BuildGallery />}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default DetailProductScreen;
