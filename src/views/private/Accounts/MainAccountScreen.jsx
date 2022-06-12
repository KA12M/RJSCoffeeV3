import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import Pageination from "../../../components/Pagination";
import * as functionService from "../../../helper/functionService";
import * as accountActions from "../../../actions/account.action";
import * as accountService from "../../../services/account.service";

const MainAccountScreen = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 5,
  });
  const [search, setSearch] = useState("");

  const pageSizeList = [5, 10, 25, 50];

  useEffect(() => {
    GetData();
  }, []);

  const GetData = async () => {
    const token = localStorage.getItem("token");
    let isChkToken = await accountService.IsCheckToken(token);
    if (isChkToken) {
      var response = await accountService.GetAccounts({
        ...pagination,
        search,
        token,
      });
      if (response.statusCode === 200) {
        setData(response.data);
        setPagination(response.pagination);
      }
    } else {
      localStorage.removeItem("token");
      dispatch(accountActions.clear());
    }
    functionService.ScrollToTop();
  };

  const onChangeCurrentPage = (page) => {
    pagination.currentPage = page;
    setPagination(pagination);
    GetData();
  };

  const onDeleteAccount = async (item) => {
    Swal.fire({
      title: "ยืนยันการลบ?",
      text: `ต้องการลบบัญชีผู้ใช้ ${item.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");
        var isChkToken = await accountService.IsCheckToken(token);
        if (isChkToken) {
          var response = await accountService.DeleteAccount({
            id: item.id,
            token,
          });
          DialogAlert(response);
        }
      }
    });
  };

  const DialogAlert = (response) => {
    if (response.statusCode == 200) {
      Swal.fire("Deleted!", response.message, "success");
      GetData();
    } else
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: response.message,
      });
  };

  const BuildColumn = () => {
    if (data)
      return data.map((item, index) => (
        <tr key={index}>
          <td className="text-center">
            <img
              style={{
                objectFit: "cover",
                width: 70,
                height: 70,
                borderRadius: "100%",
              }}
              src={
                item.profileImage
                  ? item.profileImage
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
              }
              alt={item.profileImage}
            />
          </td>
          <td className="text-center">{item.name}</td>
          <td className="text-center">{item.username}</td>
          <td className="text-center">{item.role}</td>
          <td className="text-center">
            {functionService.timeSince(item.createDate) + " "}
            {functionService.Dateformat(item.createDate)}
          </td>
          <td className="text-center">
            <div className="btn-group">
              <button type="button" className="btn btn-warning">
                <i
                  className="fa-solid fa-address-card"
                  style={{ color: "white" }}
                ></i>
              </button>
              <button
                onClick={() => onDeleteAccount(item)}
                type="button"
                className="btn btn-danger"
              >
                <i className="fa-solid fa-ban"></i>
              </button>
            </div>
          </td>
        </tr>
      ));
  };

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
        <div className="card mb-4">
          <div className="card-body">
            <form
              className="hstack gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                GetData();
              }}
            >
              <input
                className="form-control"
                type="text"
                placeholder="ค้นหา"
                aria-label="Search for..."
                aria-describedby="btnNavbarSearch"
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="btn btn-secondary"
                id="btnNavbarSearch"
                type="submit"
              >
                <i className="fas fa-search"></i>
              </button>
              <div className="vr" />
              <button
                className="btn btn-danger"
                id="btnNavbarSearch"
                type="button"
                onClick={() => {
                  setSearch("");
                  GetData();
                }}
              >
                <i className="fa-solid fa-arrow-rotate-left"></i>
              </button>
            </form>
          </div>
        </div>
        <div className="card mb-4">
          <div className="card-header">
            <i className="fas fa-table me-1"></i>
            ตารางข้อมูลผู้ใช้
          </div>
          <div className="card-body table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th className="col-md-1 text-center">บัญชีผู้ใช้</th>
                  <th className="col-md-2 text-center">ชื่อ</th>
                  <th className="col-md-2 text-center">ชื่อผู้ใข้งาน</th>
                  <th className="col-md-1 text-center">สถานะ</th>
                  <th className="col-md-2 text-center">วันที่เข้าสู่ระบบ</th>
                  <th className="col-md-3 text-center">จัดการ</th>
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

            <Pageination
              currentPage={pagination.currentPage}
              totalPage={pagination.totalPage}
              count={pagination.count}
              onChange={async (page) => onChangeCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainAccountScreen;
