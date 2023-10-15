import React from 'react'
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

const getUserInfo = (id: number) => {
  return {
    avatar: "https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/36370026_2103135646630625_4956188102608551936_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=be3454&_nc_ohc=FmG4BOEqPP4AX8GS4DN&_nc_ht=scontent-hkg4-1.xx&_nc_e2o=f&oh=00_AfCRywCdcflMl4hIC51MZ2DI1jgG70U-ikcJKHPhcW1peQ&oe=6553293B",
    name: "Nguyeenx Vawn A",
    username: "nguyeenxvawn",
    followers: 100,
    following: 100,
    likes: 100,
    is_following: true,
    is_preminum: true,
  }
}

const videodata = [
  {
    key: 'a',
    uri: "https://kitkot.q2k.dev/video_example",
    thumbnail: "https://cdn.tgdd.vn/Files/2017/02/16/950437/anhthunho1_800x450.jpg",
    owner: {
      name: "Nguyeenx Vawn A",
      avatar: "https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/36370026_2103135646630625_4956188102608551936_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=be3454&_nc_ohc=FmG4BOEqPP4AX8GS4DN&_nc_ht=scontent-hkg4-1.xx&_nc_e2o=f&oh=00_AfCRywCdcflMl4hIC51MZ2DI1jgG70U-ikcJKHPhcW1peQ&oe=6553293B",
    },
    liked: true,
    likes: 100,
    views: 122200000,
    comments: 10200,
    is_premium: true,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies, nunc nisl ultricies nunc, quis ultri",
  },
  {
    key: 'b',
    uri: "https://kitkot.q2k.dev/video_example2",
    thumbnail: "https://cdn.tgdd.vn/Files/2017/02/16/950437/anhthunho1_800x450.jpg",
    owner: {
      name: "Nguyeenx Vawn A",
      avatar: "https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/36370026_2103135646630625_4956188102608551936_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=be3454&_nc_ohc=FmG4BOEqPP4AX8GS4DN&_nc_ht=scontent-hkg4-1.xx&_nc_e2o=f&oh=00_AfCRywCdcflMl4hIC51MZ2DI1jgG70U-ikcJKHPhcW1peQ&oe=6553293B",
    },
    liked: true,
    likes: 100,
    views: 1000,
    comments: 10200,
    description: "Example description",
  },
  {
    key: 'c',
    uri: "https://kitkot.q2k.dev/video_example",
    thumbnail: "https://cdn.tgdd.vn/Files/2017/02/16/950437/anhthunho1_800x450.jpg",
    owner: {
      name: "Nguyeenx Vawn A",
      avatar: "https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/36370026_2103135646630625_4956188102608551936_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=be3454&_nc_ohc=FmG4BOEqPP4AX8GS4DN&_nc_ht=scontent-hkg4-1.xx&_nc_e2o=f&oh=00_AfCRywCdcflMl4hIC51MZ2DI1jgG70U-ikcJKHPhcW1peQ&oe=6553293B",
    },
    liked: true,
    likes: 100,
    views: 1000,
    comments: 10200,
    is_premium: true,
    description: "Example description",
  },
  {
    key: 'd',
    uri: "https://kitkot.q2k.dev/video_example2",
    thumbnail: "https://cdn.tgdd.vn/Files/2017/02/16/950437/anhthunho1_800x450.jpg",
    owner: {
      name: "Nguyeenx Vawn A",
      avatar: "https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/36370026_2103135646630625_4956188102608551936_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=be3454&_nc_ohc=FmG4BOEqPP4AX8GS4DN&_nc_ht=scontent-hkg4-1.xx&_nc_e2o=f&oh=00_AfCRywCdcflMl4hIC51MZ2DI1jgG70U-ikcJKHPhcW1peQ&oe=6553293B",
    },
    liked: true,
    likes: 100,
    views: 1000,
    comments: 10200,
    description: "Example description",
  },
  {
    key: 'e',
    uri: "https://kitkot.q2k.dev/video_example2",
    thumbnail: "https://cdn.tgdd.vn/Files/2017/02/16/950437/anhthunho1_800x450.jpg",
    owner: {
      name: "Nguyeenx Vawn A",
      avatar: "https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/36370026_2103135646630625_4956188102608551936_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=be3454&_nc_ohc=FmG4BOEqPP4AX8GS4DN&_nc_ht=scontent-hkg4-1.xx&_nc_e2o=f&oh=00_AfCRywCdcflMl4hIC51MZ2DI1jgG70U-ikcJKHPhcW1peQ&oe=6553293B",
    },
    liked: true,
    likes: 100,
    views: 1000,
    comments: 10200,
    description: "Example description",
  },
  {
    key: 'f',
    uri: "https://kitkot.q2k.dev/video_example2",
    thumbnail: "https://cdn.tgdd.vn/Files/2017/02/16/950437/anhthunho1_800x450.jpg",
    owner: {
      name: "Nguyeenx Vawn A",
      avatar: "https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/36370026_2103135646630625_4956188102608551936_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=be3454&_nc_ohc=FmG4BOEqPP4AX8GS4DN&_nc_ht=scontent-hkg4-1.xx&_nc_e2o=f&oh=00_AfCRywCdcflMl4hIC51MZ2DI1jgG70U-ikcJKHPhcW1peQ&oe=6553293B",
    },
    liked: true,
    likes: 100,
    views: 1000,
    comments: 10200,
    description: "Example description",
  },
  {
    key: 'g',
    uri: "https://kitkot.q2k.dev/video_example2",
    thumbnail: "https://cdn.tgdd.vn/Files/2017/02/16/950437/anhthunho1_800x450.jpg",
    owner: {
      name: "Nguyeenx Vawn A",
      avatar: "https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/36370026_2103135646630625_4956188102608551936_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=be3454&_nc_ohc=FmG4BOEqPP4AX8GS4DN&_nc_ht=scontent-hkg4-1.xx&_nc_e2o=f&oh=00_AfCRywCdcflMl4hIC51MZ2DI1jgG70U-ikcJKHPhcW1peQ&oe=6553293B",
    },
    liked: true,
    likes: 100,
    views: 1000,
    comments: 10200,
    description: "Example description",
  },
  {
    key: 'h',
    uri: "https://kitkot.q2k.dev/video_example2",
    thumbnail: "https://cdn.tgdd.vn/Files/2017/02/16/950437/anhthunho1_800x450.jpg",
    owner: {
      name: "Nguyeenx Vawn A",
      avatar: "https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/36370026_2103135646630625_4956188102608551936_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=be3454&_nc_ohc=FmG4BOEqPP4AX8GS4DN&_nc_ht=scontent-hkg4-1.xx&_nc_e2o=f&oh=00_AfCRywCdcflMl4hIC51MZ2DI1jgG70U-ikcJKHPhcW1peQ&oe=6553293B",
    },
    liked: true,
    likes: 100,
    views: 1000,
    comments: 10200,
    description: "Example description",
  },
];


export default function ProfileModal({ user_id, visible, onClose }) {
  const userInfo = getUserInfo(user_id);
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [videoModal, setVideoModal] = React.useState(null);
  const [followers, setFollowers] = React.useState(userInfo.followers);
  const [is_following, setIsFollowing] = React.useState(userInfo.is_following);

  const handleFollow = () => {
    setIsFollowing(!is_following);
    if (is_following) {
      setFollowers(followers - 1);
    } else {
      setFollowers(followers + 1);
    }
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
          data={videodata}
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
    backgroundColor: '#000',
    width: '100%',
    flexDirection: 'column',
    color: '#000',
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
