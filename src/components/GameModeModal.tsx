import React, { useState } from 'react'
import Modal from 'react-native-modal'
import { View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native'
import { Button, CheckBox } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

import { dp } from '../util'
import { TileSet } from '../types'

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

  return (
    <Modal isVisible={isVisible} backdropColor="white">
      <View style={styles.modalContainer}>
        <View>
          <View style={styles.modalContent}>
            <View style={styles.checkBoxContainer}>
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
            <View style={styles.checkBoxContainer}>
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
            icon={<Icon name="arrow-right" size={20} color="black" />}
            iconRight
            onPress={() => onDismiss(selectedTileSet)}
            buttonStyle={styles.modalButton}
            titleStyle={styles.modalButtonTitle}
          />
        </View>
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
    justifyContent: 'space-around',
    fontSize: dp(28),
  },
  checkBoxContainer: {
    padding: dp(5),
    height: dp(120),
    width: dp(120),
  },
  checkBoxImage: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  modalButton: {
    backgroundColor: 'gold',
    padding: dp(4),
  },
  modalButtonTitle: {
    color: 'black',
    fontSize: dp(12),
    marginRight: 10,
  },
})
