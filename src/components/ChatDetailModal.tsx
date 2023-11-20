import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  VirtualizedList,
  TextInput
} from 'react-native';
import { useAppSelector } from '../redux/hooks';
import useFirstRender from '../utils/useFirstRender';
import MessageItem from './MessageItem';
import { IconButton } from 'react-native-paper';
import { GET_MESSAGE_URL } from '../config';
import { setInChatScreen } from '../redux/slices/InChatScreenSlice';

export default function ChatDetailModal({ route }) {
  const user = useAppSelector(state => state.user);

  const isFirstRender = useFirstRender();
  const notification = useAppSelector(state => state.notification);
  const [messageList, setMessageList] = useState([]);
  const friend = route.params.friend;
  console.log("friend", friend);

  setInChatScreen({ friendId: friend.id });

  useEffect(() => {
    fetch(GET_MESSAGE_URL + `?friend_id=${friend.id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + user.accessToken,
        },
      }).then(res => res.json())
      .then(res => {
        setMessageList(res.messages);
      });
  }, []);

  useEffect(() => {
    if (!isFirstRender) {
      console.log("notification", notification);
      console.log("friend", friend);
      if (notification.from_user_id === friend.id) {
        setMessageList(pre => {
          pre.unshift({ id: notification.id, content: notification.body });
          return [...pre];
        });
      }
    }
  }, [isFirstRender, notification]);

  const getItem = useCallback((data: any[], index: number) => data[index], []);
  const getItemCount = useCallback((data: any[]) => data.length, []);

  return (
    <View style={styles.container}>
      {messageList && (
        <VirtualizedList
          inverted
          data={messageList}
          showsVerticalScrollIndicator={false}
          initialNumToRender={20}
          renderItem={({ item }) => <MessageItem message={item} />}
          keyExtractor={item => item.id}
          getItemCount={getItemCount}
          getItem={getItem}
        />
      )}
      <View
        style={styles.inputContainer}
      >
        <TextInput
          placeholder="Aa"
          style={styles.input}
        />
        <IconButton
          icon={require('../assets/send.png')}
          style={styles.sendIcon}
          size={20}
          onPress={() => { }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#303030',
  },
  input: {
    flex: 1,
    backgroundColor: '#000',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
  sendIcon: {
    backgroundColor: '#fff',
    borderRadius: 20,
  },
});
