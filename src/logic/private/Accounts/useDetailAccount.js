import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import * as accountService from "../../../services/account.service";
import * as accountActions from "../../../actions/account.action";
import * as cartItemService from "../../../services/cartItem.service";

const UseDetailAccount = () => {
  const { id } = useParams();
  const navigation = useNavigate();

  const [accoutData, setAccoutData] = useState();
  const [address, setAddress] = useState();
  const [cartItemData, setCartItemData] = useState();

  const GetDataAccount = async () => {
    var token = localStorage.getItem("token");
    var isToken = await accountService.IsCheckToken(token);
    if (isToken) {
      await accountService.GetById({ id, token }).then((item) => {
        setAccoutData(item.data);
        if (item.data.address.length > 0) setAddress(item.data.address);
      });
      await cartItemService.GetByAccountId(id, token).then((item) => {
        if (item.data.length > 0) setCartItemData(item.data); 
      });
    } else {
      localStorage.removeItem("token");
      dispatch(accountActions.clear());
    }
  };

  return { id, navigation, accoutData, address, cartItemData, GetDataAccount };
};

export default UseDetailAccount;
