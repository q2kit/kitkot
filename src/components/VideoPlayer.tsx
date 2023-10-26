import React, { useState } from 'react';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  TouchableHighlight,
} from 'react-native';
import { IconButton } from 'react-native-paper';
import Video from 'react-native-video';
import { useWindowDimensions } from 'react-native';
import { convertToK, isLongDescription } from '../utils/Functions';
import CommentModal from './CommentModal';
import ProfileModal from './ProfileModal';
import {
  LIKE_TOGGLE_URL,
  SET_WATCH_URL,
  joinPaths
} from '../config';
import { useAppSelector } from '../redux/hooks';
import axios from 'axios';

export default function VideoPlayer({ video, currentVideo }) {
  const user = useAppSelector(state => state.user);
  const [isPlaying, setIsPlaying] = useState(currentVideo == video.id);
  const likeToggle = () => {
    const fd = new FormData();
    fd.append('video_id', video.id);
    axios.post(LIKE_TOGGLE_URL, fd, {
      headers: {
        'Authorization': `Bearer ${user.accessToken}`,
      },
    }).then(response => { }).catch(error => { });
  };
  if (isPlaying) {
    axios.get(joinPaths(SET_WATCH_URL, video.id), {
      headers: {
        'Authorization': `Bearer ${user.accessToken}`,
      },
    }).then(response => { }).catch(error => { });
  }
  const layout = useWindowDimensions();
  const bottomTabHeight = 50;
  const statusBarHeight = StatusBar.currentHeight || 0;
  const [liked, setLiked] = useState(video.liked);
  const [likes, setLikes] = useState(video.likes);
  const [isMorePressed, setIsMorePressed] = useState(false);
  const [isCommentModalVisible, setCommentModalVisible] = useState(false);
  const [isProfileModalVisible, setProfileModalVisible] = useState(false);
  const [isFollowed, setIsFollowed] = useState(video.owner.is_followed);
  const [isShowFollowBtn, setIsShowFollowBtn] = useState(
    !video.owner.is_followed,
  );
  const onLikePress = () => {
    setLikes(likes + (liked ? -1 : 1));
    setLiked(!liked);
    likeToggle();
  };
  const onMorePress = () => {
    setIsMorePressed(!isMorePressed);
  };
  const onFollowPress = () => {
    setIsFollowed(!isFollowed);
    setTimeout(() => {
      setIsShowFollowBtn(false);
    }, 1000);
  };
  const onVideoPress = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <View>
      <TouchableHighlight
        onPress={onVideoPress}
        activeOpacity={1}
      >
        <View style={[
          styles.container,
          { width: layout.width, height: layout.height - statusBarHeight - bottomTabHeight },
        ]}>
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
              iconColor="#eee"
            />
          )}
        </View>
      </TouchableHighlight>
      <View style={styles.videoInfo}>
        <Text style={styles.ownerName}>{video.owner.name}</Text>
        <Text style={styles.description}>
          {isMorePressed
            ? video.description
            : isLongDescription(video.description).description}
        </Text>
        <TouchableWithoutFeedback onPress={onMorePress}>
          <Text
            style={[
              styles.descriptionMore,
              {
                display: isLongDescription(video.description).isLong
                  ? 'flex'
                  : 'none',
              },
            ]}>
            {isMorePressed ? 'Less' : 'More'}
          </Text>
        </TouchableWithoutFeedback>
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          setProfileModalVisible(true);
          setIsPlaying(false);
        }}>
        <Image source={{ uri: video.owner.avatar }} style={styles.ownerAvatar} />
      </TouchableWithoutFeedback>
      <ProfileModal
        visible={isProfileModalVisible}
        onClose={() => setProfileModalVisible(false)}
        user_id={video.owner.id}
      />
      <IconButton
        icon={
          isFollowed
            ? require('../assets/check.png')
            : require('../assets/follow-btn.png')
        }
        onPress={onFollowPress}
        size={20}
        style={[styles.followBtn, { display: isShowFollowBtn ? 'flex' : 'none' }]}
        iconColor="white"
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
        onPress={() => setCommentModalVisible(true)}
        icon={require('../assets/comment.png')}
        size={35}
        style={styles.showCommentBtn}
        iconColor="#fff"
      />
      <Text style={styles.commentCount}>{convertToK(video.comments)}</Text>
      <CommentModal
        visible={isCommentModalVisible}
        onClose={() => setCommentModalVisible(false)}
        video={video}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
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
    opacity: 0.5,
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
    paddingBottom: 5,
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
    width: 40,
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
    right: 11,
  },
  followBtn: {
    position: 'absolute',
    top: 368,
    right: 19.5,
    width: 20,
    height: 20,
    backgroundColor: 'red',
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
});
