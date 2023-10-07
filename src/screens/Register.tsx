import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Text, View, Button, TextInput} from 'react-native';
import {useAppDispatch} from '../redux/hooks';
import {setUser} from '../redux/slices/UserSlice';

function LoginScreen() {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const [loginValues, setLoginValues] = useState({
    login_id: '',
    password: '',
  });

  const handleLogin = () => {
    console.log('handleLogin', loginValues);

    dispatch(setUser({accessToken: 'abc', name: 'Son'}));
    navigation.navigate('BottomTab');
  };

  return (
    <View>
      <Text>LoginScreen</Text>

      <TextInput
        placeholder="Ten asdsd"
        onChangeText={text => setLoginValues({...loginValues, login_id: text})}
        value={loginValues.login_id}
      />

      <TextInput
        placeholder="Mat khau"
        onChangeText={text => setLoginValues({...loginValues, password: text})}
        value={loginValues.password}
      />

      <Button onPress={handleLogin} title="LLogin" color="#841584" />
    </View>
  );
}

export default LoginScreen;
