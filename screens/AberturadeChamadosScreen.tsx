import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import api from '../axios/api';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'AberturadeChamados'>;

export default function AberturadeChamadosScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [area_comum, setArea_comum] = useState('');
  const [motivo, setMotivo] = useState('');
  const [descricao_chamado, setDescricao_chamado] = useState('');
  const [situacao, setSituacao] = useState('');
  const [arquivos, setArquivos] = useState('');

  const chamadoServico = async () => {
  try {
    const idMoradorString = await AsyncStorage.getItem('id_morador');
    const idMorador = idMoradorString ? Number(idMoradorString) : null;

    if (!idMorador) {
      Alert.alert("Erro", "Morador não identificado. Faça login novamente.");
      return;
    }

    const response = await api.post('/chamado_servico', {
      descricao_chamado,
      area_comum: { id_area: Number(area_comum) },
      motivo,
      situacao,
      morador: { id_morador: idMorador }
    });

    const idChamado = response.data.id_chamado;

    if (arquivos) {
      await anexoChamado(idChamado, arquivos);
    }

    Alert.alert("Chamado realizado!", response.data.mensagem);
    navigation.navigate('Chamados');
  } catch (err: any) {
    if (err.response) {
      Alert.alert("Erro", err.response.data.mensagem);
    } else {
      Alert.alert("Erro", "Sistema sem funcionar, tente novamente mais tarde!");
    }
  }
};


  const anexoChamado = async (idChamado: number, arquivos: string) => {
    try {
      await api.post('/anexo_chamado', {
        caminho_arquivo: arquivos,
        chamado_servico: { id_chamado: idChamado }
      });
    } catch (err: any) {
      if (err.response) {
        Alert.alert("Erro", err.response.data.mensagem);
      } else {
        Alert.alert("Erro", "Sistema sem funcionar, tente novamente mais tarde!");
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.voltar}>← Abertura do chamado</Text>
      </TouchableOpacity>

      <Text style={styles.textoTopo}>
        Por favor, preencha o formulário e sua solicitação será recebida!
      </Text>

      <Text style={styles.label}>Área Comum</Text>
      <Picker
        selectedValue={area_comum}
        onValueChange={(itemValue) => setArea_comum(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Selecione a área comum" value="" />
        <Picker.Item label="Piscina" value="1" />
        <Picker.Item label="Quadra Poliesportiva" value="2" />
        <Picker.Item label="Churrasqueira" value="3" />
        <Picker.Item label="Quadra de Areia" value="4" />
        <Picker.Item label="Quadra de Vôlei" value="5" />
        <Picker.Item label="Salão de Festas" value="6" />
        <Picker.Item label="Quadra de Basquete" value="7" />
      </Picker>

      <Text style={styles.label}>Motivo</Text>
      <Picker
        selectedValue={motivo}
        onValueChange={(itemValue) => setMotivo(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Selecione o motivo" value="" />
        <Picker.Item label="Manutenção" value="MANUTENCAO" />
        <Picker.Item label="Limpeza" value="LIMPEZA" />
        <Picker.Item label="Segurança" value="SEGURANCA" />
        <Picker.Item label="Infraestrutura" value="INFRAESTRUTURA" />
        <Picker.Item label="Iluminação" value="ILUMINACAO" />
        <Picker.Item label="Problema com a Portaria" value="PROBLEMA_COM_PORTARIA" />
        <Picker.Item label="Outros" value="OUTROS" />
      </Picker>

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Descrição do chamado"
        value={descricao_chamado}
        onChangeText={setDescricao_chamado}
        multiline
      />

      <Text style={styles.label}>Situação</Text>
      <Picker
        selectedValue={situacao}
        onValueChange={(itemValue) => setSituacao(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Selecione a situação" value="" />
        <Picker.Item label="Urgente" value="URGENTE" />
        <Picker.Item label="Moderado" value="MODERADO" />
        <Picker.Item label="Leve" value="LEVE" />
        <Picker.Item label="Informativo" value="INFORMATIVO" />
      </Picker>

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Arquivos (URL ou caminho)"
        value={arquivos}
        onChangeText={setArquivos}
        multiline
      />

      <TouchableOpacity style={styles.botao} onPress={chamadoServico}>
        <Text style={styles.botaoTexto}>ENVIAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 40,
    backgroundColor: 'white',
    flex: 1,
  },
  voltar: {
    fontSize: 18,
    marginBottom: 10,
  },
  textoTopo: {
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  label: {
    marginBottom: 5,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  botao: {
    backgroundColor: '#1E6FF2',
    padding: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  botaoTexto: {
    color: 'white',
    fontWeight: 'bold',
  },
});
