import React, {
  useState,
  useEffect,
  useMemo,
  useReducer,
  createRef,
} from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { ScreenOrientation } from 'expo'
import { Audio } from 'expo-av'
import { shuffle } from 'lodash'
import * as Animatable from 'react-native-animatable'

import { Tile } from '../types'
import { reducer, initialState } from '../reducer'
import { GameTile, AnimateFn } from './GameTile'
import { CompletedModal } from './CompletedModal'

const { PORTRAIT, LANDSCAPE, UNKNOWN } = ScreenOrientation.Orientation

interface MemoryGameProps {
  initialTiles: Tile[]
  onGameCompleted: () => void
}

function determineOrientation() {
  const screenWidth = Math.round(Dimensions.get('window').width)
  const screenHeight = Math.round(Dimensions.get('window').height)

  return screenHeight > screenWidth ? PORTRAIT : LANDSCAPE
}

const TILE_STYLE = {
  [PORTRAIT]: { x: 5, y: 8, xPadding: 1, yPadding: 0.8 },
  [LANDSCAPE]: { x: 8, y: 5, xPadding: 0.8, yPadding: 1 },
}

let clickSoundInstance: Audio.Sound = undefined

const imageRefs = {}

export function MemoryGame({ initialTiles, onGameCompleted }: MemoryGameProps) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const [orientation, setOrientation] = useState<ScreenOrientation.Orientation>(
    UNKNOWN
  )

  /*
   * Game initialization and logic
   */
  useEffect(() => {
    initGame()
    initSound()
  }, initialTiles)

  useEffect(() => {
    if (state.viewState === 'two_selected') {
      dispatch({ type: 'check_pair' })
      checkPairs()
      setTimeout(() => {
        dispatch({ type: 'reset_selected' })
      }, 1500)
    }
  }, [state.viewState])

  const initGame = () => {
    dispatch({
      type: 'start_game',
      payload: shuffle([...initialTiles, ...initialTiles]),
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
    sound && sound.playFromPositionAsync(0)
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
  })

  /*
   * Orientation specific styles
   */
  const currentOrientation =
    TILE_STYLE[orientation] !== undefined ? orientation : determineOrientation()

  const currentGameTilesConfig = TILE_STYLE[currentOrientation]

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

  /*
   * Event handlers
   */
  const handleOnSelect = (index: number, animate: AnimateFn) => {
    if (state.locked) {
      return
    }

    playSound(clickSoundInstance)
    animate('fadeIn')
    dispatch({ type: 'select_tile', payload: index })
  }

  const { viewState, tiles, selected, completed, startTime, stopTime } = state

  return (
    currentOrientation && (
      <View style={styles.container}>
        {tiles.map((gameTile: Tile, i: number) => {
          const imageRef = createRef<Animatable.Image>()
          imageRefs[i] = imageRef

          const visible = selected.includes(i) || completed.includes(i)

          return (
            <GameTile
              key={i}
              gameTile={gameTile}
              index={i}
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
            completionTime={stopTime.getTime() - startTime.getTime()}
            onDismiss={onGameCompleted}
          />
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
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})