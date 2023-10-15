import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
  FlatList,
  Modal,
} from "react-native";
import { useAppSelector } from "../redux/hooks";
import { IconButton } from "react-native-paper";
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { convertToK } from "../utils/Functions";
import VideoThumbnail from "../components/VideoThumbnail";
import VideoPlayerModal from "../components/VideoPlayerModal";

const getData = (routeKey: string) => {
  return [
    {
      key: 'a',
      uri: "https://kitkot.q2k.dev/video_example",
      thumbnail: "https://cdn.tgdd.vn/Files/2017/02/16/950437/anhthunho1_800x450.jpg",
      owner: {
        name: "Nguyeenx Vawn A"
      },
      liked: true,
      likes: 100,
      comments: 10200,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies, nunc nisl ultricies nunc, quis ultri",
    },
    {
      key: 'b',
      uri: "https://kitkot.q2k.dev/video_example2",
      thumbnail: "https://cdn.tgdd.vn/Files/2017/02/16/950437/anhthunho1_800x450.jpg",
      owner: {
        name: "Nguyeenx Vawn A"
      },
      liked: true,
      likes: 100,
      comments: 10200,
      description: "Example description",
    },
    {
      key: 'c',
      uri: "https://kitkot.q2k.dev/video_example",
      thumbnail: "https://cdn.tgdd.vn/Files/2017/02/16/950437/anhthunho1_800x450.jpg",
      owner: {
        name: "Nguyeenx Vawn A"
      },
      liked: true,
      likes: 100,
      comments: 10200,
      description: "Example description",
    },
    {
      key: 'd',
      uri: "https://kitkot.q2k.dev/video_example2",
      thumbnail: "https://cdn.tgdd.vn/Files/2017/02/16/950437/anhthunho1_800x450.jpg",
      owner: {
        name: "Nguyeenx Vawn A"
      },
      liked: true,
      likes: 100,
      comments: 10200,
      description: "Example description",
    },
  ];
}

const RouteRender = (props) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [videoModal, setVideoModal] = useState(null);
  return (<View>
    <FlatList
      data={getData(props.route.key)}
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
    <Modal visible={isModalVisible} animationType="slide">
      <VideoPlayerModal
        onClose={() => setModalVisible(false)}
        video={videoModal}
      />
    </Modal>
  </View>
  )
};

const renderScene = SceneMap({
  first: RouteRender,
  second: RouteRender,
  third: RouteRender,
  fourth: RouteRender,
});

function renderTabBar(props) {
  const tabBarStyles = StyleSheet.create({
    tabContainer: {
      height: 40,
      backgroundColor: 'rgba(255, 255, 255, 0)',
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
      height: 25,
      paddingLeft: 10,
      paddingRight: 10,
    },
    activeTab: {
      borderBottomWidth: 2,
      borderBottomColor: '#000',
    },
    img: {
      width: 20,
      height: 20,
    }
  });
  return (
    <TabBar
      {...props}
      indicatorStyle={tabBarStyles.indicator}
      style={tabBarStyles.tabContainer}
      renderIcon={({ route, focused, color }) => {
        const sourceMap = {
          first: focused
            ? require('../assets/myvideo-active.png')
            : require('../assets/myvideo-active.png'),
          second: focused
            ? require('../assets/myvideo-inactive.png')
            : require('../assets/myvideo-inactive.png'),
          third: focused
            ? require('../assets/myvideo-inactive.png')
            : require('../assets/myvideo-inactive.png'),
          fourth: focused
            ? require('../assets/myvideo-inactive.png')
            : require('../assets/myvideo-inactive.png'),
        };
        const source = sourceMap[route.key];
        return (
          <View
            style={[
              tabBarStyles.tab,
              focused ? tabBarStyles.activeTab : null,
            ]}
          >
            <Image
              source={source}
              style={tabBarStyles.img}
            />
          </View>
        )
      }}
    />
  );
}


export default function Profile({ navigation }) {

  const user = useAppSelector(state => state.user);
  const test_avatar = "https://static.vecteezy.com/system/resources/previews/008/442/086/large_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg";
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first' },
    { key: 'second' },
    { key: 'third' },
    { key: 'fourth' },
  ]);

  return (
    <View style={styles.container}>
      <IconButton
        icon={require('../assets/settings.png')}
        size={25}
        onPress={() => navigation.navigate('Settings')}
        style={styles.settings}
      />
      <Image
        source={{ uri: user.avatar || test_avatar }}
        style={styles.avatar}
      />
      <Text style={styles.name}>
        Họ Và Tên
      </Text>
      <Text style={styles.username}>
        @quan
      </Text>
      <View style={styles.counterContainer}>
        <View style={styles.counterBox}>
          <Text style={styles.counter}>
            {convertToK(1000)}
          </Text>
          <Text style={styles.counterLabel}>
            Following
          </Text>
        </View>
        <Text>|</Text>
        <View style={styles.counterBox}>
          <Text style={styles.counter}>
            {convertToK(201700)}
          </Text>
          <Text style={styles.counterLabel}>
            Followers
          </Text>
        </View>
        <Text>|</Text>
        <View style={styles.counterBox}>
          <Text style={styles.counter}>
            {convertToK(3000321320)}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#eee',
    width: '100%',
    flexDirection: 'column',
    color: '#000',
    alignItems: 'center',
  },
  settings: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  avatar: {
    alignItems: 'center',
    marginTop: 40,
    width: 130,
    height: 130,
    borderRadius: 100,
  },
  name: {
    marginTop: 7,
    color: '#000',
    fontSize: 20,
  },
  username: {
    marginTop: 0,
    fontSize: 14,
    color: '#888',
  },
  counterContainer: {
    fontWeight: 'bold',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    color: '#000',
    marginTop: 7,
    borderTopWidth: 1,
    borderTopColor: '#aaa',
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    paddingTop: 7,
    paddingBottom: 10,
  },
  counterBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: "30%",
    color: '#000',
  },
  counter: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,
  },
  counterLabel: {
    color: '#000',
    fontSize: 13,
  },
});
