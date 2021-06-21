import { Layout, Menu, Dropdown } from "antd";
import logo from "@/assets/images/logo.svg";
import MyIcon from "@/components/icon/";
import { connect } from "react-redux";
import { clearUser } from "@/store/user/action";
import { clearSessionUser, setKey, saveToken } from "@/utils";
import { Dispatch } from "redux"
import State from "@/types/store"
const { Header } = Layout;

const mapStateToProps = (state: State) => ({
  userInfo: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  userOut: (info: State["user"]) => {
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
  userInfo: State["user"];
  userOut: (u: State["user"]) => void;
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
