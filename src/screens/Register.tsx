import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import RegistrationHeader from '../components/RegistrationHeader'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { theme } from '../core/theme'
import { useAppDispatch } from '../redux/hooks';
import { setUser } from '../redux/slices/UserSlice';
import axios from 'axios';
import { REGISTER_URL } from '../config';


export default function Register({ navigation }) {
  const [username, setUsername] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useAppDispatch();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSignUpPressed = () => {
    if (username.value.length === 0) {
      setUsername({ ...username, error: 'Username is required' })
      return
    }
    if (password.value.length === 0) {
      setPassword({ ...password, error: 'Password is required' })
      return
    }
    if (name.value.length === 0) {
      setName({ ...name, error: 'Name is required' })
      return
    }
    if (email.value.length === 0) {
      setEmail({ ...email, error: 'Email is required' })
      return
    }

    const fd = new FormData();
    fd.append('username', username.value);
    fd.append('password', password.value);
    fd.append('email', email.value);
    fd.append('name', name.value);
    axios.post(REGISTER_URL, fd)
      .then(response => {
        const user = {
          accessToken: response.data.token,
          name: response.data.user.name,
          id: response.data.user.id,
        };
        dispatch(setUser(user));
        navigation.reset({
          index: 0,
          routes: [{ name: 'BottomTab' }],
        })
      })
      .catch(error => {
        if (error.response.data.fields) {
          if (error.response.data.fields.username) {
            setUsername({ ...username, error: error.response.data.fields.username })
          }
          if (error.response.data.fields.password) {
            setPassword({ ...password, error: error.response.data.fields.password })
          }
          if (error.response.data.fields.email) {
            setEmail({ ...email, error: error.response.data.fields.email })
          }
          if (error.response.data.fields.name) {
            setName({ ...name, error: error.response.data.fields.name })
          }
        }
        else if (error.response.data.message) {
          ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
        }
        else {
          ToastAndroid.show(error, ToastAndroid.SHORT);
        }
      });
  }

  return (
    <Background>
      <Logo />
      <RegistrationHeader>Create your account</RegistrationHeader>
      <TextInput
        label="Username"
        returnKeyType="next"
        value={username.value}
        onChangeText={(text) => setUsername({ value: text, error: '' })}
        error={!!username.error}
        errorText={username.error}
      />
      <TextInput
        label="Password"
        returnKeyType="next"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry={!showPassword}
        onIconPress={toggleShowPassword}
      />
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Email"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={navigation.goBack}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
