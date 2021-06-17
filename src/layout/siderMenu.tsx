import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Layout, Menu, Button, Affix } from "antd";
import MyIcon from "@/components/icon";
import { getMenus } from "@/common";
import { setOpenKey } from "@/store/action";
import { filterMenuList, stopPropagation } from "@/utils";
import { Dispatch } from "redux"
import state from "@/store"
import { DealMenuList } from "@/common/index.d"

interface MenuDomProps {
  openKeys: state["global"]["openMenuKey"]
  selectedKeys: state["global"]["selectMenuKey"]
  setOpenKeys: (val: string[]) => void
  userInfo: state["global"]["userInfo"]
}



const { Sider } = Layout;
const { SubMenu } = Menu;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setOpenKeys: (val: string[]) => dispatch(setOpenKey(val)),
});

const mapStateToProps = (state: state) => ({
  openKeys: state.global.openMenuKey,
  selectedKeys: state.global.selectMenuKey,
  userInfo: state.global.userInfo,
});
const InitMenuList: DealMenuList = []


const MenuDom = ({ openKeys, selectedKeys, setOpenKeys, userInfo }: MenuDomProps) => {

  const [collapsed, setCollapsed] = useState(false);
  const [menuList, setMenu] = useState(InitMenuList);
  // 设置菜单
  useEffect(() => {
    getMenus().then((res) => {
      if (userInfo) {
        let list = filterMenuList(res, userInfo.type);
        setMenu(list);
      }
    });
    // eslint-disable-next-line
  }, []);

  // 菜单组折叠
  const onOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };
  // 折叠菜单
  const toggleCollapsed = (e) => {
    setCollapsed(!collapsed);
    stopPropagation(e);
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

  return (
    <Affix>
      <Sider
        width={200}
        collapsed={collapsed}
        className="site-layout-background"
      >
        <Menu
          mode="inline"
          triggerSubMenuAction="click"
          className="layout-silder-menu hide-scrollbar"
          onOpenChange={onOpenChange}
          openKeys={openKeys}
          selectedKeys={selectedKeys}
        >
          {menu}
        </Menu>
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuDom);