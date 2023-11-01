import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout, setUser } from '../redux/slices/UserSlice';
import { SwitchSettingItem, DetailSettingItem } from "../components/SettingItem";
import axios from "axios";
import { SETTINGS_URL } from "../config";

export default function Settings({ navigation }) {
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const [messageNotification, setMessageNotification] = useState(user.messageNotification);
  const [likeNotification, setLikeNotification] = useState(user.likeNotification);
  const [commentNotification, setCommentNotification] = useState(user.commentNotification);
  const [showLikedVideos, setShowLikedVideos] = useState(user.showLikedVideos);
  const [showWatchedVideos, setShowWatchedVideos] = useState(user.showWatchedVideos);

  const handleLogout = () => {
    dispatch(logout());
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  useEffect(() => {
    const fd = new FormData();
    fd.append("show_liked_videos", showLikedVideos ? "true" : "false");
    fd.append("show_watched_videos", showWatchedVideos ? "true" : "false");
    fd.append("message_notification", messageNotification ? "true" : "false");
    fd.append("like_notification", likeNotification ? "true" : "false");
    fd.append("comment_notification", commentNotification ? "true" : "false");
    axios.post(SETTINGS_URL, fd, {
      headers: {
        'Authorization': `Bearer ${user.accessToken}`,
      },
    });
    dispatch(setUser({
      messageNotification: messageNotification,
      likeNotification: likeNotification,
      commentNotification: commentNotification,
      showLikedVideos: showLikedVideos,
      showWatchedVideos: showWatchedVideos,
    }));
  }, [messageNotification, likeNotification, commentNotification, showLikedVideos, showWatchedVideos]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <SwitchSettingItem
        title="Message Notification"
        state={messageNotification}
        onPress={() => { setMessageNotification(!messageNotification) }}
      />
      <SwitchSettingItem
        title="Like Notification"
        state={likeNotification}
        onPress={() => { setLikeNotification(!likeNotification) }}
      />
      <SwitchSettingItem
        title="Comment Notification"
        state={commentNotification}
        onPress={() => { setCommentNotification(!commentNotification) }}
      />
      <SwitchSettingItem
        title="Show Liked Videos"
        state={showLikedVideos}
        onPress={() => { setShowLikedVideos(!showLikedVideos) }}
      />
      <SwitchSettingItem
        title="Show Watched Videos"
        state={showWatchedVideos}
        onPress={() => { setShowWatchedVideos(!showWatchedVideos) }}
      />
      <DetailSettingItem
        title="Edit Profile"
        icon={require('../assets/edit-profile.png')}
        onPress={() => { navigation.navigate('EditProfile') }}
      />
      <DetailSettingItem
        title="Premium"
        icon={require('../assets/right-chevron.png')}
        onPress={() => { navigation.navigate('Premium') }}
      />
      <DetailSettingItem
        title="Logout"
        icon={require('../assets/logout.png')}
        onPress={handleLogout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    padding: 10,
    paddingTop: 30,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20
  }
});
