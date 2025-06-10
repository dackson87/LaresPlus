import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import api from '../axios/api';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<RootStackParamList, 'CadastroUser'>;

export default function CadastroScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');

  const cadastroMorador = async () => {
  try {
    const response = await api.post('/cadastro_morador', {
      nome,
      email,
      senha,
    });

    if (response && response.status === 201) {
      const { id_morador } = response.data;

      await AsyncStorage.setItem('id_morador', id_morador.toString());

      console.log('Cadastro realizado! ID salvo:', id_morador);
      Alert.alert('Bem vindo!', 'Cadastro realizado!');
      navigation.navigate('Inicio');
    } else {
      Alert.alert('Erro', 'Não foi possível realizar o cadastro do morador.');
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 409) {
        Alert.alert('Erro', 'Este e-mail já está cadastrado!');
      } else {
        Alert.alert('Erro no servidor', 'Tente novamente mais tarde!');
      }
      console.error(error);
    }
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastre-se</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <View style={styles.botao}>
        <Button title="Cadastrar" color="blue" onPress={cadastroMorador} />
      </View>

      <Text style={styles.info}>Já possui uma conta?</Text>

      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.link}>Faça o login</Text>
      </TouchableOpacity>

      <Image
        source={require('../assets/logo.png')}
        style={styles.imagem}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 60,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  botao: {
    backgroundColor: '#0000FF',
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 10,
    marginBottom: 20,
  },
  info: {
    textAlign: 'center',
    marginBottom: 5,
  },
  link: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
  imagem: {
    width: 400,
    height: 400,
    alignSelf: 'center',
    marginTop: 10,
  },
});
