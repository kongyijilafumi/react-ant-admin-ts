import { useEffect, useState } from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Spin } from "antd";
import Layout from "@/layout";
import Login from "@pages/login";
import { getLocalUser } from "@/utils";
import { useDispatchUser, useStateUserInfo } from "@/store/hooks";

const isHash = process.env.REACT_APP_ROUTER_ISHASH === "1"
const RouterBasename = process.env.REACT_APP_ROUTERBASE || "/"


export default function AppRouter() {
  const [loading, setLoad] = useState(true);
  const { stateSetUser } = useDispatchUser()
  const userInfo = useStateUserInfo()


  useEffect(() => {
    if (!userInfo) {
      let localInfo = getLocalUser();
      if (localInfo && localInfo.isLogin === true) {
        stateSetUser(localInfo);
      }
      return setLoad(false);
    }
    setLoad(false);
  }, [stateSetUser, userInfo]);

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