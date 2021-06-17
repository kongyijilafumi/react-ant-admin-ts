import { Layout, Menu, Dropdown } from "antd";
import logo from "@/assets/images/logo.svg";
import MyIcon from "@/components/icon/";
import { connect } from "react-redux";
import { clearUser } from "@/store/action";
import { clearSessionUser, setKey, saveToken } from "@/utils";
import { Dispatch } from "redux"
import state from "@/store/index.d"
const { Header } = Layout;

const mapStateToProps = (state: state) => ({
  userInfo: state.global.userInfo,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  userOut: (info: state["global"]["userInfo"]) => {
    clearSessionUser();
    if (info) {
      info.isLogin = false;
    }
    saveToken(null);
    setKey(true, "userInfo", info);
    dispatch(clearUser());
  },
});

const RightMenu = ({ logout }: {
  logout: () => void;
}) => (
  <Menu className="right-down">
    <Menu.Item
      key="logout"
      onClick={logout}
      icon={<MyIcon type="icon_disconnectdevice" />}
    >
      退出登录
    </Menu.Item>
  </Menu>
);

const getPopupContainer = (HTMLElement: HTMLElement) => HTMLElement;

const HeaderDom = ({ userInfo, userOut }: {
  userInfo: state["global"]["userInfo"];
  userOut: (u: state["global"]["userInfo"]) => void;
}) => {
  return (
    <Header className="header">
      <div className="logo">
        <img src={logo} alt="logo"></img>
        <span>react-ant-admin</span>
      </div>
      <div className="right">
        <Dropdown
          placement="bottomCenter"
          getPopupContainer={getPopupContainer}
          overlay={<RightMenu logout={() => userOut(userInfo)} />}
        >
          <div>管理员：{userInfo && userInfo.username}</div>
        </Dropdown>
      </div>
    </Header>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(HeaderDom);
