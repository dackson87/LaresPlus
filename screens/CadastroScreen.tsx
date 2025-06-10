import React, { useState } from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Image,} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types.ts';
import api from '../axios/api.tsx'
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Cadastro'>;
};



export default function App({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [lembrar, setLembrar] = useState(false);

  const validarMorador = async () => {
  try {
    const response = await api.get('/validar_morador', {
      params: { email, senha },
    });

    if (response.status === 200) {
      const { id_morador, nome } = response.data;

      await AsyncStorage.setItem('id_morador', id_morador.toString());

      console.log('Login válido! ID salvo:', id_morador);
      navigation.navigate('Inicio');
    } else {
      Alert.alert('Credenciais inválidas');
    }
  } catch (error) {
    Alert.alert('Erro no servidor!');
    console.error('Erro ao validar morador:', error);
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Seja bem vindo</Text>
      <Text>Faça seu login</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={(texto) => setEmail(texto)}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={(texto) => setSenha(texto)}
      />

      <View style={styles.checkboxArea}>
        <Text onPress={() => setLembrar(!lembrar)}>
          [{lembrar ? 'X' : ' '}] Me lembre
        </Text>
      </View>

      <Button
        title="Acessar"
        onPress={validarMorador}
      />

      <Text style={styles.link}>Esqueceu sua senha? Clique aqui</Text>

      <TouchableOpacity onPress={() => navigation.navigate('CadastroUser')}>
        <Text style={styles.link}>Não tem uma conta? Faça o cadastro</Text>
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
    marginTop: 80,
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  checkboxArea: {
    marginBottom: 20,
  },
  link: {
    marginTop: 10,
    fontSize: 14,
    color: 'blue',
  },
  imagem: {
    width: 400,
    height: 400,
    marginTop: 10,
    alignSelf: 'center',
  },
});
