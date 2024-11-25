import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, StatusBar, KeyboardAvoidingView, Platform } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../components/Logo';
import Footer from "../components/Footer";
import { StackActions, useNavigation } from '@react-navigation/native';
import axios from "axios";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const checkLoginStatus = async() => {
      const userData = await AsyncStorage.getItem('userData');
      if(userData) {
        navigation.dispatch(StackActions.replace('User', {userData: JSON.parse(userData) }));
      }
    }
    checkLoginStatus();
  }, [navigation]);

  const handleLogin = async () => {
    if (email && senha) {
      try {
        // 10.0.2.2
        const response = await axios.post('https://8679-200-133-218-99.ngrok-free.app/login', { email, senha });
        setMessage(response.data.message);
        setEmail('');
        setSenha('');

        if (response.data.message === 'Login realizado!') {
          await AsyncStorage.setItem('userData', JSON.stringify(response.data.userData));
          navigation.dispatch(StackActions.replace('User', { userData: response.data.userData }));
          setMessage('')
        }
      } catch (err) {
        if (err.response) {
          Alert.alert('Erro', err.response.data.message || 'Erro ao fazer login');
        } else {
          Alert.alert('Erro', 'Erro ao fazer login');
        }
      }
    } else {
      Alert.alert('Erro', 'Preencha os campos');
    }
  };

  const handleForgotPassword = () => {
    Alert.alert('Esqueci minha senha', 'Redirecionando para a tela de recuperação de senha');
  };

  const handleCreateAccount = () => {
    navigation.navigate('Cadastro');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <Logo />
      <Text style={styles.title}>FAÇA LOGIN</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoComplete="email"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={senha}
          onChangeText={(text) => setSenha(text)}
          secureTextEntry={true}
          autoCapitalize="none"
        />
      </View>
      {message && <Text style={{ textAlign: 'center', marginTop: 10, color: '#3C554F', fontSize: 18 }}>{message}</Text>}
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
      </TouchableOpacity>
      <View style={styles.buttonsPlace}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>LOGIN</Text>
        </TouchableOpacity>

        <Text style={styles.or}>OU</Text>

        <TouchableOpacity style={styles.createButton} onPress={handleCreateAccount}>
          <Text style={styles.createText}>CRIE UMA CONTA</Text>
        </TouchableOpacity>
      </View>
      <Footer />
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    justifyContent: 'center',
  },
  title: {
    marginTop: 40,
    fontSize: 30,
    color: '#3C554F'
  },
  form: {
    width: '100%',
    alignItems: 'center',
    marginTop: 60,
  },
  input: {
    borderWidth: 2,
    width: '80%',
    borderRadius: 12,
    fontSize: 18,
    padding: 5,
    marginTop: 30,
  },
  loginButton: {
    backgroundColor: '#3C554F',
    padding: 12,
    borderRadius: 20,
    width: '60%',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center'
  },
  createButton: {
    borderWidth: 2,
    borderRadius: 20,
    padding: 12,
    width: '60%'
  },
  createText: {
    color: '#000',
    fontSize: 20,
    textAlign: 'center'
  },
  buttonsPlace: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginBottom: 20,
  },
  or: {
    textAlign: 'center',
    fontSize: 16,
    margin: 10,
  },
  forgotPassword: {
    fontSize: 16,
    color: '#3C554F',
    textDecorationLine: 'underline',
    marginTop: 10,
    paddingLeft: 140,
  }
});

export default Login;
