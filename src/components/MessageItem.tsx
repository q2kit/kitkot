import React from 'react';
import { Image, View, Text, Pressable, StyleSheet } from 'react-native';

export default function MessageItem({ message }: { message: any }) {
  const isSend = message.isSend;
  return (
    <View
      style={[
        styles.root,
        isSend ? styles.myMessageWrap : styles.otherMessageWrap,
      ]}>
      <Image
        style={styles.avatar}
        source={{
          uri: 'https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-de-thuong.jpg',
        }}
      />
      <View>
        <Pressable
          style={[
            styles.message,
            isSend ? styles.myMessage : styles.otherMessage,
            message.isLoading ? { opacity: 0.4 } : null,
          ]}>
          {message.text && (
            <Text
              style={isSend ? styles.textMyMessage : styles.textOtherMessage}>
              {message.text}
            </Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    marginHorizontal: 15,
    marginVertical: 10,
    alignItems: 'flex-end',
  },

  myMessageWrap: {
    flexDirection: 'row-reverse',
  },
  otherMessageWrap: {
    flexDirection: 'row',
  },

  message: {
    borderRadius: 15,
    maxWidth: 250,
    marginHorizontal: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  myMessage: {
    backgroundColor: 'red',
  },
  otherMessage: {
    backgroundColor: 'blue',
  },
  textMyMessage: {
    // color: "",
  },
  textOtherMessage: {
    // color: CONFIG.color.text,
  },

  avatar: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },

  mediaWrap: {
    marginVertical: 10,
  },
  image: {
    width: 200,
    height: 130,
    borderRadius: 10,
  },

  messageReply: {
    maxWidth: 230,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: 'blue',
    opacity: 0.4,
    borderRadius: 12,
    left: 10,
    top: 5,
  },
});
