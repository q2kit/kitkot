import React from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import Video from 'react-native-video'


export default function VideoPlayer(video) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Video
          source={{ uri: "https://drive.vnsvs.net/ssstik.io_1694951973186.mp4" }}
          style={styles.video}
          controls={false}
          resizeMode="cover"
          repeat={true}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
  button: {
    flex: 1,
  },
  video: {
    flex: 1,
  },
})
