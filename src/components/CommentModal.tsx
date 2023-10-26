import React, { useEffect, useState } from 'react'
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  TextInput,
} from 'react-native'
import { IconButton } from 'react-native-paper';
import CommentItem from './CommentItem';
import { GET_COMMENTS_URL, POST_COMMENT_URL } from '../config';
import { useAppSelector } from '../redux/hooks';


export default function CommentModal({ video, visible, onClose }) {
  const user = useAppSelector(state => state.user);
  const [inputCommentText, setInputCommentText] = useState('');
  const [comments, setComments] = useState([]);
  
  useEffect(() => {
    fetch(GET_COMMENTS_URL + `?video_id=${video.id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${user.accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setComments(json.comments);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const sendComment = () => {
    const text = inputCommentText.trim();
    setInputCommentText('');
    const fd = new FormData();
    fd.append('video_id', video.id);
    fd.append('content', text);
    fetch(POST_COMMENT_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user.accessToken}`,
      },
      body: fd,
    })
      .then((response) => response.json())
      .then((json) => {
        setComments([json.comment, ...comments]);
      })
      .catch((error) => {
        console.error(error);
      });
  }

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
            <CommentItem key={index} comment={comment} />
          ))}
        </ScrollView>
        <View style={styles.inputCommentContainer}>
          <TextInput
            placeholder='Add a comment...'
            placeholderTextColor='#fff'
            value={inputCommentText}
            onChangeText={(text) => setInputCommentText(text)}
            style={styles.inputComment}
          />
          <IconButton
            icon={require('../assets/send.png')}
            size={30}
            iconColor='#fff'
            onPress={sendComment}
            style={[styles.sendBtn, { display: inputCommentText ? 'flex' : 'none' }]}
          />
        </View>
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
    borderColor: '#999',
    borderBottomWidth: 1,
  },
  commentCount: {
    position: 'absolute',
    width: '100%',
    color: '#fff',
    textAlign: 'center',
    fontSize: 11,
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
  },
  inputCommentContainer: {
    width: '98%',
    paddingLeft: 10,
    borderRadius: 10,
    borderColor: '#999',
    borderWidth: 1,
    backgroundColor: '#303030',
    margin: '1%',
  },
  inputComment: {
    color: '#fff',
    paddingRight: 40,
  },
  sendBtn: {
    position: 'absolute',
    right: 0,
    bottom: -6,
  },
})