import React, { useState } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
  Modal,
} from 'react-native'
import { IconButton } from "react-native-paper";
import Video from 'react-native-video'
import { convertToK, isLongDescription } from '../utils/Functions';
import CommentModal from './CommentModal';

export default function VideoPlayerModal({ visible, video, onClose }) {
  if (!video) return null;
  const [isPlaying, setIsPlaying] = useState(false);
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
    <Modal
      visible={visible}
      animationType='slide'
      onRequestClose={onClose}
    >
      <TouchableHighlight
        onPress={() => setIsPlaying(!isPlaying)}
        activeOpacity={1}
      >
        <View style={styles.container}>
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
      </TouchableHighlight>
      <IconButton
        icon={require('../assets/close.png')}
        size={25}
        onPress={onClose}
        style={[styles.closeBtn, { display: isModalVisible ? 'none' : 'flex' }]}
      />
      <View style={styles.videoInfo}>
        <Text style={styles.ownerName}>{video.owner.name}</Text>
        <Text style={styles.description}>
          {isMorePressed ? video.description : isLongDescription(video.description).description}
        </Text>
        <TouchableWithoutFeedback onPress={onMorePress}>
          <Text
            style={[styles.descriptionMore, { opacity: isLongDescription(video.description).isLong ? 1 : 0 }]}
          >
            {isMorePressed ? 'Less' : 'More'}
          </Text>
        </TouchableWithoutFeedback>
      </View>
      <Image
        source={{ uri: "https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/36370026_2103135646630625_4956188102608551936_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=be3454&_nc_ohc=FmG4BOEqPP4AX8GS4DN&_nc_ht=scontent-hkg4-1.xx&_nc_e2o=f&oh=00_AfCRywCdcflMl4hIC51MZ2DI1jgG70U-ikcJKHPhcW1peQ&oe=6553293B" }}
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
        icon={require('../assets/comment.png')}
        size={35}
        style={styles.showCommentBtn}
        iconColor='#fff'
        onPress={() => setModalVisible(true)}
      />
      <Text style={styles.commentCount}>{convertToK(video.comments)}</Text>
      <CommentModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        video={video}
      />
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
  video: {
    flex: 1,
  },
  closeBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
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
    top: 430,
    right: 5,
  },
  likeCount: {
    color: '#fff',
    fontSize: 10,
    position: 'absolute',
    textShadowColor: '#000',
    top: 478,
    right: 20,
    fontWeight: 'bold',
    width: 35,
    textAlign: 'center',
  },
  showCommentBtn: {
    position: 'absolute',
    top: 500,
    right: 5,
  },
  commentCount: {
    color: '#fff',
    width: 35,
    fontSize: 10,
    fontWeight: 'bold',
    position: 'absolute',
    textShadowColor: '#000',
    top: 548,
    right: 20,
    textAlign: 'center',
  },
})