import { ImageURISource } from 'react-native'

export type TileIndex = number

export interface Tile {
  index: TileIndex
  image: ImageURISource
  fileName: string
}
