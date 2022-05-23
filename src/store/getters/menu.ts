import { State } from "@/types"

export const getOpenedMenu = (state: State) => state.menu.openedMenu

export const getCurrentPath = (state: State) => state.menu.currentPath

export const getMenuList = (state: State) => state.menu.menuList

export const getOpenMenuKey = (state: State) => state.menu.openMenuKey

export const getSelectMenuKey = (state: State) => state.menu.selectMenuKey