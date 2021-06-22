import { UserInfo } from "./user"
import { MenuState } from "./menu"

export default interface State {
  menu: MenuState
  user: UserInfo
}