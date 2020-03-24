import React, { useCallback, memo } from 'react'
import { MemoryGameTile } from './types'
import { Image, TouchableWithoutFeedback, View } from 'react-native'

const questionMark = require('../assets/questionMark.png')

interface GameTileProps {
  gameTile: MemoryGameTile
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
    const handleOnPress = useCallback(() => onSelect(index), [index])

    return (
      <View style={containerStyle}>
        <TouchableWithoutFeedback onPress={handleOnPress}>
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
