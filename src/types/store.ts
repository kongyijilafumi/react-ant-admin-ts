import { UserInfo } from "./user"
import { MenuState } from "./menu"
import { LayoutMode } from "./layout"
export default interface State {
  menu: MenuState
  user: UserInfo
  layout: LayoutMode
}