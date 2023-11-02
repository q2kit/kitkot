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

const dataListMess: any[] = [
  {
    id: 27,
    text: 'Hello 123 123',
    isSend: true,
    files: [
      'https://anhdep123.com/wp-content/uploads/2021/05/gai-xinh-di-hoc-dep.jpg',
    ],
  },
  {
    id: 28,
    text: 'Hello 123 123',
    isSend: false,
    files: [
      'https://anhdep123.com/wp-content/uploads/2021/05/gai-xinh-di-hoc-dep.jpg',
      'https://vnn-imgs-a1.vgcloud.vn/icdn.dantri.com.vn/2021/06/20/thieu-nu-ha-thanh-xinh-xan-dien-do-goi-cam-thieu-dot-moi-anh-nhindocx-1624197299847.png',
      'https://anhdep123.com/wp-content/uploads/2021/05/gai-xinh-di-hoc-dep.jpg',
    ],
  },
  {
    id: 29,
    text: 'Cô ấy độc thân nhưng không có nghĩa bạn có cửa',
    isSend: false,
  },
  {
    id: 30,
    text: 'Hello 123 123',
    isSend: false,
  },
  {
    id: 31,
    text: 'Cô ấy độc thân nhưng không có nghĩa bạn có cửa 🙂',
    isSend: true,
    files: [
      'https://vnn-imgs-a1.vgcloud.vn/icdn.dantri.com.vn/2021/06/20/thieu-nu-ha-thanh-xinh-xan-dien-do-goi-cam-thieu-dot-moi-anh-nhindocx-1624197299847.png',
    ],
  },
  {
    id: 32,
    text: 'Hello 123 123',
    isSend: false,
  },
  {
    id: 33,
    text: 'Cô ấy độc thân,nhưng không có nghĩa bạn có cửa 🙂',
    isSend: false,
  },
  {
    id: 34,
    text: 'Hello 123 123',
    isSend: true,
  },
  {
    id: 1,
    text: 'Hello 123 123',
    isSend: true,
    files: [
      'https://anhdep123.com/wp-content/uploads/2021/05/gai-xinh-di-hoc-dep.jpg',
    ],
  },
  {
    id: 2,
    text: 'Hello 123 123',
    isSend: false,
  },
  {
    id: 3,
    text: 'Hello 123 123',
    isSend: false,
  },
  {
    id: 4,
    text: 'Hello 123 123',
    isSend: true,
  },
  {
    id: 5,
    text: 'Hello 123 123',
    isSend: false,
  },
  {
    id: 6,
    text: 'Hello 123 123',
    isSend: true,
  },
  {
    id: 7,
    text: 'Hello 123 123',
    isSend: false,
  },
  {
    id: 8,
    text: 'Hello 123 123',
    isSend: false,
  },
  {
    id: 9,
    text: 'Hello 123 123',
    isSend: false,
  },
  {
    id: 10,
    text: 'Hello 123 123',
    isSend: true,
  },
  {
    id: 11,
    text: 'Hello 123 123',
    isSend: false,
  },
  {
    id: 12,
    text: 'Hello 123 123',
    isSend: false,
  },
  {
    id: 13,
    text: 'Hello 123 123',
    isSend: true,
  },
  {
    id: 14,
    text: 'Hello 123 123',
    isSend: true,
  },
  {
    id: 15,
    text: 'Hello 123 123',
    isSend: false,
  },
  {
    id: 16,
    text: 'Hello 123 123',
    isSend: false,
  },
  {
    id: 17,
    text: 'Hello 123 123',
    isSend: true,
  },
  {
    id: 18,
    text: 'Hello 123 123',
    isSend: false,
  },
  {
    id: 19,
    text: 'Hello 123 123',
    isSend: true,
    files: [
      'https://anhdep123.com/wp-content/uploads/2021/05/gai-xinh-di-hoc-dep.jpg',
    ],
  },
  {
    id: 20,
    text: 'Hello 123 123',
    isSend: false,
    files: [
      'https://anhdep123.com/wp-content/uploads/2021/05/gai-xinh-di-hoc-dep.jpg',
      'https://vnn-imgs-a1.vgcloud.vn/icdn.dantri.com.vn/2021/06/20/thieu-nu-ha-thanh-xinh-xan-dien-do-goi-cam-thieu-dot-moi-anh-nhindocx-1624197299847.png',
      'https://anhdep123.com/wp-content/uploads/2021/05/gai-xinh-di-hoc-dep.jpg',
    ],
  },
  {
    id: 21,
    text: 'Cô ấy độc thân nhưng không có nghĩa bạn có cửa',
    isSend: false,
  },
  {
    id: 22,
    text: 'Hello 123 123',
    isSend: false,
  },
  {
    id: 23,
    text: 'Cô ấy độc thân nhưng không có nghĩa bạn có cửa 🙂',
    isSend: true,
    files: [
      'https://vnn-imgs-a1.vgcloud.vn/icdn.dantri.com.vn/2021/06/20/thieu-nu-ha-thanh-xinh-xan-dien-do-goi-cam-thieu-dot-moi-anh-nhindocx-1624197299847.png',
    ],
  },
  {
    id: 24,
    text: 'Hello 123 123',
    isSend: false,
  },
  {
    id: 25,
    text: 'Cô ấy độc thân,nhưng không có nghĩa bạn có cửa 🙂',
    isSend: false,
  },
  {
    id: 26,
    text: 'Hello 123 123',
    isSend: true,
  },
];

export default function ChatDetailModal() {
  const isFirstRender = useFirstRender();
  const notification = useAppSelector(state => state.notification);
  const [messageList, setMessageList] = useState<any[]>(dataListMess);

  useEffect(() => {
    if (!isFirstRender) {
      const idTmp = Math.random() * 1000;
      setMessageList(pre => {
        pre.unshift({ id: idTmp, text: notification.title });
        return [...pre];
      });
    }
  }, [isFirstRender, notification]);
  const getItem = useCallback((data: any[], index: number) => data[index], []);
  const getItemCount = useCallback((data: any[]) => data.length, []);

  return (
    <View style={styles.container}>
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
