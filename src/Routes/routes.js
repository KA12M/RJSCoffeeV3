import Login from "../views/LoginScreen";
import Register from "../views/RegisterScreen";

import LayoutPrivate from "../layouts/layout.private";
import HomePrivate from "../views/private/HomeScreen";
import MainAccountScreen from "../views/private/Accounts/MainAccountScreen";
import MainProductsScreen from "../views/private/Products/MainProductsScreen";
import FormProduct from "../views/private/Products/FormProductScreen";
import DetailProduct from "../views/private/Products/DetailProductScreen";
import CartItemScreen from "../views/private/ManageStock/CartItemScreen";
import MainManageStock from "../views/private/ManageStock/MainManageStock";
import DetailManageStock from "../views/private/ManageStock/DetailManageStock";
import DetailAccountScreen from "../views/private/Accounts/DetailAccountScreen";
import MainOrderScreen from "../views/private/Orders/MainOrderScreen";
import DetailOrderScreen from "../views/private/Orders/DetailOrderScreen";

import Page401 from "../views/401";

export const RouteList = [
  {
    NameTH: "ล็อกอิน",
    Path: "",
    Role: "0",
    Component: Login,
  },
  {
    NameTH: "สมัครสมาชิก",
    Path: "/register",
    Role: "0",
    Component: Register,
  },
  {
    NameTH: "No admin",
    Path: "",
    Role: "1",
    Component: Page401,
  },
  {
    NameTH: "LayoutPrivate",
    Path: "",
    Role: "2",
    Component: LayoutPrivate,
    Children: [
      {
        TitleTH: "หน้าหลัก",
        NameTH: "หน้าหลัก",
        Path: "",
        Component: HomePrivate,
      },
      {
        TitleTH: "ผู้ใช้งาน",
        NameTH: "ข้อมูลบัญชีผู้ใช้งาน",
        Path: "/mainaccounts",
        Component: MainAccountScreen,
      },
      {
        TitleTH: "สินค้า",
        NameTH: "ข้อมูลสินค้า",
        Path: "/mainproducts",
        Component: MainProductsScreen,
      },
      {
        TitleTH: "แบบบันทึกสินค้า",
        NameTH: "แบบบันทึกสินค้า",
        Path: "/formproduct",
        Component: FormProduct,
      },
      {
        TitleTH: "แบบบันทึกสินค้า",
        NameTH: "แบบบันทึกสินค้า",
        Path: "/formproduct/:id",
        Component: FormProduct,
      },
      {
        TitleTH: "สินค้า",
        NameTH: "รายละเอียดสินค้า",
        Path: "/detailproduct/:id",
        Component: DetailProduct,
      },
      {
        TitleTH: "ตะกร้า",
        NameTH: "หน้าตะกร้าสินค้า",
        Path: "/cartitem",
        Component: CartItemScreen,
      },
      {
        TitleTH: "จัดการคลังสินค้า",
        NameTH: "ข้อมูลจัดการคลังสินค้า",
        Path: "/mainmanagestock",
        Component: MainManageStock,
      },
      {
        TitleTH: "รายละเอียดคำสั่งซื้อ",
        NameTH: "ข้อมูลรายละเอียดคำสั่งซื้อ",
        Path: "/detailmanagestock/:id",
        Component: DetailManageStock,
      },
      {
        TitleTH: "รายละเอียดผู้ใช้งาน",
        NameTH: "ข้อมูลรายละเอียดผู้ใช้งาน",
        Path: "/detailaccount/:id",
        Component: DetailAccountScreen,
      },
      {
        TitleTH: "คำสั่งซื้อ",
        NameTH: "ข้อมูลคำสั่งซื้อของลูกค้า",
        Path: "/mainorders",
        Component: MainOrderScreen,
      },
      {
        TitleTH: "รายละเอียดคำสั่งซื้อ",
        NameTH: "ข้อมูลรายละเอียดคำสั่งซื้อ",
        Path: "/detailorder/:id",
        Component: DetailOrderScreen,
      },
    ],
  },
];
