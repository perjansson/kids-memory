import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Asset } from 'expo-asset'
import { AppLoading } from 'expo'

import { TileSet, Tile } from './types'
import assetsMap from '../assets/assetsMap.json'
import { MemoryGame, TileSets } from './components/MemoryGame'
import { ScreenBackground } from './components/ScreenBackground'

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

const tilesCache = {}

export default function App() {
  const [isReady, setIsReady] = useState<boolean>(false)

  function createTiles(tileSet: TileSet): Tile[] {
    let tiles = tilesCache[tileSet]

    if (!tiles) {
      tiles = IMAGES[tileSet].map((image, index) => ({
        index,
        image,
        fileName: assetsMap[index],
      }))

      tilesCache[tileSet] = tiles
    }

    return tiles
  }

  if (!isReady) {
    return (
      <AppLoading
        startAsync={cacheResourcesAsync as any}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    )
  }

  const availableTileSets = Object.keys(IMAGES).reduce(
    (memo, tileSet: TileSet) => ({
      ...memo,
      [tileSet]: createTiles(tileSet),
    }),
    {}
  ) as TileSets

  return (
    <View style={styles.container}>
      <ScreenBackground>
        <MemoryGame availableTileSets={availableTileSets} />
      </ScreenBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
})
