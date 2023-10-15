import React from 'react'
import { TouchableWithoutFeedback, Image, StyleSheet, View } from 'react-native'

export default function BackButton({ goBack }) {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={goBack}>
        <Image
          style={styles.image}
          source={require('../assets/arrow_back.png')}
        />
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: '100%',
  },
  image: {
    position: 'absolute',
    top: 10,
    left: -25,
    width: 30,
    height: 30,
  },
})
