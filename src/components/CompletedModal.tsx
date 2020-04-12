import React, { useEffect } from 'react'
import { Audio } from 'expo-av'
import Modal from 'react-native-modal'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

import { dp } from '../util'
import { useDimensionStyle } from '../hooks/useDimensionStyle'
import {
  useResponsiveFontSize,
  useResponsiveHeight,
  useResponsiveWidth,
} from 'react-native-responsive-dimensions'

interface CompletedModalProps {
  completionTime?: number
  isVisible: boolean
  onDismiss: () => void
}

export function CompletedModal({
  completionTime,
  isVisible,
  onDismiss,
}: CompletedModalProps) {
  useEffect(() => {
    playSound()
  }, [])

  async function playSound() {
    const soundObject = new Audio.Sound()
    try {
      await soundObject.loadAsync(
        require('../../assets/cheer-sound-effect.mp3')
      )
      await soundObject.playAsync()
    } catch (error) {
      // Ignore
    }
  }

  const formattedTime =
    completionTime && new Date(completionTime).toISOString().substr(11, 8)
  const buttonTitle = formattedTime
    ? `You did it in ${formattedTime}! Restart game?`
    : 'You did it! Restart game?'

  const modalHeaderStyle = {
    fontSize: useResponsiveFontSize(18),
    marginVertical: useResponsiveHeight(2),
  }

  const modalButtonStyle = {
    width: useResponsiveWidth(80),
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
        <Text style={modalHeaderStyle}>🏆</Text>
        <Button
          title={buttonTitle}
          type="outline"
          icon={
            <Icon name="arrow-right" size={modalButtonIconSize} color="black" />
          }
          iconRight
          onPress={onDismiss}
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
  modalButton: {
    backgroundColor: 'gold',
  },
  modalButtonTitle: {
    color: 'black',
  },
})
