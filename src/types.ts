export type TileSet = 'animals' | 'vehicles'

export type TileIndex = number

export interface Tile {
  index: TileIndex
  image: string
  fileName: string
}
