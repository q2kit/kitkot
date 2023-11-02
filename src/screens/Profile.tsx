import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
  FlatList,
  TouchableHighlight,
} from "react-native";
import { useAppSelector } from "../redux/hooks";
import { IconButton } from "react-native-paper";
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { convertToK } from "../utils/Functions";
import VideoThumbnail from "../components/VideoThumbnail";
import VideoPlayerModal from "../components/VideoPlayerModal";
import { GET_PROFILE_URL } from "../config";
import { useIsFocused } from '@react-navigation/native';
import GifLoadingBottom from "../components/GifLoadingBottom";

export default function Profile({ navigation }) {
  const user = useAppSelector(state => state.user);
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [routes] = useState([
    { key: 'publicVideos' },
    { key: 'privateVideos' },
    { key: 'likedVideos' },
    { key: 'watchedVideos' },
  ]);
  const [videos, setVideos] = useState({
    publicVideos: [],
    privateVideos: [],
    likedVideos: [],
    watchedVideos: [],
  });
  const isFocused = useIsFocused();

  useEffect(() => {
    fetch(GET_PROFILE_URL + user.id + "/", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${user.accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setVideos(json.user.videos);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [isFocused]);

  const RouteRender = (props) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [videoModal, setVideoModal] = useState(null);
    const styles = StyleSheet.create({
      list: {
        width: '100%',
        height: '100%',
        backgroundColor: '#0a0a0a',
      },
    });

    return (<View>
      <FlatList
        style={styles.list}
        data={videos[props.route.key]}
        numColumns={3}
        key={3}
        renderItem={({ item }) => (
          item.liked = props.route.key === 'likedVideos',
          <VideoThumbnail
            video={item}
            onPress={() => {
              setModalVisible(true);
              setVideoModal(item);
            }}
          />
        )}
        ListFooterComponent={() => {
          return (
            <GifLoadingBottom
              style={{ marginBottom: 1 }}
              visible={isLoading}
            />
          )
        }}
        ListFooterComponentStyle={{
          height: 10,
        }}
      />
      <VideoPlayerModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        video={videoModal}
      />
    </View>
    )
  };

  const renderScene = SceneMap({
    publicVideos: RouteRender,
    privateVideos: RouteRender,
    likedVideos: RouteRender,
    watchedVideos: RouteRender,
  });

  function renderTabBar(props) {
    const tabBarStyles = StyleSheet.create({
      tabContainer: {
        height: 40,
        backgroundColor: "#121212",
        width: '90%',
        marginLeft: '5%',
        shadowOffset: { height: 0, width: 0 },
        shadowColor: 'transparent',
        shadowOpacity: 0,
        boxShadow: 'none',
      },
      indicator: {
        display: 'none',
      },
      tab: {
        top: -4,
        height: 30,
        paddingLeft: 10,
        paddingRight: 10,
      },
      activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#fff',
      },
      icon: {
        width: 20,
        height: 20,
        marginTop: 0,
      }
    });
    return (
      <View style={{ backgroundColor: "#121212" }}>
        <TabBar
          {...props}
          indicatorStyle={tabBarStyles.indicator}
          style={tabBarStyles.tabContainer}
          renderIcon={({ route, focused, color }) => {
            const sourceMap = {
              publicVideos: require('../assets/video.png'),
              privateVideos: require('../assets/private.png'),
              likedVideos: require('../assets/heart2.png'),
              watchedVideos: require('../assets/watch.png'),
            };
            const source = sourceMap[route.key];
            return (
              <View
                style={[
                  tabBarStyles.tab,
                  focused ? tabBarStyles.activeTab : null,
                ]}
              >
                <IconButton
                  icon={source}
                  style={tabBarStyles.icon}
                  iconColor={focused ? '#fff' : '#999'}
                  size={20}
                />
              </View>
            )
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <IconButton
        icon={require('../assets/settings.png')}
        size={25}
        onPress={() => navigation.navigate('Settings')}
        style={styles.settings}
        iconColor="#fff"
      />
      <Text style={styles.name}>
        {user.name}
      </Text>
      <TouchableHighlight
        onPress={() => setShowAvatarModal(true)}
        activeOpacity={1}
      >
        <Image
          source={{ uri: user.avatar }}
          style={styles.avatar}
        />
      </TouchableHighlight>
      <Text style={styles.username}>
        @{user.username}
      </Text>
      <View style={styles.counterContainer}>
        <View style={styles.counterBox}>
          <Text style={styles.counter}>
            {convertToK(user.following)}
          </Text>
          <Text style={styles.counterLabel}>
            Following
          </Text>
        </View>
        <Text style={styles.splitLine}>|</Text>
        <View style={styles.counterBox}>
          <Text style={styles.counter}>
            {convertToK(user.followers)}
          </Text>
          <Text style={styles.counterLabel}>
            Followers
          </Text>
        </View>
        <Text style={styles.splitLine}>|</Text>
        <View style={styles.counterBox}>
          <Text style={styles.counter}>
            {convertToK(user.likes)}
          </Text>
          <Text style={styles.counterLabel}>
            Likes
          </Text>
        </View>
      </View>
      <TabView
        style={{
          flex: 1,
          width: '100%',
          backgroundColor: '#eee'
        }}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
      <TouchableHighlight
        onPress={() => setShowAvatarModal(false)}
        activeOpacity={1}
        style={[styles.avatarModalContainer, showAvatarModal ? null : { display: 'none' }]}
      >
        <Image
          source={{ uri: user.avatar }}
          style={styles.avatarModal}
        />
      </TouchableHighlight>
    </View>
  );
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
  settings: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  name: {
    marginTop: 5,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  avatar: {
    alignItems: 'center',
    marginTop: 20,
    width: 110,
    height: 110,
    borderRadius: 100,
  },
  avatarModalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: "#121212",
    opacity: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarModal: {
    width: 350,
    height: 350,
    backgroundColor: '#fff',
  },
  username: {
    marginTop: 2,
    fontSize: 13,
    fontWeight: 'bold',
    color: '#aaa',
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
  }
});
