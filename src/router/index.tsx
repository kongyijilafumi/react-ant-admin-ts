import { ReactElement, useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { CacheRoute, CacheSwitch } from "react-router-cache-route";
import { connect } from "react-redux";
import { setUserMenu } from "@/store/action";
import routerList, { RouterInfo } from "./list";
import Intercept from "./intercept";
import { getMenus } from "@/common";
import { reduceMenuList } from "@/utils";
import { MenuList, Dispatch } from "@/types"

function useRouter(setMenuList: (list: MenuList) => void) {
  const [localRouteList, setLocalRouteList] = useState<MenuList>([]);
  const [routerBody, setRoute] = useState<ReactElement[] | null>(null);
  const [mergeRouterList, setMergeList] = useState<RouterInfo[]>([]);
  useEffect(() => {
    if (setMenuList && typeof setMenuList === "function") {
      getMenus().then((res) => {
        const userMenus = res.data;
        let list = reduceMenuList(userMenus); // 把 children 数组 提出来 拉平
        let routers = routerList.map((router) => {
          let find = list.find(
            (i) => (i.parentPath || "") + i.path === router.path
          );
          if (find) {
            router = { ...find, ...router };
          } else {
            router.key = router.path;
          }
          return router;
        });
        if (list && list.length) {
          setMenuList(userMenus);
          setLocalRouteList(list);
          setMergeList(routers);
        }
      });
    }

  }, [setMenuList]);

  useEffect(() => {
    if (localRouteList.length && mergeRouterList.length) {
      const dom = mergeRouterList.map((item) => {
        let { key, path } = item;
        const RenderRoute = item.keepAlive === "true" ? CacheRoute : Route;
        return (
          <RenderRoute
            key={key}
            exact={true}
            path={path}
            render={(allProps) => (
              <Intercept
                {...allProps}
                {...item}
                menuList={localRouteList}
                pageKey={key}
              />
            )}
          />
        );
      });
      setRoute(dom);
    }
  }, [localRouteList, mergeRouterList]);

  return { routerBody };
}

const Router = ({ setMenuList }: { setMenuList: (list: MenuList) => void }) => {
  const { routerBody } = useRouter(setMenuList);
  return <CacheSwitch>{routerBody}</CacheSwitch>;
};
const mapDispatchToProps = (dispatch: Dispatch) => ({
  setMenuList: (list: MenuList) => dispatch(setUserMenu(list)),
});
export default connect(null, mapDispatchToProps)(Router);
