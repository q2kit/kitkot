import React, {useState, useCallback, useRef, useEffect, memo} from 'react';
import {
  Animated,
  Keyboard,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {
  Asset,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

interface IInputMessage {
  handleSendMess: (text?: string, messageReply?: any) => void;
  setFiles: (files?: Asset[]) => void;
}

function InputMessage(props: IInputMessage) {
  const {handleSendMess, setFiles} = props;

  const widthIconMediaWrap = useRef(new Animated.Value(83)).current;
  const widthIconOpenMedia = useRef(new Animated.Value(0)).current;
  const inputRef = useRef<TextInput>(null);

  const [text, setText] = useState<string>();

  // animated icon media
  const show = useCallback(() => {
    Animated.timing(widthIconMediaWrap, {
      toValue: 83,
      duration: 100,
      delay: 50,
      useNativeDriver: false,
    }).start();

    Animated.timing(widthIconOpenMedia, {
      toValue: 0,
      duration: 50,
      useNativeDriver: false,
    }).start();
  }, [widthIconMediaWrap, widthIconOpenMedia]);

  const hide = useCallback(() => {
    Animated.timing(widthIconMediaWrap, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }).start();

    Animated.timing(widthIconOpenMedia, {
      toValue: 33,
      delay: 100,
      duration: 50,
      useNativeDriver: false,
    }).start();
  }, [widthIconMediaWrap, widthIconOpenMedia]);
  //

  // listener keyboard
  useEffect(() => {
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      show();
    });

    return () => {
      hideSubscription.remove();
    };
  }, [show]);
  //

  // send mess text
  const handleTransmissionMess = () => {
    handleSendMess(text);
    setText(undefined);
    setFiles(undefined);
  };
  //

  // get image and camera
  const pickerMedia = useCallback(
    () =>
      launchImageLibrary(
        {
          mediaType: 'mixed',
          selectionLimit: 100,
        },
        res => setFiles(res.assets),
      ),
    [setFiles],
  );

  const openCamera = () =>
    launchCamera(
      {
        mediaType: 'photo',
      },
      res => setFiles(res.assets),
    );
  //

  return (
    <View style={styles.root}>
      <View style={styles.inputWrap}>
        <Animated.View style={[styles.leftIcon, {width: widthIconMediaWrap}]}>
          <Pressable onPress={openCamera}>
            <IconFontAwesome5
              name="camera"
              size={23}
              color={'red'}
              style={styles.iconMedia}
            />
          </Pressable>
          <Pressable onPress={pickerMedia}>
            <IconFontAwesome5
              name="image"
              size={26}
              color={'red'}
              style={styles.iconMedia}
            />
          </Pressable>
        </Animated.View>

        <Animated.View style={{width: widthIconOpenMedia}}>
          <Pressable onPress={show}>
            <IconFontAwesome5
              name="chevron-right"
              size={23}
              color={'red'}
              style={styles.iconMedia}
            />
          </Pressable>
        </Animated.View>

        <TextInput
          ref={inputRef}
          placeholder="Nhắn tin"
          style={styles.input}
          value={text}
          onChangeText={setText}
          multiline={true}
          onFocus={hide}
        />

        <Pressable onPress={handleTransmissionMess}>
          <IconIonicons
            name="send"
            size={25}
            color="red"
            style={styles.iconMedia}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {},

  messageReplyWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'red',
    borderRadius: 15,
    marginBottom: 10,
  },
  messageReply: {
    width: 180,
    color: 'red',
  },

  inputWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  leftIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconMedia: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    marginBottom: 2,
  },
  input: {
    flex: 1,
    marginHorizontal: 7,
    color: '#fff',
  },
});

export default memo(InputMessage);
