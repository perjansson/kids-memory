import React, { useEffect } from 'react'
import { Audio } from 'expo-av'
import Modal from 'react-native-modal'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'

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

  return (
    <Modal isVisible={isVisible} backdropColor="white">
      <View style={styles.modalContainer}>
        <Text style={styles.modalHeader}>🏆</Text>
        <Button
          title={buttonTitle}
          raised
          onPress={onDismiss}
          buttonStyle={styles.modalButton}
          titleStyle={styles.modalButtonTitle}
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
