
import * as ActionTypes from "./actionTypes";
import { UserInfo, UserAction } from "@/types/user"
export const setUserInfoAction = (info: UserInfo): UserAction => ({
  type: ActionTypes.SET_USERINFO,
  info,
});

export const clearUser = (): UserAction => ({
  type: ActionTypes.CLEAR_USERINFO,
});
