import React, { useState, useEffect } from 'react'
import { Asset } from 'expo-asset'
import { AppLoading } from 'expo'

import { TileSet } from './types'
import * as storage from './storage'
import assetsMap from '../assets/assetsMap.json'
import { MemoryGame } from './components/MemoryGame'
import { ScreenBackground } from './components/ScreenBackground'

const LAST_TILE_SET_STORAGE_KEY = '@KidsMemory:lastTileSetStorageKey'

interface TileSetMap {
  [key: string]: string[]
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

interface CacheTileSetMap {
  [key: string]: Promise<void>[]
}
async function cacheResourcesAsync() {
  const allImageRefs = Object.entries(IMAGES).reduce(
    (memo, [_tileSetKey, tileSet]) => ({
      ...memo,
      ...tileSet.map(image => {
        return Asset.fromModule(image).downloadAsync()
      }),
    }),
    []
  )
  return Promise.all(allImageRefs)
}

export default function App() {
  const [isReady, setIsReady] = useState<boolean>(false)
  const [tileSet, setTileSet] = useState<TileSet>(undefined)

  function createTiles(tileSet: TileSet) {
    return IMAGES[tileSet].map((image, index) => ({
      index,
      image,
      fileName: assetsMap[index],
    }))
  }

  async function setNextTileSet() {
    const lastTileSet = (await storage.get(LAST_TILE_SET_STORAGE_KEY)) as
      | TileSet
      | undefined
    const nextTileSet = lastTileSet !== 'animals' ? 'animals' : 'vehicles'
    setTileSet(nextTileSet)
    storage.set(LAST_TILE_SET_STORAGE_KEY, nextTileSet)
  }

  useEffect(() => {
    setNextTileSet()
  }, [])

  console.log('>>> isReady', isReady)

  if (!isReady) {
    return (
      <AppLoading
        startAsync={cacheResourcesAsync as any}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    )
  }

  return (
    <ScreenBackground>
      {tileSet && (
        <MemoryGame
          initialTiles={createTiles(tileSet)}
          onGameCompleted={setNextTileSet}
        />
      )}
    </ScreenBackground>
  )
}
