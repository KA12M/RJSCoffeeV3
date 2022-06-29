import { useSelector, useDispatch } from "react-redux";
import * as XLSX from "xlsx";

import * as orderActions from "../../../actions/order.action";
import * as accountActions from "../../../actions/account.action";

import * as functionService from "../../../helper/functionService";
import * as orderService from "../../../services/order.service";
import { IsCheckToken } from "../../../services/account.service";

const UseMainOrder = () => {
  const dispatch = useDispatch();
  const { data, pagination } = useSelector((state) => state.order);

  const GetOrders = async () => {
    let token = localStorage.getItem("token");
    let isToken = await IsCheckToken(token);
    if (isToken) {
      var response = await orderService.GetOrders(pagination, token);
      if (response.statusCode === 200) {
        dispatch(orderActions.setData(response.data));
        dispatch(
          orderActions.setPagination({ ...pagination, ...response.pagination })
        );
      }
    } else {
      localStorage.removeItem("token");
      dispatch(accountActions.clear());
    }
  };

  const onChangePageSize = async (pageSize) => {
    pagination.pageSize = pageSize;
    pagination.currentPage = 1;
    dispatch(orderActions.setPagination({ ...pagination, pageSize: pageSize }));
    GetOrders();
  };

  const onChangeCurrentPage = async (currentPage) => {
    pagination.currentPage = currentPage;
    dispatch(
      orderActions.setPagination({ ...pagination, currentPage: currentPage })
    );
    GetOrders();
  };

  const handleExportExcel = async () => {
    var token = localStorage.getItem("token");
    var isToken = await IsCheckToken(token);
    if (isToken) {
      var response = await orderService.GetForExcel(token);
      if (response.statusCode == 200) {
        var emp_data = response.data.map((item, i) => {
          item.status = functionService.OrderStatusFilter(item.status);
          item.createDate = functionService.Dateformat(item.createDate);
          item.orderItem = JSON.stringify([
            ...item.orderItem.map(
              (gg, i) =>
                `${i + 1}) ${gg.productName},${gg.productPrice}, x${
                  gg.amount
                } ${gg.sumAmountPrice}`
            ),
          ]);
          return item;
        });
        var wb = XLSX.utils.book_new();
        var ws = XLSX.utils.json_to_sheet(emp_data);
        XLSX.utils.book_append_sheet(wb, ws, "order_data");
        XLSX.writeFile(wb, "order_data.xlsx");
      }
    }
  };

  return {
    GetOrders,
    data,
    pagination,
    onChangePageSize,
    onChangeCurrentPage,
    handleExportExcel,
  };
};

export default UseMainOrder;
