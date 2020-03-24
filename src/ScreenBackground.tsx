import React from 'react'
import { View, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

interface ScreenBackgroundProps {
  children: React.ReactNode
  style?: object
}

export function ScreenBackground({
  children,
  style = {},
}: ScreenBackgroundProps) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0f0114', '#060008']}
        style={{ ...styles.background, ...style }}
      >
        {children}
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
})
