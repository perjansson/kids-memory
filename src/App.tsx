import React from 'react'
import { ScreenBackground } from './ScreenBackground'

import { TileSet } from './types'
import assetsMap from '../assets/assetsMap.json'
import { MemoryGame } from './MemoryGame'
import { ImageURISource } from 'react-native'

interface TileSetMap {
  [key: string]: ImageURISource[]
}

const IMAGES: TileSetMap = {
  animals: [
    require('../assets/tiles/animals/0.png'),
    require('../assets/tiles/animals/1.png'),
    require('../assets/tiles/animals/2.png'),
    require('../assets/tiles/animals/3.png'),
    require('../assets/tiles/animals/4.png'),
    require('../assets/tiles/animals/5.png'),
    require('../assets/tiles/animals/6.png'),
    require('../assets/tiles/animals/7.png'),
    require('../assets/tiles/animals/8.png'),
    require('../assets/tiles/animals/9.png'),
    require('../assets/tiles/animals/10.png'),
    require('../assets/tiles/animals/11.png'),
    require('../assets/tiles/animals/12.png'),
    require('../assets/tiles/animals/13.png'),
    require('../assets/tiles/animals/14.png'),
    require('../assets/tiles/animals/15.png'),
    require('../assets/tiles/animals/16.png'),
    require('../assets/tiles/animals/17.png'),
    require('../assets/tiles/animals/18.png'),
    require('../assets/tiles/animals/19.png'),
  ],
  vehicles: [
    require('../assets/tiles/vehicles/0.png'),
    require('../assets/tiles/vehicles/1.png'),
    require('../assets/tiles/vehicles/2.png'),
    require('../assets/tiles/vehicles/3.png'),
    require('../assets/tiles/vehicles/4.png'),
    require('../assets/tiles/vehicles/5.png'),
    require('../assets/tiles/vehicles/6.png'),
    require('../assets/tiles/vehicles/7.png'),
    require('../assets/tiles/vehicles/8.png'),
    require('../assets/tiles/vehicles/9.png'),
    require('../assets/tiles/vehicles/10.png'),
    require('../assets/tiles/vehicles/11.png'),
    require('../assets/tiles/vehicles/12.png'),
    require('../assets/tiles/vehicles/13.png'),
    require('../assets/tiles/vehicles/14.png'),
    require('../assets/tiles/vehicles/15.png'),
    require('../assets/tiles/vehicles/16.png'),
    require('../assets/tiles/vehicles/17.png'),
    require('../assets/tiles/vehicles/18.png'),
    require('../assets/tiles/vehicles/19.png'),
  ],
}

export default function App() {
  function createTiles(tileSet: TileSet) {
    return IMAGES[tileSet].map((image, index) => ({
      index,
      image,
      fileName: assetsMap[index],
    }))
  }

  const tileSet: TileSet = 'vehicles'

  return (
    <ScreenBackground>
      <MemoryGame initialTiles={createTiles(tileSet)} />
    </ScreenBackground>
  )
}
