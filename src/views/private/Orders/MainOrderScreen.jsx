import React, { useEffect } from "react";

import Pagination from "../../../components/Pagination";
import useMainOrder from "./useMainOrder";

const MainOrderScreen = (props) => {
  const { data, pagination, GetOrders } = useMainOrder();

  useEffect(() => {
    GetOrders();
  }, []);
  
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
          <div className="card-header">
            <i className="fas fa-table me-1"></i>
            ตาราง{props.NameTH}
          </div>
          <div className="card-body table-responsive">
            <div className="row mb-3 p-2">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th className="text-center" scope="col">
                      รายการ
                    </th>
                    <th className="text-center" scope="col">
                      เลขสั่งซื้อ
                    </th>
                    <th className="text-center" scope="col">
                      ทั้งหมด
                    </th>
                    <th className="text-center" scope="col">
                      ยอดรวม
                    </th>
                    <th className="text-center" scope="col">
                      วันที่
                    </th>
                    <th className="text-center" scope="col">
                      จัดการ
                    </th>
                  </tr>
                </thead>
                <tbody> </tbody>
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

export default MainOrderScreen;
