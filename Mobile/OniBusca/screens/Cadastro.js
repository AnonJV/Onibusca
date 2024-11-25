import React, { useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, StatusBar, Platform, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import Logo from "../components/Logo";
import { useNavigation } from '@react-navigation/native';
import Footer from "../components/Footer";
import axios from "axios";

const Cadastro = () => {
  const [message, setMessage] = useState("");
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigation = useNavigation();

  const handleCadastro = async () => {
    if (nome && email && senha) {
      try {
        const response = await axios.post('https://fa5e-138-121-47-142.ngrok-free.app/cadastro', { nome, email, senha });
        setMessage(response.data.message);
        setNome('');
        setEmail('');
        setSenha('');
        if (response.data.message === 'Usuário cadastrado!') {
          navigation.navigate('Login');
          setMessage('')
        }
      } catch (err) {
        if (err.response) {
          setMessage(err.response.data.message || 'Erro ao cadastrar!');
        } else {
          setMessage('Erro ao cadastrar!');
        }
      }
    } else {
      Alert.alert('Erro', 'Preencha os campos!');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios"? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios"? 64 : 0}
    >
      <Logo />
      <Text style={styles.title}>CRIE SUA CONTA</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          maxLength={20}
          onChangeText={(text) => setNome(text)}
          autoComplete="name"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          maxLength={20}
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoComplete="email"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          maxLength={20}
          value={senha}
          onChangeText={(text) => setSenha(text)} // Verifique se esta linha está correta
          secureTextEntry={true}
          autoCapitalize="none"
        />
      </View>    
      {message && <Text style={{ textAlign: 'center', marginTop: 20, color: '#3C554F', fontSize: 16 }}>{message}</Text>}
      <View style={styles.buttonsPlace}>
        <TouchableOpacity style={styles.createButton} onPress={handleCadastro}>
          <Text style={styles.createText}>CRIAR CONTA</Text>
        </TouchableOpacity>
        <Text style={styles.or}>OU</Text>

        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginButtonText}>LOGIN</Text>
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
  loginButtonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center'
  },
  loginButton: {
    backgroundColor: '#3C554F',
    padding: 12,
    borderRadius: 20,
    width: '60%',
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
});

export default Cadastro;