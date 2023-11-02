import React, { PureComponent } from 'react'
import {
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  View,
  Text,
} from 'react-native'
import { IconButton } from 'react-native-paper'
import { convertToK } from '../utils/Functions'

export default class VideoThumbnail extends PureComponent {
  render() {
    const { video, onPress } = this.props
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.container}>
          <Image
            source={{ uri: video.thumbnail }}
            style={styles.thumbnail}
            resizeMode="center"
          />
          <IconButton
            icon={require('../assets/view.png')}
            style={styles.viewIcon}
            iconColor='#fff'
            size={20}
          />
          <Text style={styles.viewCount}>{convertToK(video.views)}</Text>
          {video.is_premium && (
            <Image
              source={require('../assets/premium.png')}
              style={styles.premiumIcon}
              resizeMode="center"
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '32.7%',
    height: 200,
    backgroundColor: "#121212",
    marginTop: 2,
    marginLeft: '0.5%'
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  viewIcon: {
    position: 'absolute',
    bottom: -5,
    left: -5,
  },
  viewCount: {
    position: 'absolute',
    bottom: 10,
    left: 30,
    color: '#fff',
    fontSize: 10,
  },
  premiumIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 20,
    height: 20,
  }
})
