import React, { useState } from 'react';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
} from 'react-native'
import { IconButton } from "react-native-paper";
import Video from 'react-native-video';
import { useWindowDimensions } from 'react-native';
import { convertToK, isLongDescription } from '../utils/Functions';
import CommentModal from './CommentModal';

export default function VideoPlayer({ video }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const layout = useWindowDimensions();
  const tabBarHeight = 50;
  const statusBarHeight = StatusBar.currentHeight || 0;
  const [liked, setLiked] = useState(video.liked);
  const [likes, setLikes] = useState(video.likes);
  const [isMorePressed, setIsMorePressed] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const onLikePress = () => {
    setLikes(likes + (liked ? -1 : 1));
    setLiked(!liked);
  }
  const onMorePress = () => {
    setIsMorePressed(!isMorePressed);
  }
  return (
    <View>
      <TouchableWithoutFeedback onPressOut={() => setIsPlaying(!isPlaying)}>
        <View style={[styles.container, { width: layout.width, height: layout.height - tabBarHeight - statusBarHeight }]}>
          <Video
            source={video}
            style={styles.video}
            controls={false}
            resizeMode="contain"
            repeat={true}
            paused={!isPlaying}
          />
          {!isPlaying && (
            <IconButton
              icon={require('../assets/play.png')}
              size={70}
              style={styles.playBtn}
              iconColor='#eee'
            />
          )}
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.videoInfo}>
        <Text style={styles.ownerName}>{video.owner.name}</Text>
        <Text style={styles.description}>
          {isMorePressed ? video.description : isLongDescription(video.description).description}
        </Text>
        <TouchableWithoutFeedback onPress={onMorePress}>
          <Text
            style={[styles.descriptionMore, { display: isLongDescription(video.description).isLong ? 'flex' : 'none' }]}
          >
            {isMorePressed ? 'Less' : 'More'}
          </Text>
        </TouchableWithoutFeedback>
      </View>
      <Image
        source={{ uri: video.owner.avatar }}
        style={styles.ownerAvatar}
      />
      <IconButton
        onPress={onLikePress}
        icon={require('../assets/heart.png')}
        size={35}
        style={styles.likeBtn}
        iconColor={liked ? '#f54545' : '#fff'}
      />
      <Text style={styles.likeCount}>{convertToK(likes)}</Text>
      <IconButton
        onPress={() => setModalVisible(true)}
        icon={require('../assets/comment.png')}
        size={35}
        style={styles.showCommentBtn}
        iconColor='#fff'
      />
      <Text style={styles.commentCount}>{convertToK(video.comments)}</Text>
      <CommentModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        video={video}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
  },
  video: {
    flex: 1,
  },
  playBtn: {
    width: 70,
    height: 70,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -35,
    marginTop: -35,
  },
  videoInfo: {
    position: 'absolute',
    bottom: 10,
    left: 20,
  },
  ownerName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  description: {
    color: '#fff',
    fontSize: 13,
    flexWrap: 'wrap',
    paddingRight: 60,
  },
  descriptionMore: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    fontStyle: 'italic',
    flexWrap: 'wrap',
  },
  ownerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'blue',
    position: 'absolute',
    top: '50%',
    marginTop: -25,
    right: 10,
  },
  likeBtn: {
    position: 'absolute',
    top: 410,
    right: 5,
  },
  likeCount: {
    color: '#fff',
    fontSize: 10,
    position: 'absolute',
    textShadowColor: '#000',
    top: 458,
    right: 20,
    fontWeight: 'bold',
    width: 35,
    textAlign: 'center',
  },
  showCommentBtn: {
    position: 'absolute',
    top: 480,
    right: 5,
  },
  commentCount: {
    color: '#fff',
    width: 35,
    fontSize: 10,
    fontWeight: 'bold',
    position: 'absolute',
    textShadowColor: '#000',
    top: 528,
    right: 20,
    textAlign: 'center',
  },
})
