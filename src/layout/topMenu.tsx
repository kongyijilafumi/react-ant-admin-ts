import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import MenuDnd from "@/components/menu-dnd";
import MyIcon from "@/components/icon";
import { withRouter } from "react-router-dom";
import { filterOpenKey } from "@/store/action";
import { getCurrentUrl, reduceMenuList } from "@/utils";
import { message, Breadcrumb } from "antd";
import { getMenus } from "@/common";
import { DealMenuItem, DealMenuList } from "@/common/index.d"
import state, { StateOpenedMenu } from "@/store/index.d"
import { Dispatch } from "redux"
import { History } from "history"

type Props = {
  openedMenu: StateOpenedMenu
  filterKey: (key: string) => void
  history: History
  childKey: string
  children: ReactNode
}

const mapStateToProps = (state: state) => ({
  openedMenu: state.global.openedMenu,
  childKey: state.global.selectMenuKey,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  filterKey: (key: string) => dispatch(filterOpenKey(key)),
});
function getParent(list: DealMenuList, parentKey: string): DealMenuItem | undefined {
  return list.find((i) => i.key === parentKey);
}
async function getBreadArray(ckey: string) {
  let list = await getMenus();
  list = reduceMenuList(list);
  let arr = [];
  let currentInfo = list.find((i) => i.key === ckey);
  if (!currentInfo) return [];
  arr.unshift(currentInfo);
  let parentKey = currentInfo.parentKey;
  let info;
  while (info = getParent(list, parentKey)) {
    arr.unshift(info);
    parentKey = info.parentKey;
  }
  return arr;
}

const InitData: DealMenuItem[] = []

function TopMenu({ openedMenu, filterKey, history, childKey }: Props) {
  const [breadArr, setBread] = useState(InitData);

  useEffect(() => {
    async function get() {
      let data = await getBreadArray(childKey[0]);
      setBread(data);
    }
    get();
  }, [childKey]);

  const closeTopMenu = useCallback(
    (path: string, nextItem: StateOpenedMenu, isCurrent: boolean) => {
      if (nextItem) {
        filterKey(path);
      } else {
        message.error("最后一个选项菜单不可关闭");
      }
      if (nextItem && isCurrent) {
        let parentPath = nextItem.parentPath || "";
        history.replace(parentPath + nextItem.path);
      }
    },
    [history, filterKey]
  );


  return (
    <div>
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
          currentKey={getCurrentUrl()}
          rangeVal={openedMenu}
          onClose={closeTopMenu}
        />
      </div>
    </div>
  );
}
const RouterTop = withRouter(TopMenu)
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RouterTop);
