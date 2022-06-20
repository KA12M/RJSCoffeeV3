import { useSelector, useDispatch } from "react-redux";

import * as orderActions from "../../../actions/order.action";
import * as accountActions from "../../../actions/account.action";

import * as orderService from "../../../services/order.service";
import { IsCheckToken } from "./../../../services/account.service";

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

  return { GetOrders, data, pagination, onChangePageSize,onChangeCurrentPage };
};

export default UseMainOrder;
