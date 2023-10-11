import React from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  Modal,
} from 'react-native'


export default function VideoThumbnail({ video }) {
  return (
    <TouchableOpacity style={styles.container}>
      <Image
        source={{ uri: video.thumbnail }}
        style={styles.thumbnail}
        resizeMode="cover"
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '30%',
    height: '30%',
    backgroundColor: '#000',
  },
  thumbnail: {
    flex: 1,
  },
})
