import { getLocalMenu, saveLocalMenu } from "../utils";
import { getMenu } from "@/api";
import { MenuResponse, DealMenuList } from "@/types"

const RouterBasename: string = "/react-ant-admin";
function getMenus(): Promise<MenuResponse> {
  return new Promise((res, rej) => {
    let localMenu = getLocalMenu();
    if (localMenu) {
      return res(localMenu);
    }
    getMenu()
      .then((result) => {
        saveLocalMenu(result);
        res(result);
      })
      .catch((err) => {
        res({ data: <DealMenuList>[], mapKey: [], type: [] });
      });
  });
}

export { getMenus, RouterBasename, };
