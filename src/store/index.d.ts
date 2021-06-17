


export interface StateOpenedMenu {
  key: string
  path: string
  title: string
  parentPath?: string
  children?: StateOpenedMenu[]
}

export type UserInfo = {
  account: string
  type: string
  user_id: number
  username: string
  isLogin: boolean
} | null

export interface GlobalState {
  openedMenu: StateOpenedMenu[]
  openMenuKey: string[]
  selectMenuKey: string[]
  userInfo: UserInfo


}
export interface GlobalAction {
  openKey: OpenKey
  type: string
  info: UserInfo
}


export type OpenKey = StateOpenedMenu & string[]


export default interface State {
  global: GlobalState
}