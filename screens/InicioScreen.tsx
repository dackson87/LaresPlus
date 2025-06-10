import React from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types'; 

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Inicio'>;
};

export default function InicioScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        
        <View style={styles.header}>
          <Text style={styles.menu}>☰</Text>
          <Text style={styles.titulo}>Olá, Lucas Andrade</Text>
          <Text style={styles.subtitulo}>Apartamento 001 - 23 - SUL Rua 2</Text>
        </View>

        <TextInput style={styles.input} placeholder="Buscar" />

        <Text style={styles.titulo2}>Quais os benefícios do nosso aplicativo?</Text>
        <View style={styles.beneficios}>
          <View style={styles.beneficio}>
            <Text style={styles.icone}>📱</Text>
            <Text>Comodidade</Text>
          </View>
          <View style={styles.beneficio}>
            <Text style={styles.icone}>♻️</Text>
            <Text>Sustentabilidade</Text>
          </View>
          <View style={styles.beneficio}>
            <Text style={styles.icone}>📋</Text>
            <Text>Registro</Text>
          </View>
        </View>

        <Text style={styles.titulo2}>Nossos serviços</Text>

        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Areas')}>
         <Text style={styles.botaoTitulo}>🗓️ AGENDAMENTO DE ÁREAS</Text>
         <Text style={styles.botaoDescricao}>reserve fácil, use sem preocupações</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Chamados')}>
  <Text style={styles.botaoTitulo}>🛠️ ABERTURA DE CHAMADOS</Text>
  <Text style={styles.botaoDescricao}>solicite e acompanhe sem burocracia</Text>
</TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 60,
  },
  header: {
    backgroundColor: '#1E6FF2',
    padding: 50,
    borderRadius: 1,
    marginBottom: 10,
  },
  menu: {
    fontSize: 20,
    color: 'white',
    marginBottom: 80,
  },
  titulo: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitulo: {
    color: 'white',
    fontSize: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20,
  },
  titulo2: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  beneficios: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  beneficio: {
    alignItems: 'center',
  },
  icone: {
    fontSize: 30,
    marginBottom: 5,
  },
  botao: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  botaoTitulo: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  botaoDescricao: {
    fontSize: 12,
    color: '#555',
  },
});
