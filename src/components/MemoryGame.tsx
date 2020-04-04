import React, { useState, useEffect, useReducer, createRef, memo } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { ScreenOrientation } from 'expo'
import { Audio } from 'expo-av'
import { shuffle, fill } from 'lodash'
import * as Animatable from 'react-native-animatable'

import { Tile, TileSet } from '../types'
import { reducer, initialState } from '../reducer'
import { GameTile, AnimateFn } from './GameTile'
import { CompletedModal } from './CompletedModal'
import { GameModeModal } from './GameModeModal'

const { PORTRAIT, LANDSCAPE, UNKNOWN } = ScreenOrientation.Orientation

export interface TileSets {
  [key: string]: Tile[]
}

interface MemoryGameProps {
  availableTileSets: TileSets
}

function determineOrientation() {
  const screenWidth = Math.round(Dimensions.get('window').width)
  const screenHeight = Math.round(Dimensions.get('window').height)

  return screenHeight > screenWidth ? PORTRAIT : LANDSCAPE
}

function generateDefaultTilesOfSize(size: number) {
  return fill(Array(size), undefined)
}

const TILE_STYLE = {
  [PORTRAIT]: { x: 5, y: 8 },
  [LANDSCAPE]: { x: 8, y: 5 },
}

let clickSoundInstance: Audio.Sound = undefined

const imageRefs = {}

export const MemoryGame = memo(({ availableTileSets }: MemoryGameProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const [orientation, setOrientation] = useState<ScreenOrientation.Orientation>(
    UNKNOWN
  )
  useEffect(() => {
    initSound()
  }, [])

  useEffect(() => {
    if (state.viewState === 'two_selected') {
      dispatch({ type: 'check_pair' })
      checkPairs()
      setTimeout(() => {
        dispatch({ type: 'clear_selected_tiles' })
      }, 1500)
    }
  }, [state.viewState])

  const initGame = (selectedTileSet: TileSet) => {
    const tiles = availableTileSets[selectedTileSet]
    dispatch({
      type: 'start_game',
      payload: {
        tileSet: selectedTileSet,
        tiles: shuffle([...tiles, ...tiles]),
      },
    })
  }

  const initSound = async () => {
    const { sound: clickSound } = await Audio.Sound.createAsync(
      require('../../assets/click-sound-effect.mp3')
    )
    clickSoundInstance = clickSound
  }

  const checkPairs = () => {
    const [index1, index2] = state.selected

    const gameTile1 = state.tiles[index1]
    const gameTile2 = state.tiles[index2]

    if (gameTile1 === gameTile2) {
      imageRefs[index1].current.flash()
      imageRefs[index2].current.flash()

      dispatch({ type: 'got_pair', payload: [index1, index2] })
    }
  }

  const playSound = (sound: Audio.Sound) => {
    try {
      sound && sound.playFromPositionAsync(0)
    } catch (error) {
      // Ignore
    }
  }

  /*
   * Device orientation
   */
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
  }, [])

  /*
   * Orientation specific styles
   */
  const currentOrientation =
    TILE_STYLE[orientation] !== undefined ? orientation : determineOrientation()

  const gameTileContainerStyle = {
    ...styles.gameTile,
    flexBasis: `${100 / TILE_STYLE[currentOrientation].x}%`,
    height: `${100 / TILE_STYLE[currentOrientation].y}%`,
    maxHeight: `${100 / TILE_STYLE[currentOrientation].y}%`,
  }

  /*
   * Event handlers
   */
  const handleOnSelect = (index: number, animate: AnimateFn) => {
    const shouldNotSelect =
      state.locked ||
      state.selected[0] === index ||
      state.completed.includes(index)

    if (shouldNotSelect) {
      return
    }

    playSound(clickSoundInstance)
    animate('fadeIn')
    dispatch({ type: 'select_tile', payload: index })
  }

  const onGameRestarted = () => {
    dispatch({ type: 'restart_game' })
  }

  const {
    viewState,
    tilesSet,
    tiles = generateDefaultTilesOfSize(40),
    selected,
    completed,
    startTime,
    stopTime,
  } = state

  const completionTime =
    startTime && stopTime && stopTime.getTime() - startTime.getTime()

  return (
    currentOrientation && (
      <View style={styles.wrapper}>
        <View style={styles.container}>
          {tiles.map((gameTile: Tile, index: number) => {
            const imageRef = createRef<Animatable.Image>()
            imageRefs[index] = imageRef

            const visible =
              selected.includes(index) || completed.includes(index)

            return (
              <GameTile
                key={index}
                gameTile={gameTile}
                index={index}
                visible={visible}
                onSelect={handleOnSelect}
                containerStyle={gameTileContainerStyle}
                imageContainerStyle={styles.gameTileImage}
                imageRef={imageRef}
              />
            )
          })}
          {viewState === 'completed' && (
            <CompletedModal
              isVisible
              completionTime={completionTime}
              onDismiss={onGameRestarted}
            />
          )}
          {viewState === 'not_started' && (
            <GameModeModal
              isVisible
              defaultSelectedTileSet={
                tilesSet === 'animals' ? 'vehicles' : 'animals'
              }
              onDismiss={selectedTileSet => initGame(selectedTileSet)}
            />
          )}
        </View>
      </View>
    )
  )
})

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gameTile: {
    padding: '0.5%',
  },
  gameTileImage: {
    width: '98%',
    height: '98%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
