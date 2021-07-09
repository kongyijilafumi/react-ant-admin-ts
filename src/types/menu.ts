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
  icon: string
  keepAlive: string
  key: string
  order: number
  parentKey: string
  path: string
  title: string
  type: MenuType
  children?: MenuList
}

type MenuType = string

type DealMenuType = string[]


export type MenuList = MenuItem[]

// 已处理的菜单列表信息
export type DealMenuItem = {
  type: DealMenuType
  parentPath: string
  children?: DealMenuItem[]
} & Omit<MenuItem, "type" | "children">
export type DealMenuList = DealMenuItem[]

export interface MenuResponse {
  data: DealMenuList
  mapKey: MapKey
  type: PowerList
}