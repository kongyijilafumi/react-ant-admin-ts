

interface MenuItem {
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


type DealMenuItem = {
  icon: string
  keepAlive: string
  key: string
  order: number
  parentKey: string
  path: string
  title: string
  type: DealMenuType
  children?: DealMenuList
}

export type DealMenuList = DealMenuItem[]

