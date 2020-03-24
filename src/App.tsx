import React from 'react'
import { ScreenBackground } from './ScreenBackground'

import assetsMap from '../assets/assetsMap.json'
import { MemoryGame } from './MemoryGame'

const IMAGES = [
  require('../assets/tiles/0.png'),
  require('../assets/tiles/1.png'),
  require('../assets/tiles/2.png'),
  require('../assets/tiles/3.png'),
  require('../assets/tiles/4.png'),
  require('../assets/tiles/5.png'),
  require('../assets/tiles/6.png'),
  require('../assets/tiles/7.png'),
  require('../assets/tiles/8.png'),
  require('../assets/tiles/9.png'),
  require('../assets/tiles/10.png'),
  require('../assets/tiles/11.png'),
  require('../assets/tiles/12.png'),
  require('../assets/tiles/13.png'),
  require('../assets/tiles/14.png'),
  require('../assets/tiles/15.png'),
  require('../assets/tiles/16.png'),
  require('../assets/tiles/17.png'),
  require('../assets/tiles/18.png'),
  require('../assets/tiles/19.png'),
]

export default function App() {
  function createTiles() {
    return IMAGES.map((image, index) => ({
      index,
      image,
      fileName: assetsMap[index],
    }))
  }

  return (
    <ScreenBackground>
      <MemoryGame initialTiles={createTiles()} />
    </ScreenBackground>
  )
}
