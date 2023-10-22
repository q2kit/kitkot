import React from 'react'
import {
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  View,
} from 'react-native'

export default function FriendItem({ friend, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Image
          source={{ uri: friend.avatar }}
          style={styles.avatar}
        />
        {friend.is_online && (
          <View style={styles.online}/>
        )}
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    marginRight: 15,
    alignItems: 'center',
  },
  avatar: {
    marginTop: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  online: {
    position: 'absolute',
    bottom: 10,
    right: 5,
    width: 11,
    height: 11,
    backgroundColor: '#31cc46',
    borderRadius: 5.5,
    borderColor: 'lightblue',
    borderWidth: 1,
  },
})
