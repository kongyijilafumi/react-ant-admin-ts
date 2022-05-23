import { useCallback, useEffect, useState } from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Spin } from "antd";
import Layout from "@/layout";
import Login from "@pages/login";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfoAction } from "@/store/user/action";
import { getLocalUser } from "@/utils";
import { getStateUser } from "@/store/getters";

const isHash = process.env.REACT_APP_ROUTER_ISHASH === "1"
const RouterBasename = process.env.REACT_APP_ROUTERBASE || "/"


export default function AppRouter() {
  const [loading, setLoad] = useState(true);
  const userInfo = useSelector(getStateUser)

  const dispatch = useDispatch()
  const setUser = useCallback((info) => dispatch(setUserInfoAction(info)), [dispatch])

  useEffect(() => {
    if (!userInfo) {
      let localInfo = getLocalUser();
      if (localInfo && localInfo.isLogin === true) {
        setUser(localInfo);
      }
      return setLoad(false);
    }
    setLoad(false);
    // eslint-disable-next-line
  }, []);
  
  if (loading)
    return (
      <Spin size="large" wrapperClassName="loading-page" tip="Loading...">
        <div className="loading-page"></div>
      </Spin>
    );
  if (!userInfo) return <Login />;
  if (isHash) {
    return <HashRouter basename={RouterBasename}>
      <Layout />
    </HashRouter>
  }
  return (
    <BrowserRouter basename={RouterBasename}>
      <Layout />
    </BrowserRouter>
  );
}