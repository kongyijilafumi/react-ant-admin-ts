import ajax from "@/common/ajax";
import mock from "../mock/index";
import { MessageAPi, ResponseData, LoginApi, PowerApi, MenuInfoApi, UserListApi, ResponseUserInfo, VisitorApi, VisitorListApi, MenuResponse } from "@/types"

const request = process.env.REACT_APP_MOCK ? mock : ajax;

const getMenu = () => request.get("/getmenu") as Promise<MenuResponse>;
const getMenuList = () => request.get("/getmenulist") as Promise<MenuResponse>;
const login = (data: any) => request.post("/login", data) as Promise<LoginApi>;
const addMenu = (data: any) => request.post("/addmenu", data) as Promise<ResponseData>;
const addMsg = (data: any) => request.post("/addmessage", data) as Promise<ResponseData>;
const getMsg = (data: any) => request.post("/getmessage", data) as Promise<MessageAPi>;
const getPower = () => request.get("/getpower") as Promise<PowerApi>;
const delMenu = (data: any) => request.post("/delmenu", data) as Promise<ResponseData>;
const getMenuInfo = (data: any) => request.post("/getmenuinfo", data) as Promise<MenuInfoApi>;
const editMenu = (data: any) => request.post("/editmenuinfo", data) as Promise<ResponseData>;
const getVisitorList = (data: any) => request.post("/getiplist", data) as Promise<VisitorListApi>;
const getVisitorData = () => request.get("/getvisitordata") as Promise<VisitorApi>;
const getUserList = (data: any) => request.post("/getuserlist", data) as Promise<UserListApi>;
const addUser = (data: any) => request.post("/adduserinfo", data) as Promise<ResponseData>;
const getUser = (data: any) => request.post("/getuserinfo", data) as Promise<ResponseData & { data: ResponseUserInfo }>;
const editUser = (data: any) => request.post("/edituserinfo", data) as Promise<ResponseData>;
const editType = (data: any) => request.post("/edittype", data) as Promise<ResponseData>;
const addType = (data: any) => request.post("/addtype", data) as Promise<ResponseData>;
export {
  getMenu,
  login,
  addMenu,
  addMsg,
  getMsg,
  getPower,
  delMenu,
  getMenuInfo,
  editMenu,
  getVisitorList,
  getVisitorData,
  getUserList,
  addUser,
  getUser,
  editUser,
  editType,
  addType,
  getMenuList
};
