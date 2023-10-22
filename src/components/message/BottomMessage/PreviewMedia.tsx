import React, {memo} from 'react';
import {FlatList, Image, Pressable, View} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {Asset} from 'react-native-image-picker';

interface IPreviewItem {
  files?: Asset[];
  setFiles: (files?: Asset[]) => void;
}

const PreviewItem = ({
  item,
  handleRemoveFile,
}: {
  item: Asset;
  handleRemoveFile: () => void;
}) => {
  return (
    <View style={styles.previewItem}>
      <Image
        style={styles.image}
        source={{
          uri: item.uri,
        }}
      />
      <Pressable style={styles.iconRemoveMedia} onPress={handleRemoveFile}>
        <IconAntDesign name="closecircle" color="red" size={20} />
      </Pressable>
    </View>
  );
};

function PreviewMedia(props: IPreviewItem) {
  const {files, setFiles} = props;

  if (!files) {
    return null;
  }

  const handleRemoveFile = (indexDelete: number) => {
    const newFiles = files.filter((item, index) => index !== indexDelete);
    setFiles(newFiles);
  };

  return (
    <FlatList
      style={styles.root}
      data={files}
      horizontal
      renderItem={({item, index}) => (
        <PreviewItem
          item={item}
          handleRemoveFile={() => handleRemoveFile(index)}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
    />
  );
}

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {
    marginHorizontal: 5,
  },
  previewItem: {
    position: 'relative',
    marginHorizontal: 5,
    paddingTop: 10,
    paddingBottom: 5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  iconRemoveMedia: {
    width: 20,
    position: 'absolute',
    top: 2,
    right: -5,
    padding: 0,
  },
});

export default memo(PreviewMedia);
