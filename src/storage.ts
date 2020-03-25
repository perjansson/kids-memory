import { AsyncStorage } from 'react-native'

export async function set(key: string, value: string) {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (error) {
    // Error saving data
  }
}

export async function get(key: string) {
  try {
    const value = await AsyncStorage.getItem(key)
    return value
  } catch (error) {
    // Error saving data
  }
}
