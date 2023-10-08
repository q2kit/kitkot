import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, ToastAndroid } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import RegistrationHeader from '../components/RegistrationHeader'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { theme } from '../core/theme'
import { LOGIN_URL } from '../config'
import axios from 'axios'
import { setUser } from '../redux/slices/UserSlice';
import { useAppDispatch } from '../redux/hooks'


export default function Login({ navigation }) {
  const [login_id, setLogin_id] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useAppDispatch();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onLoginPressed = () => {
    if (login_id.value.length === 0) {
      setLogin_id({ ...login_id, error: 'Login ID is required' })
      return
    }
    if (password.value.length === 0) {
      setPassword({ ...password, error: 'Password is required' })
      return
    }

    const fd = new FormData();
    fd.append('login_id', login_id.value);
    fd.append('password', password.value);
    axios.post(LOGIN_URL, fd)
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
          if (error.response.data.fields.login_id) {
            setLogin_id({ ...login_id, error: error.response.data.fields.login_id })
          }
          if (error.response.data.fields.password) {
            setPassword({ ...password, error: error.response.data.fields.password })
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
      <RegistrationHeader>Welcome back</RegistrationHeader>
      <TextInput
        label="Login ID"
        returnKeyType="next"
        value={login_id.value}
        onChangeText={(text) => setLogin_id({ value: text, error: '' })}
        error={!!login_id.error}
        errorText={login_id.error}
        autoCapitalize="none"
        description="Username/Email or Phone Number"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry={!showPassword}
        onIconPress={toggleShowPassword}
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  icon: {
    marginLeft: 10,
  },
})
