import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions, FlatList } from 'react-native';
import { IconButton } from 'react-native-paper';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import VideoThumbnail from '../components/VideoThumbnail';
import VideoPlayerModal from '../components/VideoPlayerModal';
import { SEARCH_URL } from '../config';
import { useAppSelector } from '../redux/hooks';
import GifLoadingBottom from '../components/GifLoadingBottom';

export default function SearchResponse({ navigation, route }) {
  const q = route.params.searchText;
  const user = useAppSelector(state => state.user);
  const [isInitLoading, setIsInitLoading] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [videos, setVideos] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [usersPage, setUsersPage] = React.useState(1);
  const [videosPage, setVideosPage] = React.useState(1);
  const [isUsersEnd, setIsUsersEnd] = useState(false);
  const [isVideosEnd, setIsVideosEnd] = useState(false);
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch(`${SEARCH_URL}?q=${q}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${user.accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setVideos(json.videos.videos);
        setUsers(json.users.users);
        setIsUsersEnd(!json.users.has_next);
        setIsVideosEnd(!json.videos.has_next);
        setIsInitLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const getMoreData = (type: string) => {    
    if ((type === "users" && isUsersEnd) || (type === "videos" && isVideosEnd) || isLoading) {
      return;
    }
    setIsLoading(true);
    fetch(`${SEARCH_URL}?q=${q}&page=${type === "users" ? usersPage + 1 : videosPage + 1}&type=${type}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${user.accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setUsers([...users, ...json.users.users]);
        setIsUsersEnd(!json.users.has_next);
        setUsersPage(usersPage + 1);
        setVideos([...videos, ...json.videos.videos]);
        setIsVideosEnd(!json.videos.has_next);
        setVideosPage(videosPage + 1);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onClose = () => {
    navigation.goBack();
  };
  const [routes] = useState([
    { key: 'users' },
    { key: 'videos' },
  ]);
  const UsersRender = () => {
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
        data={users}
        numColumns={1}
        renderItem={({ item }) => (
          <></>
        )}
        onEndReached={() => {
          getMoreData("users");
        }}
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
        ListEmptyComponent={() => {
          return (
            <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#fff' }}>No users found</Text>
            </View>
          )
        }}
      />
    </View>
    )
  };
  const VideosRender = () => {
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
        onEndReached={() => {
          getMoreData("videos");
        }}
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
        ListEmptyComponent={() => {
          return (
            <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#fff' }}>No videos found</Text>
            </View>
          )
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
    videos: VideosRender,
    users: UsersRender,
  });

  function renderTabBar(props) {
    const tabBarStyles = StyleSheet.create({
      tabContainer: {
        height: 40,
        backgroundColor: '#000',
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
      <View style={{ backgroundColor: '#000' }}>
        <TabBar
          {...props}
          indicatorStyle={tabBarStyles.indicator}
          style={tabBarStyles.tabContainer}
          renderIcon={({ route, focused, color }) => {
            const sourceMap = {
              videos: require('../assets/video.png'),
              users: require('../assets/profile.png'),
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
      <View style={styles.header}>
        <Text style={styles.headerText}>{q}</Text>
        <IconButton
          icon={require('../assets/close.png')}
          size={25}
          onPress={onClose}
          style={[styles.closeBtn, { display: isInitLoading ? 'none' : 'flex' }]}
        />
      </View>
      <TabView
        style={styles.tabViewContainer}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
      <View style={[styles.loading, { display: isInitLoading ? 'flex' : 'none' }]}>
        <Image
          source={require('../assets/loading.gif')}
          style={{ width: 40, height: 40, marginBottom: 10 }}
        />
        <Text>Searching...</Text>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
  header: {
    width: '100%',
    height: 50,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  closeBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  closeModalBtn: {
    position: 'absolute',
    top: -8,
    right: -8,
  },
  loading: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: '#000',
    alignItems: 'center',
    elevation: 1,
  },
  tabViewContainer: {
    paddingTop: 5,
    width: '100%',
    backgroundColor: '#000',
  },
});
