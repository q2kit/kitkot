import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  FlatList
} from "react-native";
import VideoThumbnail from "../components/VideoThumbnail";
import VideoPlayerModal from "../components/VideoPlayerModal";
import { IconButton } from "react-native-paper";
import { GET_EXPLORE_VIDEOS_URL } from "../config";
import { useAppSelector } from "../redux/hooks";

export default function Explore({ navigation }) {
  const user = useAppSelector(state => state.user);
  const [isModalVisible, setModalVisible] = useState(false);
  const [videoModal, setVideoModal] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [isEnd, setIsEnd] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetch(GET_EXPLORE_VIDEOS_URL + `?page=${page}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    }).then((response) => response.json())
      .then((json) => {
        setVideos(json.videos);
        setIsEnd(!json.has_next);
      })
      .catch((error) => console.error(error))
  }, []);

  const getMoreVideos = () => {
    if (isEnd || isRefreshing) {
      return;
    }
    setIsRefreshing(true);
    fetch(GET_EXPLORE_VIDEOS_URL + `?page=${page + 1}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    }).then((response) => response.json())
      .then((json) => {
        setVideos([...videos, ...json.videos]);
        setIsEnd(!json.has_next);
        setPage(page + 1);
        setIsRefreshing(false);
      })
      .catch((error) => console.error(error))
  };

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
        onEndReached={getMoreVideos}
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
