import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { ScreenOrientation } from 'expo'
import { Text, Button } from 'react-native-elements'
import { shuffle } from 'lodash'
import Modal from 'react-native-modal'

import { MemoryGameTile } from './types'
import { GameTile } from './GameTile'

const { PORTRAIT, LANDSCAPE, UNKNOWN } = ScreenOrientation.Orientation

interface MemoryGameProps {
  tiles: MemoryGameTile[]
}

function tryToDetermineOrientation() {
  const screenWidth = Math.round(Dimensions.get('window').width)
  const screenHeight = Math.round(Dimensions.get('window').height)

  return screenHeight > screenWidth ? PORTRAIT : LANDSCAPE
}

const GAME_TILES_CONFIGURATION = {
  [PORTRAIT]: { x: 5, y: 8, xPadding: 1, yPadding: 0.8 },
  [LANDSCAPE]: { x: 8, y: 5, xPadding: 0.8, yPadding: 1 },
}

function useRefState(initialValue: any) {
  const [state, setState] = useState(initialValue)
  const stateRef = useRef(state)
  useEffect(() => {
    stateRef.current = state
  }, [state])
  return [state, stateRef, setState]
}

export function MemoryGame({ tiles }: MemoryGameProps) {
  const [orientation, setOrientation] = useState<ScreenOrientation.Orientation>(
    UNKNOWN
  )

  const [gameTiles, gameTilesRef, setGameTiles] = useRefState([])
  const [
    completedGameTiles,
    completedGameTilesRef,
    setCompletedGameTiles,
  ] = useRefState([])
  const [
    selectedGameTiles,
    selectedGameTilesRef,
    setSelectedGameTiles,
  ] = useRefState([])

  useEffect(() => {
    ScreenOrientation.getOrientationAsync().then(({ orientation }) => {
      setOrientation(orientation)
    })

    const sub = ScreenOrientation.addOrientationChangeListener(
      (event: ScreenOrientation.OrientationChangeEvent) => {
        setOrientation(event.orientationInfo.orientation)
      }
    )
    return sub.remove
  })

  useEffect(() => {
    initGame()
  }, tiles)

  const currentOrientation =
    GAME_TILES_CONFIGURATION[orientation] !== undefined
      ? orientation
      : tryToDetermineOrientation()

  const currentGameTilesConfig = GAME_TILES_CONFIGURATION[currentOrientation]

  const gameTileContainerStyle = useMemo(
    () => ({
      ...styles.gameTile,
      flexBasis: `${100 / currentGameTilesConfig.x -
        currentGameTilesConfig.xPadding}%`,
      height: `${100 / currentGameTilesConfig.y -
        currentGameTilesConfig.yPadding}%`,
    }),
    [currentGameTilesConfig]
  )

  const initGame = () => {
    setGameTiles(shuffle([...tiles, ...tiles]))
    setCompletedGameTiles([])
  }

  const checkPairs = (newSelectedGameTiles: number[]) => {
    const [selectedIndex1, selectedIndex2] = newSelectedGameTiles

    const gameTile1 = gameTilesRef.current[selectedIndex1]
    const gameTile2 = gameTilesRef.current[selectedIndex2]

    if (gameTile1 === gameTile2) {
      setCompletedGameTiles([
        ...completedGameTilesRef.current,
        selectedIndex1,
        selectedIndex2,
      ])
    }
  }

  const handleOnSelect = useCallback(
    (index: number) => {
      switch (selectedGameTilesRef.current.length) {
        case 0:
          setSelectedGameTiles([index])
          break

        case 1:
          const newSelectedGameTiles = [...selectedGameTilesRef.current, index]
          setSelectedGameTiles(newSelectedGameTiles)
          checkPairs(newSelectedGameTiles)
          setTimeout(() => setSelectedGameTiles([]), 2000)

          break
      }
    },
    [tiles]
  )

  const gameCompleted = completedGameTiles.length === gameTiles.length

  return (
    currentOrientation && (
      <View style={styles.container}>
        {gameTiles.map((gameTile: MemoryGameTile, i: number) => {
          const selected = selectedGameTiles.includes(i)
          const completed = completedGameTiles.includes(i)

          return (
            <GameTile
              key={i}
              gameTile={gameTile}
              index={i}
              visible={selected || completed}
              onSelect={handleOnSelect}
              containerStyle={gameTileContainerStyle}
              imageContainerStyle={styles.gameTileImage}
            />
          )
        })}

        {gameCompleted && (
          <View style={{ flex: 1 }}>
            <Modal isVisible backdropColor="white">
              <View style={styles.modalContainer}>
                <Text style={styles.modalHeader}>🏆</Text>
                <Button
                  title="Restart game"
                  raised
                  onPress={initGame}
                  buttonStyle={styles.modalButton}
                  titleStyle={styles.modalButtonTitle}
                />
              </View>
            </Modal>
          </View>
        )}
      </View>
    )
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gameTile: {
    marginVertical: 5,
    padding: 5,
  },
  gameTileImage: {
    width: '100%',
    height: '100%',
    maxHeight: 100,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeader: {
    marginVertical: 40,
    fontSize: 180,
  },
  modalButton: {
    backgroundColor: 'gold',
    padding: 20,
  },
  modalButtonTitle: {
    color: 'black',
    fontSize: 48,
  },
})
