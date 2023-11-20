import React, { useEffect, useState } from 'react'
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { convertToK } from '../utils/Functions';
import { Button, IconButton } from 'react-native-paper';
import VideoThumbnail from './VideoThumbnail';
import VideoPlayerModal from './VideoPlayerModal';
import Modal from 'react-native-modal';
import { GET_PROFILE_URL } from '../config';
import { useAppSelector } from '../redux/hooks';


export default function ProfileModal({ user_id, visible, onClose, onFollowToggle }) {
  const user = useAppSelector(state => state.user);
  const [userInfo, setUserInfo] = React.useState({
    avatar: "",
    name: "",
    username: "",
    followers: 0,
    following: 0,
    likes: 0,
    is_following: false,
    is_preminum: false,
  });
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [videoModal, setVideoModal] = React.useState(null);
  const [followers, setFollowers] = React.useState(userInfo.followers);
  const [is_following, setIsFollowing] = React.useState(userInfo.is_following);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch(GET_PROFILE_URL + user_id + "/", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${user.accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setVideos(json.user.videos);
        setUserInfo({
          avatar: json.user.avatar,
          name: json.user.name,
          username: json.user.username,
          followers: json.user.followers,
          following: json.user.following,
          likes: json.user.likes,
          is_following: json.user.is_following,
          is_preminum: json.user.is_preminum,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleFollow = () => {
    setIsFollowing(!is_following);
    if (is_following) {
      setFollowers(followers - 1);
    } else {
      setFollowers(followers + 1);
    }
    onFollowToggle();
  }

  const handleContact = () => {
  }

  return (
    <Modal
      isVisible={visible}
      animationIn={'slideInRight'}
      animationOut={'slideOutRight'}
      onBackButtonPress={onClose}
      style={{ flex: 1, margin: 0 }}
    >
      <View style={styles.container}>
        <IconButton
          icon={require('../assets/arrow_back.png')}
          size={25}
          onPress={onClose}
          style={styles.backBtn}
          iconColor='#fff'
        />
        <Text style={styles.name}>
          {userInfo.name}
        </Text>
        <Image
          source={{ uri: userInfo.avatar }}
          style={styles.avatar}
        />
        {userInfo.is_preminum && (
          <Image
            source={require('../assets/premium.png')}
            style={styles.premiumIcon}
            resizeMode="center"
          />
        )}
        <Text style={styles.username}>
          @{userInfo.username}
        </Text>
        <View style={styles.counterContainer}>
          <View style={styles.counterBox}>
            <Text style={styles.counter}>
              {convertToK(userInfo.following)}
            </Text>
            <Text style={styles.counterLabel}>
              Following
            </Text>
          </View>
          <Text style={styles.splitLine}>|</Text>
          <View style={styles.counterBox}>
            <Text style={styles.counter}>
              {convertToK(followers)}
            </Text>
            <Text style={styles.counterLabel}>
              Followers
            </Text>
          </View>
          <Text style={styles.splitLine}>|</Text>
          <View style={styles.counterBox}>
            <Text style={styles.counter}>
              {convertToK(userInfo.likes)}
            </Text>
            <Text style={styles.counterLabel}>
              Likes
            </Text>
          </View>
        </View>
        <View style={styles.actionContainer}>
          <Button
            mode="contained"
            onPress={handleFollow}
            style={[styles.followBtn, { backgroundColor: is_following ? '#2E2E2E' : '#EB4E60' }]}
            labelStyle={{
              color: '#fff',
              fontSize: 13,
              marginTop: 5,
            }}
          >
            {is_following ? 'Following' : 'Follow'}
          </Button>
          <Text style={styles.splitLine}>|</Text>
          <Button
            mode="contained"
            onPress={handleContact}
            style={styles.contactBtn}
            labelStyle={{
              color: '#fff',
              fontSize: 13,
              marginTop: 5,
            }}
          >
            Contact
          </Button>
        </View>
        <FlatList
          data={videos}
          numColumns={3}
          key={3}
          renderItem={({ item }) => (
            <VideoThumbnail
              video={item}
              onPress={() => {
                setModalVisible(true);
                setVideoModal(item);
              }}
            />
          )}
        />
        <VideoPlayerModal
          visible={isModalVisible}
          onClose={() => setModalVisible(false)}
          video={videoModal}
        />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: "#121212",
    width: '100%',
    flexDirection: 'column',
    color: "#000",
    alignItems: 'center',
  },
  backBtn: {
    position: 'absolute',
    top: 0,
    left: 10,
  },
  name: {
    marginTop: 5,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  premiumIcon: {
    position: 'absolute',
    top: 145,
    left: '50%',
    marginLeft: -13,
    width: 26,
    height: 26,
  },
  avatar: {
    alignItems: 'center',
    marginTop: 20,
    width: 110,
    height: 110,
    borderRadius: 100,
  },
  username: {
    marginTop: 2,
    fontSize: 13,
    fontWeight: 'bold',
    color: '#fff',
  },
  counterContainer: {
    fontWeight: 'bold',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
  },
  counterBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: "30%",
    color: '#fff',
  },
  counter: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 13,
  },
  counterLabel: {
    color: '#fff',
    fontSize: 11,
  },
  splitLine: {
    color: '#777',
    fontSize: 15,
  },
  actionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 10,
  },
  followBtn: {
    width: '30%',
    height: 40,
    borderRadius: 7,
    backgroundColor: '#EB4E60',
    marginRight: 10,
  },
  contactBtn: {
    width: '30%',
    height: 40,
    borderRadius: 7,
    backgroundColor: '#2E2E2E',
    marginLeft: 10,
  },
});
