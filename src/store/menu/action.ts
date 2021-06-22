import * as ActionTypes from "./actionTypes";
import { OpenedMenu, MenuAction } from "@/types"
export const addOpenedMenu = (menuItem: OpenedMenu): Omit<MenuAction, "key" | "keys"> => ({
  type: ActionTypes.ADDOPENTMENU,
  menuItem,
});

export const setOpenKey = (keys: string[]): Omit<MenuAction, "key" | "menuItem"> => ({
  type: ActionTypes.SET_OPENKEY,
  keys,
});

export const setSelectKey = (keys: string[]): Omit<MenuAction, "key" | "menuItem"> => ({
  type: ActionTypes.SET_SELECTKEY,
  keys,
});

export const filterOpenKey = (key: string): Omit<MenuAction, "keys" | "menuItem"> => ({
  type: ActionTypes.FILTER_OPENKEY,
  key,
});


