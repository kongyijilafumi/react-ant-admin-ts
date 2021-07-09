import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Layout, Menu, Button, Affix, Col } from "antd";
import MyIcon from "@/components/icon";
import { getMenus } from "@/common";
import { setOpenKey } from "@/store/menu/action";
import { filterMenuList, stopPropagation } from "@/utils";
import { State, DealMenuList, Dispatch } from "@/types"
import * as layoutTypes from "@/store/layout/actionTypes";

interface SiderMenuProps {
  openKeys: State["menu"]["openMenuKey"]
  selectedKeys: State["menu"]["selectMenuKey"]
  setOpenKeys: (val: string[]) => void
  userInfo: State["user"]
  layout: State["layout"],
}



const { Sider } = Layout;
const { SubMenu } = Menu;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setOpenKeys: (val: string[]) => dispatch(setOpenKey(val)),
});

const mapStateToProps = (state: State) => ({
  openKeys: state.menu.openMenuKey,
  selectedKeys: state.menu.selectMenuKey,
  userInfo: state.user,
  layout: state.layout
});
const InitMenuList: DealMenuList = []

const FlexBox = ({ children }: { children: JSX.Element }) => {
  return <Col sm={6} md={10} lg={15} className="fl">
    {children}
  </Col>
}
const SliderContent = ({ children }: { children: JSX.Element }) => {
  const [collapsed, setCollapsed] = useState(false);
  // 折叠菜单
  const toggleCollapsed = (e: any) => {
    setCollapsed(!collapsed);
    stopPropagation(e);
  };
  return (
    <Affix>
      <Sider
        width={200}
        collapsed={collapsed}
        className="site-layout-background"
      >
        {children}
        <div className="fold-control fixed">
          <Button onClick={toggleCollapsed}>
            {collapsed ? "展开" : "收起"}
            <MyIcon type={collapsed ? "icon_next" : "icon_back"} />
          </Button>
        </div>
      </Sider>
    </Affix>
  );
};

const SiderMenu = ({ openKeys, selectedKeys, setOpenKeys, userInfo, layout }: SiderMenuProps) => {

  const [menuList, setMenu] = useState(InitMenuList);
  // 设置菜单
  useEffect(() => {
    getMenus().then((res) => {
      if (userInfo) {
        let list = filterMenuList(res.data, userInfo.type);
        setMenu(list);
      }
    });
    // eslint-disable-next-line
  }, []);

  // 菜单组折叠
  const onOpenChange = (keys: React.Key[]) => {
    setOpenKeys((keys as string[]));
  };

  // 菜单选项
  const menu = useMemo(() => {
    return menuList.map((item) => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key} icon={<MyIcon type={item.icon} />}>
            <Link to={item.path}>{item.title}</Link>
          </Menu.Item>
        );
      }
      return (
        <SubMenu
          key={item.key}
          title={item.title}
          icon={<MyIcon type={item.icon} />}
        >
          {item.children.map((child) => {
            return (
              <Menu.Item key={child.key} icon={<MyIcon type={child.icon} />}>
                <Link to={item.path + child.path}>
                  {child.title}
                </Link>
              </Menu.Item>
            );
          })}
        </SubMenu>
      );
    });
  }, [menuList]);
  // 菜单点击
  const MenuList = (
    <Menu
      mode={layout === layoutTypes.TWO_COLUMN ? "inline" : "horizontal"}
      triggerSubMenuAction="click"
      className={
        layout === layoutTypes.TWO_COLUMN
          ? "layout-silder-menu hide-scrollbar"
          : "layout-silder-menu toheader"
      }
      onOpenChange={onOpenChange}
      openKeys={openKeys}
      selectedKeys={selectedKeys}
    >
      {menu}
    </Menu>
  );


  const WrapContainer = layout === layoutTypes.TWO_COLUMN ? SliderContent : FlexBox
  return <WrapContainer>{MenuList}</WrapContainer>
};

export default connect(mapStateToProps, mapDispatchToProps)(SiderMenu);
