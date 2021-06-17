import ajax from "@/common/ajax";
import mock from "../mock/index";
import { DealMenuList } from "@/common/index.d";
const request = process.env.REACT_APP_MOCK ? mock : ajax;

const getMenu = (): Promise<DealMenuList> => request.get("/getmenu");
const login = (data: any) => request.post("/login", data);
const addMenu = (data: any) => request.post("/addmenu", data);
const addMsg = (data: any) => request.post("/addmessage", data);
const getMsg = (data: any) => request.post("/getmessage", data);
const getPower = () => request.get("/getpower");
const delMenu = (data: any) => request.post("/delmenu", data);
const getMenuInfo = (data: any) => request.post("/getmenuinfo", data);
const editMenu = (data: any) => request.post("/editmenuinfo", data);
const getVisitorList = (data: any) => request.post("/getiplist", data);
const getVisitorData = () => request.get("/getvisitordata");
const getUserList = (data: any) => request.post("/getuserlist", data);
const addUser = (data: any) => request.post("/adduserinfo", data);
const getUser = (data: any) => request.post("/getuserinfo", data);
const editUser = (data: any) => request.post("/edituserinfo", data);
const editType = (data: any) => request.post("/edittype", data);
const addType = (data: any) => request.post("/addtype", data);
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
};
