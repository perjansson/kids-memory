import React, { useCallback, memo } from 'react'
import { Tile } from 'react-native-elements'
import { MemoryGameTile } from './types'

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
  ({ gameTile, index, visible, onSelect, ...rest }: GameTileProps) => {
    const { image } = gameTile
    const handleOnPress = useCallback(() => onSelect(index), [index])

    return (
      <Tile
        imageSrc={visible ? image : questionMark}
        imageProps={{
          resizeMode: 'contain',
        }}
        onPress={handleOnPress}
        featured
        activeOpacity={0}
        {...rest}
      />
    )
  }
)
