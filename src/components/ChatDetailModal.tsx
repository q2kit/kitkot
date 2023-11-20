import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  VirtualizedList,
  TextInput
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import useFirstRender from '../utils/useFirstRender';
import MessageItem from './MessageItem';
import { IconButton } from 'react-native-paper';
import { GET_MESSAGE_URL } from '../config';
import { setInChatScreen } from '../redux/slices/InChatScreenSlice';
import { setMessage } from '../redux/slices/MessageSlice';

export default function ChatDetailModal({ route }) {
  const user = useAppSelector(state => state.user);

  const isFirstRender = useFirstRender();
  const message = useAppSelector(state => state.message);
  const [messageList, setMessageList] = useState([]);
  const dispatch = useAppDispatch();
  const friend = route.params.friend;

  dispatch(setInChatScreen({ friendId: friend.id }));

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

    return () => {
      console.log('Component is unmounted');
      dispatch(setInChatScreen({ friendId: -1 }));
      dispatch(setMessage({}));
    };
  }, []);

  useEffect(() => {
    if (!isFirstRender) {
      if (message.from_user.id == friend.id) {
        if (messageList[messageList.length - 1].id != message.id) {
          setMessageList(pre => {
            pre.push({
              id: message.id,
              content: message.message,
              created_by_self: false,
            });
            return [...pre];
          });
        }
      }
    }
  }, [isFirstRender, message]);

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
    backgroundColor: "#121212",
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
    backgroundColor: "#121212",
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
