import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { convertDatetime } from '../utils/Functions';
import { useNavigation } from '@react-navigation/native';

export default function ChatRecentItem({ friend }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('ChatDetailModal')}>
      <Image style={styles.avatar} source={{ uri: friend.avatar }} />
      <Text style={styles.name}>{friend.name}</Text>
      <View style={styles.messageContainer}>
        <Text style={styles.message} numberOfLines={1} ellipsizeMode="tail">
          {friend.lastMessage.message}
        </Text>
        <Text style={styles.datetime}>
          {convertDatetime(friend.lastMessage.datetime)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
    paddingTop: 5,
    borderBottomWidth: 1,
    backgroundColor: 'transparent',
    borderBottomColor: '#666',
    borderStyle: 'solid',
  },
  avatar: {
    width: 50,
    height: 50,
    position: 'absolute',
    left: 10,
    top: 5,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'blue',
  },
  name: {
    fontSize: 13,
    fontWeight: 'bold',
    position: 'absolute',
    top: 10,
    color: '#fff',
    left: 65,
  },
  messageContainer: {
    flexDirection: 'row',
  },
  message: {
    fontSize: 12,
    marginTop: 30,
    color: '#fff',
    marginLeft: 65,
    maxWidth: '50%',
    minWidth: '50%',
  },
  datetime: {
    fontSize: 9,
    fontWeight: 'bold',
    marginTop: 33,
    color: '#bbb',
    marginLeft: 30,
  },
});
