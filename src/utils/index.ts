import { getMenus, RouterBasename, } from "@/common";
import { DealMenuItem, DealMenuList, UserInfo, LayoutMode, MenuResponse, State } from "@/types"

export const USER_INFO = "USER_INFO";
export const TOKEN = "admin_token";
export const MENU = "MENU";
export const VISIBEL = "COMPONENTS_VISIBEL";
export const LAYOUT_MODE = "LAYOUT_MODE";

interface MenuOpenData {
  openKeys: string[]
  selectKey: string[]
  openedMenu: DealMenuItem[]
}
type Token = string | null | undefined

// 获取默认页面
async function getDefaultMenu(): Promise<MenuOpenData> {
  let openKeys: string[] = [],
    selectKey: string[] = [],
    openedMenu: DealMenuItem[] = [];
  const res = await getMenus();
  const menuList = res.data
  menuList.some((list) => {
    const child = list.children;
    if (child && child.length) {
      openKeys = [list.key];
      selectKey = [child[0]["key"]];
      openedMenu = [child[0]];
      return true;
    }
    return false;
  });

  return {
    openKeys,
    selectKey,
    openedMenu,
  };
}

function getSessionUser() {
  return getKey(false, USER_INFO);
}

function saveUser(info: UserInfo) {
  setKey(true, USER_INFO, info);
  setKey(false, USER_INFO, info);
}

function sleep(seconed: number) {
  return new Promise((res, rej) => {
    setTimeout(res, seconed);
  });
}

function clearSessionUser() {
  rmKey(false, USER_INFO);
}

function getLocalUser() {
  return getKey(true, USER_INFO);
}

// 获取当前url
function getCurrentUrl() {
  let path = window.location.pathname;
  if (RouterBasename === "/") {
    return path;
  }
  path = path.replace(RouterBasename, "");
  return path;
}

async function getMenuParentKey(key: string): Promise<string | undefined> {
  let parentKey;
  const res = await getMenus();
  const menuList = res.data
  menuList.some((menu) => {
    if (menu.key === key) {
      parentKey = key;
      return true;
    }
    if (Array.isArray(menu.children) && menu.children.length) {
      return menu.children.some((child) => {
        if (child.key === key) {
          parentKey = child.parentKey;
          return true;
        }
        return false;
      });
    }
    return false;
  });
  return parentKey;
}

function filterMenuList(list: DealMenuList, type: string): DealMenuList {
  return list.filter((item) => {
    if (item.children && Array.isArray(item.children) && item.children.length) {
      item.children = filterMenuList(item.children, type);
    }
    if (item.type.includes(type)) {
      return true;
    }
    return false;
  });
}

function reduceMenuList(list: DealMenuList): DealMenuList {
  return list.reduce((a, c) => {
    a.push(c);
    if (c.children) {
      a.push(...c.children);
    }
    return a;
  }, ([] as Array<DealMenuItem>));
}

function getLocalMenu(): MenuResponse {
  return getKey(false, MENU);
}

function saveLocalMenu(list: MenuResponse) {
  setKey(false, MENU, list);
}

function saveToken(token: Token) {
  setKey(true, TOKEN, token)
}

function getToken(): Token {
  return getKey(true, TOKEN)
}

function getKey(isLocal: boolean, key: string) {
  return JSON.parse(getStorage(isLocal).getItem(key) || "null");
}
function getStorage(isLocal: boolean) {
  return isLocal ? window.localStorage : window.sessionStorage;
}
function setKey(isLocal: boolean, key: string, data: any) {
  getStorage(isLocal).setItem(key, JSON.stringify(data || null));
}

function rmKey(isLocal: boolean, key: string) {
  getStorage(isLocal).removeItem(key);
}

function stopPropagation(e: MouseEvent) {
  e.stopPropagation();
}

function getLayoutMode(): LayoutMode | null {
  return getKey(true, LAYOUT_MODE);
}
function setLayoutMode(data: LayoutMode) {
  setKey(true, LAYOUT_MODE, data);
}
function clearLocalDatas(keys: string[]) {
  keys.forEach((key) => {
    rmKey(true, key);
    rmKey(false, key);
  });
}
function getCompVisibel(): State["componentsVisible"] | null {
  return getKey(true, VISIBEL);
}
function setCompVisibel(val: State["componentsVisible"]) {
  return setKey(true, VISIBEL, val);
}

export {
  getDefaultMenu,
  getSessionUser,
  clearSessionUser,
  saveUser,
  sleep,
  getLocalUser,
  getCurrentUrl,
  getMenuParentKey,
  filterMenuList,
  reduceMenuList,
  getLocalMenu,
  saveLocalMenu,
  saveToken,
  getToken,
  getKey,
  setKey,
  stopPropagation,
  getLayoutMode,
  setLayoutMode,
  clearLocalDatas,
  getCompVisibel,
  setCompVisibel
};
