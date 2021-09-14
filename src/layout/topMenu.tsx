import { ReactNode, useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import MenuDnd from "@/components/menu-dnd";
import MyIcon from "@/components/icon";
import { withRouter } from "react-router-dom";
import { filterOpenKey } from "@/store/menu/action";
import { reduceMenuList } from "@/utils";
import { message, Breadcrumb } from "antd";
import { getMenus } from "@/common";
import { State, OpenedMenu, Dispatch, MenuItem, MenuList, History } from "@/types"
type Props = {
  openedMenu: OpenedMenu
  filterKey: (key: string) => void
  history: History
  childKey: string
  children: ReactNode
  location: Location
}

const mapStateToProps = (state: State) => ({
  openedMenu: state.menu.openedMenu,
  childKey: state.menu.selectMenuKey,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  filterKey: (key: string) => dispatch(filterOpenKey(key)),
});
function getParent(list: MenuList, parentKey: string): MenuItem | undefined {
  return list.find((i) => i.key === parentKey);
}
async function getBreadArray(ckey: string) {
  let res = await getMenus();
  let list = reduceMenuList(res.data);
  let arr = [];
  let currentInfo = list.find((i) => i.key === ckey);
  if (!currentInfo) return [];
  arr.unshift(currentInfo);
  let parentKey = currentInfo.parentKey;
  let info;
  while (!!(info = getParent(list, parentKey))) {
    arr.unshift(info);
    parentKey = info.parentKey;
  }
  return arr;
}

const InitData: MenuItem[] = []

function TopMenu({ openedMenu, filterKey, history, childKey, location }: Props | any) {
  const [breadArr, setBread] = useState(InitData);

  useEffect(() => {
    async function get() {
      let data = await getBreadArray(childKey[0]);
      setBread(data);
    }
    get();
  }, [childKey]);

  const closeTopMenu = useCallback(
    (path: string, nextItem: OpenedMenu, isCurrent: boolean) => {
      if (nextItem) {
        filterKey(path);
      } else {
        message.error("最后一个选项菜单不可关闭");
      }
      if (nextItem && isCurrent) {
        history.replace(nextItem.path);
      }
    },
    [history, filterKey]
  );


  return (
    <div className="top-menu-wrapper">
      {breadArr.length > 0 && (
        <Breadcrumb className="top-breadcrumb">
          {breadArr.map((i) => (
            <Breadcrumb.Item key={i.key}>
              <MyIcon type={i.icon} />
              <span className="title">{i.title}</span>
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      )}

      <div className="top-menu">
        <MenuDnd
          currentKey={location.pathname + (location.hash || location.search)}
          rangeVal={openedMenu}
          onClose={closeTopMenu}
        />
      </div>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TopMenu));
