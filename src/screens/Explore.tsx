import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  FlatList
} from "react-native";
import VideoThumbnail from "../components/VideoThumbnail";
import VideoPlayerModal from "../components/VideoPlayerModal";
import { IconButton } from "react-native-paper";

export default function Explore({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [videoModal, setVideoModal] = useState(null);
  const [searchText, setSearchText] = useState("");
  const getData = () => {
    return [
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
  ];
  }

  const onSearch = () => {
  };

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          onChangeText={setSearchText}
          placeholderTextColor="#fff"
        />
        <IconButton
          icon={require("../assets/search.png")}
          iconColor="#fff"
          size={25}
          style={[styles.searchIcon, { display: searchText ? 'flex' : 'none' }]}
          onPress={onSearch}
        />
      </View>
      <FlatList
        style={styles.list}
        data={getData()}
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
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    width: "100%",
    height: "100%",
  },
  search: {
    width: "100%",
    height: 50,
    marginTop: 100,/////
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    color: "#fff",
    height: 40,
    backgroundColor: "#333",
    borderRadius: 5,
    paddingLeft: 20,
    paddingRight: 40,
    paddingBottom: 8,
  },
  searchIcon: {
    position: "absolute",
    right: 15,
  },
  list: {
    width: "100%",
    height: "100%",
    backgroundColor: "#0a0a0a",
  },
});
