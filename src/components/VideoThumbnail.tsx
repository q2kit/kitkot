import React from 'react'
import {
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  Modal,
  View,
} from 'react-native'

export default function VideoThumbnail({ video, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Image
        source={{ uri: video.thumbnail }}
        style={styles.thumbnail}
        resizeMode="center"
      />
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  thumbnail: {
    width: '32.7%',
    height: 200,
    backgroundColor: '#000',
    marginTop: 2,
    marginLeft: '0.5%'
  },
})
