import {
  useResponsiveHeight,
  useResponsiveWidth,
} from 'react-native-responsive-dimensions'

export function useDimensionStyle() {
  const height = useResponsiveHeight(100)
  const width = useResponsiveWidth(100)
  return { height, width }
}
