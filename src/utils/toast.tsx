import Toast from 'react-native-toast-message';

const showToastSuccess = (title: string, des?: string) => {
  Toast.show({
    type: 'success',
    text1: title,
    text2: des,
  });
};

export {showToastSuccess};
