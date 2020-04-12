import React from 'react'
import { View, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useDimensionStyle } from '../hooks/useDimensionStyle'

interface ScreenBackgroundProps {
  children: React.ReactNode
  style?: object
}

export function ScreenBackground({ children }: ScreenBackgroundProps) {
  const dimensionStyle = useDimensionStyle()

  return (
    <View style={dimensionStyle}>
      <LinearGradient
        colors={['#0f0114', '#060008']}
        style={[dimensionStyle, styles.background]}
      >
        {children}
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    padding: 20,
  },
})
