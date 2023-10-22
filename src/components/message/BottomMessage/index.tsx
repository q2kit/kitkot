import React, {memo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Asset} from 'react-native-image-picker';
import InputMessage from './InputMessage';
import PreviewMedia from './PreviewMedia';

interface IBottomMessageProps {
  setMessageList: React.Dispatch<React.SetStateAction<any[]>>;
}

function BottomMessage(props: IBottomMessageProps) {
  const {setMessageList} = props;

  const [files, setFiles] = useState<Asset[]>();

  const handleSendMessagse = (text?: string) => {
    // const dataSend: IDataMessageSend = {
    //   text: text,
    //   files: files,
    // };

    const idTmp = Math.random() * 100;
    const dataSendDisplay: any = {
      id: idTmp,
      text: text,
      isSend: true,
      files: files?.map(file => file.uri ?? ''),
      isLoading: true,
    };

    setMessageList(pre => {
      pre.unshift(dataSendDisplay);
      return [...pre];
    });

    // fake time delay call api
    setTimeout(() => {
      setMessageList(pre => {
        const newMessageList = pre.map(mess => {
          if (mess.id === idTmp) {
            return {...mess, isLoading: false};
          }
          return mess;
        });
        return newMessageList;
      });
    }, 2000);
  };

  return (
    <View style={styles.root}>
      <InputMessage handleSendMess={handleSendMessagse} setFiles={setFiles} />
      <PreviewMedia files={files} setFiles={setFiles} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'green',
  },
});

export default memo(BottomMessage);
