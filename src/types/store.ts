import { UserInfo } from "./user"


export interface OpenedMenu {
  key: string
  path: string
  title: string
  parentPath?: string
  children?: OpenedMenu[]
}



export interface MenuState {
  openedMenu: OpenedMenu[]
  openMenuKey: string[]
  selectMenuKey: string[]
}

export interface GlobalAction {
  openKey: OpenKey
  type: string
}


export type OpenKey = OpenedMenu & string[]


export default interface State {
  menu: MenuState
  user: UserInfo
}