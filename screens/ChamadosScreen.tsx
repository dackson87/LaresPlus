import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Chamados'>;

export default function ChamadosScreen() {
  const navigation = useNavigation<NavigationProp>();

  const chamados = [
    { titulo: 'Hidráulica', data: '28/02/25' },
    { titulo: 'Piscina', data: '01/02/25' },
    { titulo: 'Elétrica', data: '01/01/25' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>← Chamados de serviços</Text>

      {chamados.map((chamado, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.nome}>{chamado.titulo}</Text>
          <Text style={styles.data}>Solicitado: {chamado.data}</Text>
          <Text style={styles.icone}>🛠️</Text>
        </View>
      ))}

      <Button
        title="NOVO CHAMADO"
        onPress={() => navigation.navigate('AberturadeChamados')}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 40,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  data: {
    fontSize: 12,
    color: '#555',
    marginBottom: 5,
  },
  icone: {
    fontSize: 20,
  },
});
