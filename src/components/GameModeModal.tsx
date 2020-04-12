import React, { useState } from 'react'
import Modal from 'react-native-modal'
import { View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native'
import { Button, CheckBox } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

import { dp } from '../util'
import { TileSet } from '../types'
import {
  useResponsiveWidth,
  useResponsiveHeight,
  useResponsiveFontSize,
} from 'react-native-responsive-dimensions'

interface GameModeModalProps {
  isVisible: boolean
  defaultSelectedTileSet: TileSet
  onDismiss: (tileSet: TileSet) => void
}

export function GameModeModal({
  isVisible,
  defaultSelectedTileSet,
  onDismiss,
}: GameModeModalProps) {
  const [selectedTileSet, setSelectedTileSet] = useState(defaultSelectedTileSet)

  const checkBoxContainerStyle = {
    paddingVertical: useResponsiveHeight(1),
    paddingHorizontal: useResponsiveWidth(1),
    height: useResponsiveHeight(40),
    width: useResponsiveWidth(40),
  }

  const modalButtonStyle = {
    width: useResponsiveWidth(65),
    marginTop: useResponsiveHeight(2),
    paddingVertical: useResponsiveHeight(1),
    paddingHorizontal: useResponsiveWidth(1),
  }

  const modalButtonTitleStyle = {
    fontSize: useResponsiveFontSize(3),
    marginRight: useResponsiveWidth(2),
  }

  const modalButtonIconSize = useResponsiveFontSize(2)

  return (
    <Modal isVisible={isVisible} backdropColor="white">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={checkBoxContainerStyle}>
            <TouchableWithoutFeedback
              onPress={() => setSelectedTileSet('animals')}
            >
              <Image
                source={require('../../assets/checkbox-animals.png')}
                resizeMode="contain"
                style={styles.checkBoxImage}
              />
            </TouchableWithoutFeedback>
            <CheckBox
              center
              size={dp(16)}
              checkedColor="rgba(0, 0, 0, 1)"
              uncheckedColor="rgba(0, 0, 0, 0.3)"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={selectedTileSet === 'animals'}
              onPress={() => setSelectedTileSet('animals')}
            />
          </View>
          <View style={checkBoxContainerStyle}>
            <TouchableWithoutFeedback
              onPress={() => setSelectedTileSet('vehicles')}
            >
              <Image
                source={require('../../assets/checkbox-vehicles.png')}
                resizeMode="contain"
                style={styles.checkBoxImage}
              />
            </TouchableWithoutFeedback>
            <CheckBox
              center
              size={dp(16)}
              checkedColor="rgba(0, 0, 0, 1)"
              uncheckedColor="rgba(0, 0, 0, 0.3)"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={selectedTileSet === 'vehicles'}
              onPress={() => setSelectedTileSet('vehicles')}
            />
          </View>
        </View>
        <Button
          title="Start game"
          type="outline"
          icon={
            <Icon name="arrow-right" size={modalButtonIconSize} color="black" />
          }
          iconRight
          onPress={() => onDismiss(selectedTileSet)}
          buttonStyle={[styles.modalButton, modalButtonStyle]}
          titleStyle={[styles.modalButtonTitle, modalButtonTitleStyle]}
        />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    flexDirection: 'row',
  },
  checkBoxImage: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  modalButton: {
    backgroundColor: 'gold',
  },
  modalButtonTitle: {
    color: 'black',
  },
})
