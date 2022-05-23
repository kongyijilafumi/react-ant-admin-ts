import auto from "./auto";
import loadable, { LoadableComponent } from "@loadable/component";
import { Redirect } from "react-router-dom";
import React from "react";
const Error = loadable(() => import("@pages/err"));

export interface RouterInfo {
  components: LoadableComponent<any> | React.ReactElement | React.ComponentClass<any>
  [MENU_PATH]: string
  [MENU_KEY]?: any
  [MENU_TITLE]?: string | any
  [MENU_KEEPALIVE]?: string | any
  [name: string]: any
}

const defaultArr: RouterInfo[] = [
  {
    [MENU_PATH]: "/",
    [MENU_KEY]: "index",
    to: "/details/person",
    components: Redirect,
  },
  {
    [MENU_PATH]: "/result/404",
    components: Error,
  },
  {
    [MENU_PATH]: "/result/403",
    status: "403",
    errTitle: "403",
    subTitle: "Sorry, you don't have access to this page.",
    components: Error,
  },
  {
    [MENU_PATH]: "/result/500",
    status: "500",
    errTitle: "500",
    subTitle: "Sorry, the server is reporting an error.",
    components: Error,
  },
  {
    [MENU_PATH]: "*",
    [MENU_TITLE]: "页面不存在",
    [MENU_KEY]: "404",
    [MENU_KEEPALIVE]: "true",
    components: Error,
  },
];

const list: RouterInfo[] = auto.map((c: any) => ({ ...c, components: loadable(c.components) }) as RouterInfo);

list.push(...defaultArr);

export default list;
