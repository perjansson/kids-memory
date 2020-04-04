import React, { memo, useRef } from 'react'
import { Tile } from '../types'
import { TouchableWithoutFeedback, View } from 'react-native'
import * as Animatable from 'react-native-animatable'

const questionMark = require('../../assets/question-mark.png')

export type AnimateFn = (animationFnName?: string) => void

interface GameTileProps {
  gameTile?: Tile
  index: number
  visible: boolean
  onSelect: (index: number, animateFn: AnimateFn) => void
  containerStyle: object
  imageContainerStyle: object
  imageRef?: React.MutableRefObject<Animatable.Image>
}

export const GameTile = memo(
  ({
    gameTile,
    index,
    visible,
    onSelect,
    containerStyle,
    imageContainerStyle,
    imageRef,
  }: GameTileProps) => {
    const image = gameTile?.image

    function handleOnPress() {
      onSelect(index, animate)
    }

    function animate(animationFnName?: string) {
      if (animationFnName !== undefined) {
        imageRef.current[animationFnName]()
      }
    }

    return (
      <View style={containerStyle}>
        <TouchableWithoutFeedback onPressIn={handleOnPress}>
          <Animatable.Image
            ref={imageRef as any}
            source={visible ? image : questionMark}
            resizeMode="contain"
            style={imageContainerStyle}
          />
        </TouchableWithoutFeedback>
      </View>
    )
  }
)
