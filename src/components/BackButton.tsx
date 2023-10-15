import React from 'react'
import { TouchableWithoutFeedback, Image, StyleSheet, StatusBar } from 'react-native'

export default function BackButton({ goBack }) {
  return (
    <TouchableWithoutFeedback onPress={goBack} style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/arrow_back.png')}
      />
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10 + StatusBar.currentHeight,
    left: 4,
  },
  image: {
    width: 24,
    height: 24,
  },
})
