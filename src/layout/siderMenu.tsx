import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Layout, Menu, Button, Affix, Col } from "antd";
import MyIcon from "@/components/icon";
import { setOpenKey } from "@/store/action";
import { getLayoutMode, stopPropagation } from "@/utils";
import { MenuItem } from "@/types"
import * as layoutTypes from "@/store/layout/actionTypes";
import { getOpenMenuKey, getSelectMenuKey, getMenuList } from "@/store/getters";



const { Sider } = Layout;
const { SubMenu } = Menu;


const renderMenu = (item: MenuItem, path: string) => {
  if (item[MENU_SHOW] === false) {
    return null;
  }
  if (!item.children) {
    return <Menu.Item key={item[MENU_KEY]} icon={<MyIcon type={item[MENU_ICON]} />}>
      <Link to={path + item[MENU_PATH]}>{item[MENU_TITLE]}</Link>
    </Menu.Item>
  }
  return (
    <SubMenu
      key={item[MENU_KEY]}
      title={item[MENU_TITLE]}
      icon={<MyIcon type={item[MENU_ICON]} />}
    >
      {item.children.map(i => renderMenu(i, path + item[MENU_PATH]))}
    </SubMenu>
  );
};

const FlexBox = ({ children }: { children: JSX.Element }) => {
  return (
    <Col sm={6} md={10} lg={15} className="fl">
      {children}
    </Col>
  );
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
      <Sider width={200} collapsed={collapsed} >
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
export default function SiderMenu() {
  const openMenuKey = useSelector(getOpenMenuKey)
  const menuList = useSelector(getMenuList)
  const layout = useSelector(getLayoutMode)
  const selectMenuKey = useSelector(getSelectMenuKey)
  const menuComponent = useMemo(() => menuList && menuList.map((i) => renderMenu(i, "")), [menuList]);
  const dispatch = useDispatch()

  // 菜单组折叠
  const onOpenChange = useCallback((keys) => dispatch(setOpenKey(keys)), [dispatch]);
  // 菜单选项
  const WrapContainer =
    layout === layoutTypes.SINGLE_COLUMN ? FlexBox : SliderContent;
  // classname
  const clsName = useMemo(() => {
    if (layout !== layoutTypes.SINGLE_COLUMN) {
      return "layout-silder-menu hide-scrollbar"
    }
    return "layout-silder-menu col"
  }, [layout])

  const mode = useMemo(() => {
    if (layout === layoutTypes.SINGLE_COLUMN) {
      return "horizontal"
    }
    return "inline"
  }, [layout])

  return <WrapContainer>
    <Menu
      mode={mode}
      triggerSubMenuAction="click"
      className={clsName}
      onOpenChange={onOpenChange}
      openKeys={openMenuKey}
      selectedKeys={selectMenuKey}
      children={menuComponent}
    />
  </WrapContainer>;
};
