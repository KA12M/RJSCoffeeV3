import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import useMainManageStock from "../../../logic/private/ManageStock/useMainManageStock";
import * as functionService from "../../../helper/functionService";
import Pagination from "../../../components/Pagination";

const MainManageStock = (props) => {
  const ref = React.useRef();
  const {
    pagination,
    data,
    GetManageStock,
    onChangeCurrentPage,
    onChangePageSize,
  } = useMainManageStock();

  useEffect(() => {
    GetManageStock();
  }, []);

  const BuildColumn = () => {
    if (data)
      return data.map((item, i) => {
        return (
          <tr key={i}>
            <th className="text-center" scope="row">
              {" "}
              <Link to={"/detailmanagestock/" + item.id}>
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
              <div className="badge bg-light fs-5 text-warning">
                {functionService.timeSince(item.createdDate)}{" "}
                {functionService.Dateformat(item.createdDate)}
              </div>
            </td>
            <td className="text-center">
              <Link
                to={"/detailmanagestock/" + item.id}
                className="btn btn-warning"
              >
                รายละเอียด
              </Link>
            </td>
          </tr>
        );
      });
  };

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

        <div className="card mb-4" ref={ref}>
          <div className="card-header">
            <i className="fas fa-table me-1"></i>
            ตาราง{props.NameTH}
          </div>
          <div className="card-body table-responsive">
            <div className="row mb-3 p-2">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th className="text-center col-1" scope="col">
                      รายการ
                    </th>
                    <th className="text-center col-2" scope="col">
                      เลขสั่งซื้อ
                    </th>
                    <th className="text-center col-2" scope="col">
                      ทั้งหมด
                    </th>
                    <th className="text-center col-2" scope="col">
                      ยอดรวม
                    </th>
                    <th className="text-center col-2" scope="col">
                      วันที่
                    </th>
                    <th className="text-center col-3" scope="col">
                      จัดการ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <BuildColumn />
                </tbody>
              </table>

              {!data && (
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
              )}
            </div>

            <Pagination
              onChange={async (page) => onChangeCurrentPage(page)}
              currentPage={pagination.currentPage}
              totalPage={pagination.totalPage}
              count={pagination.count}
              pageSize={pagination.pageSize}
              onChangePageSize={async (pageSize) => onChangePageSize(pageSize)}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainManageStock;
