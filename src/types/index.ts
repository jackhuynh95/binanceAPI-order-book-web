export type CellInputType = 'tel' | 'password'

export interface Cell {
  key: number
  value: string
}

export interface CellsInputTypes {
  [cellIdx: number]: CellInputType
}
