import ajax from "@/common/ajax";
import mock from "../mock/index";
import { DealMenuList } from "@/types/menu"
import { MessageAPi, ResponseData, LoginApi, PowerApi, MenuInfoApi, UserListApi, ResponseUserInfo, VisitorApi, VisitorListApi } from "@/types/api"

const request = process.env.REACT_APP_MOCK ? mock : ajax;

const getMenu = (): Promise<DealMenuList> => request.get("/getmenu");
const login = (data: any): Promise<LoginApi> => request.post("/login", data);
const addMenu = (data: any): Promise<ResponseData> => request.post("/addmenu", data);
const addMsg = (data: any): Promise<ResponseData> => request.post("/addmessage", data);
const getMsg = (data: any): Promise<MessageAPi> => request.post("/getmessage", data);
const getPower = (): Promise<PowerApi> => request.get("/getpower");
const delMenu = (data: any): Promise<ResponseData> => request.post("/delmenu", data);
const getMenuInfo = (data: any): Promise<MenuInfoApi> => request.post("/getmenuinfo", data);
const editMenu = (data: any): Promise<ResponseData> => request.post("/editmenuinfo", data);
const getVisitorList = (data: any): Promise<VisitorListApi> => request.post("/getiplist", data);
const getVisitorData = (): Promise<VisitorApi> => request.get("/getvisitordata");
const getUserList = (data: any): Promise<UserListApi> => request.post("/getuserlist", data);
const addUser = (data: any): Promise<ResponseData> => request.post("/adduserinfo", data);
const getUser = (data: any): Promise<ResponseData & { data: ResponseUserInfo }> => request.post("/getuserinfo", data);
const editUser = (data: any): Promise<ResponseData> => request.post("/edituserinfo", data);
const editType = (data: any): Promise<ResponseData> => request.post("/edittype", data);
const addType = (data: any): Promise<ResponseData> => request.post("/addtype", data);
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
