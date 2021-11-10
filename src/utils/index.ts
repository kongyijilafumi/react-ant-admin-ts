import { getMenus, } from "@/common";
import { MenuItem, MenuList, UserInfo, LayoutMode, MenuResponse, State } from "@/types"
export const USER_INFO = "USER_INFO";
export const TOKEN = "admin_token";
export const MENU = "MENU";
export const VISIBEL = "COMPONENTS_VISIBEL";
export const LAYOUT_MODE = "LAYOUT_MODE";

interface MenuOpenData {
  openKeys: string[]
  selectKey: string[]
  openedMenu: MenuItem[]
}
type Token = string | null | undefined

// 获取默认页面
async function getDefaultMenu(): Promise<MenuOpenData> {
  let openKeys: string[] = [],
    selectKey: string[] = [],
    openedMenu: MenuItem[] = [];
  const res = await getMenus();
  const menuList = res.data
  menuList.some((list) => {
    const child = list.children;
    if (child && child.length) {
      openKeys = [(list.key as string)];
      selectKey = [(child[0]["key"] as string)];
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

function getLocalUser() {
  return getKey(true, USER_INFO);
}


async function getMenuParentKey(key: string): Promise<string[]> {
  const keys = [];
  const res = await getMenus();
  const list = reduceMenuList(res.data);
  const info = list.find((item) => item.key === key);
  let parentKey = info?.parentKey;
  if (parentKey) {
    const data = await getMenuParentKey(parentKey)
    keys.push(...data);
    keys.push(parentKey);
  }
  return keys;
}


function reduceMenuList(list: MenuList, path: string = ''): MenuList {
  const data: MenuList = [];
  list.forEach((i) => {
    const { children, ...item } = i;
    item.parentPath = path;
    if (children) {
      const childList = reduceMenuList(children, path + i.path);
      data.push(...childList);
    }
    data.push(item);
  });
  return data;
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
  saveUser,
  sleep,
  getLocalUser,
  getMenuParentKey,
  reduceMenuList,
  getLocalMenu,
  saveLocalMenu,
  saveToken,
  getToken,
  getKey,
  setKey,
  rmKey,
  stopPropagation,
  getLayoutMode,
  setLayoutMode,
  clearLocalDatas,
  getCompVisibel,
  setCompVisibel,
};
