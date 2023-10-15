import React, { useState } from 'react'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import Logo from '../components/Logo'
import RegistrationHeader from '../components/RegistrationHeader'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { StyleSheet, ToastAndroid } from 'react-native'
import axios from 'axios'
import { RESET_PASSWORD_URL } from '../config';

export default function ResetPassword({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [otp, setOtp] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [isSentOtp, setIsSentOtp] = useState(false)
  const sendResetPasswordEmail = () => {
    if (email.value.length === 0) {
      setEmail({ ...email, error: 'Email is required' })
      return
    }
    const fd = new FormData();
    fd.append('email', email.value);
    axios.post(RESET_PASSWORD_URL, fd)
      .then(response => {
        ToastAndroid.show("OTP code sent to your email address.", ToastAndroid.SHORT);
        setIsSentOtp(true);
      })
      .catch(error => {
        ToastAndroid.show(error.response.data.message, ToastAndroid.LONG);
      });
  }

  const submitResetPassword = () => {
    if (otp.value.length === 0) {
      setOtp({ ...otp, error: 'OTP code is required' })
      return
    }
    if (password.value.length === 0) {
      setPassword({ ...password, error: 'Password is required' })
      return
    }
    const fd = new FormData();
    fd.append('email', email.value);
    fd.append('otp', otp.value);
    fd.append('new_password', password.value);
    axios.post(RESET_PASSWORD_URL, fd)
      .then(response => {
        ToastAndroid.show("Password reset successfully.", ToastAndroid.SHORT);
        navigation.navigate('Login');
      })
      .catch(error => {
        ToastAndroid.show(error.response.data.message, ToastAndroid.LONG);
      });
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <RegistrationHeader>Restore Password</RegistrationHeader>
      <TextInput
        label="E-mail address"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text: string) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        editable={!isSentOtp}
        textContentType="emailAddress"
        keyboardType="email-address"
        description={isSentOtp ? '' : "OTP code will be sent to your email address."}
      />
      {isSentOtp && (
        <TextInput
          label="OTP code"
          returnKeyType="done"
          value={otp.value}
          onChangeText={(text: string) => setOtp({ value: text, error: '' })}
          error={!!otp.error}
          errorText={otp.error}
          autoCapitalize="none"
          autoCompleteType="off"
          textContentType="oneTimeCode"
          keyboardType="numeric"
          description="Enter the OTP code sent to your email address."
        />
      )}
      {isSentOtp && (
        <TextInput
          label="Password"
          returnKeyType="next"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry={!showPassword}
          onIconPress={() => setShowPassword(!showPassword)}
          autoCapitalize="none"
          description="Enter your new password."
        />
      )}
      <Button
        onPress={isSentOtp ? submitResetPassword : sendResetPasswordEmail}
        mode="contained"
        style={styles.submitBtn}
      >
        {isSentOtp ? 'Submit' : 'Send OTP'}
      </Button>
    </Background>
  )
}

const styles = StyleSheet.create({
  submitBtn: {
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    width: '60%',
  },
})
