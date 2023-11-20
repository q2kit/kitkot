import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput } from 'react-native';
import FriendItem from '../components/FriendItem';
import ChatRecentItem from '../components/ChatRecentItem';
import { GET_FRIENDS_URL, GET_RECENT_CHATS_URL } from '../config';
import { useAppSelector } from '../redux/hooks';

export default function Chat({ navigation }) {
  const user = useAppSelector(state => state.user);
  const [friendList, setFriendList] = useState([]);

  useEffect(() => {
    fetch(GET_FRIENDS_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.accessToken,
      },
    }).then((response) => response.json())
      .then((json) => {
        setFriendList(json.friends);
      })
      .catch((error) => console.error(error));
  }, []);

  const [getRecentMessage, setRecentMessage] = useState([]);

  useEffect(() => {
    fetch(GET_RECENT_CHATS_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.accessToken,
      },
    }).then((response) => response.json())
      .then((json) => {
        setRecentMessage(json.recent_chats);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          placeholderTextColor="#fff"
        />
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollViewFriendActive}>
        {friendList.map((friend, index) => (
          <FriendItem
            key={index}
            friend={friend}
            onPress={() => navigation.navigate('ChatDetailModal', { friend })}
          />
        ))}
      </ScrollView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollViewChatRecent}>
        {getRecentMessage.map((friend, index) => (
          <ChatRecentItem key={index} friend={friend} />
        ))}
        <View style={{ height: 10 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    width: '100%',
    height: '100%',
  },
  search: {
    marginTop: 10,
    width: "100%",
    height: 50,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    width: '90%',
    color: '#fff',
    height: 40,
    backgroundColor: '#333',
    borderRadius: 5,
    paddingLeft: 30,
  },
  searchIcon: {},
  scrollViewFriendActive: {
    width: '100%',
    maxHeight: 70,
    minHeight: 70,
    backgroundColor: '#000',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  scrollViewChatRecent: {
    paddingTop: 10,
    marginTop: 2,
  },
});
