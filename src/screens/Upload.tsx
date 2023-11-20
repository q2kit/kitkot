import React, { useState } from 'react';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
  Button,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useFocusEffect } from '@react-navigation/native';
import Video from 'react-native-video';
import { IconButton } from 'react-native-paper';
import { UPLOAD_VIDEO_URL } from '../config';
import { useAppSelector } from '../redux/hooks';

export default function VideoUploadScreen({ navigation }) {
  const user = useAppSelector(state => state.user);
  const [video, setVideo] = useState({
    uri: '',
    type: '',
    name: '',
    size: '',
  });
  const [isPlaying, setIsPlaying] = useState(true);
  const [isShowDetailUpload, setIsShowDetailUpload] = useState(false);
  const [description, setDescription] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.video],
      });
      setVideo(result[0]);
      setIsPlaying(true);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        if (!video.uri) {
          navigation.goBack();
        }
      } else {
        throw err;
      }
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      if (!video.uri) {
        pickDocument();
      }
    }, [])
  );
  const nextHandler = () => {
    setIsPlaying(false);
    setIsShowDetailUpload(true);
  };
  const uploadHandler = () => {
    setIsUploading(true);
    setIsShowDetailUpload(false);
    const formData = new FormData();
    formData.append('video', {
      uri: video.uri,
      type: video.type,
      name: video.name,
      size: video.size,
    });
    formData.append('description', description);
    formData.append('is_premium', isPremium);
    formData.append('is_private', isPrivate);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${user.accessToken}`,
      },
    };
    axios.post(UPLOAD_VIDEO_URL, formData, config)
      .then((res) => {
        setIsUploading(false);
        navigation.navigate('Profile');
      })
      .catch((err) => {
        setIsUploading(false);
      });
  };
  return (
    <View
      style={styles.container}
    >
      {video.uri && (
        <TouchableHighlight
          onPress={() => setIsPlaying(!isPlaying)}
          activeOpacity={1}
        >
          <View style={styles.container}>
            <Video
              source={{ uri: video.uri }}
              style={styles.video}
              controls={false}
              resizeMode="contain"
              repeat={true}
              paused={!isPlaying}
            />
            {!isPlaying && (
              <IconButton
                icon={require('../assets/play.png')}
                size={70}
                style={styles.playBtn}
                iconColor='#eee'
              />
            )}
          </View>
        </TouchableHighlight>
      )}
      <IconButton
        icon={require('../assets/close.png')}
        size={25}
        onPress={navigation.goBack}
        style={[styles.closeBtn, { display: (video && !isShowDetailUpload) ? 'flex' : 'none' }]}
      />
      <TouchableWithoutFeedback
        onPress={nextHandler}
      >
        <Image
          source={require('../assets/next.png')}
          style={[styles.nextBtn, { display: (video && !isShowDetailUpload) ? 'flex' : 'none' }]}
        />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={pickDocument}
      >
        <Image
          source={require('../assets/reload.png')}
          style={[styles.reloadBtn, { display: (video && !isShowDetailUpload) ? 'flex' : 'none' }]}
        />
      </TouchableWithoutFeedback>

      <Modal
        visible={isShowDetailUpload}
        animationType='slide'
        transparent={true}
        onRequestClose={() => setIsShowDetailUpload(false)}
        style={styles.modal}
      >
        <TouchableWithoutFeedback onPress={() => setIsShowDetailUpload(false)}>
          <View style={styles.excludeAreaTop} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Video details</Text>
            <IconButton
              icon={require('../assets/close.png')}
              size={25}
              iconColor='#aaa'
              onPress={() => setIsShowDetailUpload(false)}
              style={styles.closeModalBtn}
            />
          </View>
          <View style={styles.description}>
            <TextInput
              placeholder='Add a caption'
              placeholderTextColor='#fff'
              value={description}
              onChangeText={(text) => setDescription(text)}
              style={styles.descriptionInput}
            />
          </View>
          <View
            style={{ flexDirection: 'row' }}
          >
            <View style={styles.private}>
              <Text style={styles.privateLabel}>Private</Text>
              <CheckBox
                value={isPrivate}
                style={styles.checkbox}
                onValueChange={() => setIsPrivate(!isPrivate)}
              />
            </View>
            <View style={styles.premium}>
              <Text style={styles.premiumLabel}>Premium</Text>
              <CheckBox
                value={isPremium}
                style={styles.checkbox}
                onValueChange={() => setIsPremium(!isPremium)}
              />
            </View>
          </View>
          <View
            style={styles.uploadBtn}
          >
            <Button
              title='Upload'
              onPress={uploadHandler}
            />
          </View>
        </View>
        <TouchableWithoutFeedback onPress={() => setIsShowDetailUpload(false)}>
          <View style={styles.excludeAreaBottom} />
        </TouchableWithoutFeedback>
      </Modal>
      <View
        style={[styles.loading, { display: isUploading ? 'flex' : 'none' }]}
      >
        <Image
          source={require('../assets/loading.gif')}
          style={{ width: 40, height: 40, marginBottom: 10 }}
        />
        <Text>Uploading...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: "#121212",
  },
  video: {
    flex: 1,
  },
  closeBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  playBtn: {
    width: 70,
    height: 70,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -35,
    marginTop: -35,
    opacity: 0.8,
  },
  nextBtn: {
    width: 50,
    height: 50,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  reloadBtn: {
    width: 50,
    height: 50,
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
    marginBottom: 5,
  },
  closeModalBtn: {
    position: 'absolute',
    top: -8,
    right: -8,
  },
  excludeAreaTop: {
    width: '100%',
    height: '20%',
  },
  excludeAreaBottom: {
    width: '100%',
    height: '20%',
  },
  modal: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    elevation: 2,
  },
  modalContainer: {
    height: '60%',
    backgroundColor: "#121212",
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 20,
    opacity: 0.9,
  },
  description: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  descriptionInput: {
    width: '90%',
    height: 100,
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  private: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    height: 50,
  },
  privateLabel: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  premium: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  premiumLabel: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  checkbox: {
    flex: 1,
  },
  uploadBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: "#121212",
    opacity: 0.9,
    alignItems: 'center',
    elevation: 1,
  },
});
