import { MapKey, PowerList } from "./api"
// 关于菜单State的action
export type MenuAction = {
  type: string
  key: string
  keys: string[]
  menuItem: OpenedMenu
}

// 
export interface OpenedMenu {
  key: string
  path: string
  title: string
}

export interface MenuState {
  openedMenu: OpenedMenu[]
  openMenuKey: string[]
  selectMenuKey: string[]
}

// 未处理的菜单列表信息
export interface MenuItem {
  menu_id: number
  icon: string
  keepAlive: string
  key: string | number
  order: number
  parentKey: string
  path: string
  title: string
  children?: MenuList
  parentPath?: string
}



export type MenuList = MenuItem[]


export interface MenuResponse {
  data: MenuList
  mapKey: MapKey
}