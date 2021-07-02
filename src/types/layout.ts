
export type LayoutMode = "TWO_COLUMN" | "SINGLECOLUMN"

export interface LayoutAction {
  type: LayoutMode,
  mode: LayoutMode
}

export type LayoutModes = {
  img: string
  mode: LayoutMode
  alt: string
}[]