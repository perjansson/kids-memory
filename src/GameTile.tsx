import React, { memo } from 'react'
import { Tile } from './types'
import { Image, TouchableWithoutFeedback, View } from 'react-native'

const questionMark = require('../assets/question-mark.png')

interface GameTileProps {
  gameTile: Tile
  index: number
  visible: boolean
  onSelect: (index?: number) => void
  containerStyle: object
  imageContainerStyle: object
}

export const GameTile = memo(
  ({
    gameTile,
    index,
    visible,
    onSelect,
    containerStyle,
    imageContainerStyle,
  }: GameTileProps) => {
    const { image } = gameTile
    const handleOnPress = () => onSelect(index)

    return (
      <View style={containerStyle}>
        <TouchableWithoutFeedback onPressIn={handleOnPress}>
          <Image
            source={visible ? image : questionMark}
            resizeMode="contain"
            style={imageContainerStyle}
          />
        </TouchableWithoutFeedback>
      </View>
    )
  }
)
