import { ImageURISource } from 'react-native'

export type TileSet = 'animals' | 'vehicles'

export type TileIndex = number

export interface Tile {
  index: TileIndex
  image: ImageURISource
  fileName: string
}
