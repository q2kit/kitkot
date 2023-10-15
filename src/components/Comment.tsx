import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { convertDatetime } from "../utils/Functions";

export default function Comment({ comment }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={{ uri: comment.owner.avatar }}
      ></Image>
      <Text style={styles.name}>{comment.owner.name}</Text>
      <Text style={styles.comment}>{comment.comment}</Text>
      <Text style={styles.datetime}>{convertDatetime(comment.datetime)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
    paddingTop: 5,
    borderBottomWidth: 1,
    backgroundColor: 'transparent',
    borderBottomColor: '#000',
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
  comment: {
    fontSize: 12,
    marginTop: 30,
    color: '#fff',
    marginLeft: 65,
    flexWrap: 'wrap',
  },
  datetime: {
    fontSize: 9,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#bbb',
    marginLeft: 65,
  },
});