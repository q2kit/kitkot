import React, {memo} from 'react';
import {Image, View, Text, Pressable} from 'react-native';
import styles from './styles';

function Message({message}: {message: any}) {
  const isSend = message.isSend;

  //   const dispatch = useAppDispatch();

  //   const navigation = useNavigation();

  const openModalView = (uri: string) => {
    // navigation.navigate('MediaViewScreen', {uri: uri});
  };

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
            message.isLoading ? {opacity: 0.4} : null,
          ]}>
          {message.text && (
            <Text
              style={isSend ? styles.textMyMessage : styles.textOtherMessage}>
              {message.text}
            </Text>
          )}

          {message.files?.map((file: string, index: number) => {
            return (
              <Pressable
                key={index}
                style={styles.mediaWrap}
                onPress={() => openModalView(file)}>
                <Image
                  resizeMode="contain"
                  style={styles.image}
                  source={{
                    uri: file,
                  }}
                />
              </Pressable>
            );
          })}
        </Pressable>
      </View>
    </View>
  );
}

export default memo(Message);
