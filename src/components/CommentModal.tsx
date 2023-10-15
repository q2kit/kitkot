import React from 'react'
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { IconButton } from 'react-native-paper';
import Comment from './Comment';


export default function CommentModal({ video, visible, onClose }) {
  const comments = [
    {
      owner: video.owner,
      comment: "Example commentExample commentExample commentExample commentExample commentExample commentExample commentExample comment",
      datetime: "2022-10-15 10:00:00",
    },
    {
      owner: video.owner,
      comment: "Example comment",
      datetime: "2023-10-15 20:00:00",
    },
    {
      owner: video.owner,
      comment: "Example comment",
      datetime: "2023-10-15 10:00:00",
    },
    {
      owner: video.owner,
      comment: "Example comment",
      datetime: "2023-10-15 10:00:00",
    },
    {
      owner: video.owner,
      comment: "Example comment",
      datetime: "2023-10-15 10:00:00",
    },
    {
      owner: video.owner,
      comment: "Example comment",
      datetime: "2023-10-15 10:00:00",
    },
    {
      owner: video.owner,
      comment: "Example comment",
      datetime: "2023-10-15 10:00:00",
    },
    {
      owner: video.owner,
      comment: "Example comment",
      datetime: "2023-10-15 10:00:00",
    },
    {
      owner: video.owner,
      comment: "Example comment",
      datetime: "2023-10-15 10:00:00",
    },
    {
      owner: video.owner,
      comment: "Example comment",
      datetime: "2023-10-15 10:00:00",
    },
    {
      owner: video.owner,
      comment: "Example comment",
      datetime: "2023-10-15 10:00:00",
    },
  ]

  return (
    <Modal
      visible={visible}
      animationType='slide'
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.closeModal} />
      </TouchableWithoutFeedback>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.commentCount}>{video.comments} comments</Text>
          <TouchableWithoutFeedback onPress={onClose}>
            <IconButton
              icon={require('../assets/close.png')}
              size={25}
              onPress={onClose}
              style={styles.closeBtn}
            />
          </TouchableWithoutFeedback>
        </View>
        <ScrollView style={styles.commentContainer}>
          {comments.map((comment, index) => (
            <Comment key={index} comment={comment} />
          ))}
        </ScrollView>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  closeModal: {
    height: '20%',
    backgroundColor: 'transparent',
  },
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%',
    backgroundColor: '#101010',
  },
  header: {
    height: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  commentCount: {
    position: 'absolute',
    width: '100%',
    color: '#fff',
    textAlign: 'center',
  },
  closeBtn: {
    position: 'absolute',
    right: 0,
    marginRight: 0,
  },
  commentContainer: {
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
  }
})