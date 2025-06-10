import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function AreasScreen() {
  const [abaSelecionada, setAbaSelecionada] = useState('areas');

  const areas: any[] = [
  
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Agendamento de Áreas</Text>

      <View style={styles.abas}>
        <TouchableOpacity
          style={[styles.aba, abaSelecionada === 'areas' && styles.abaSelecionada]}
          onPress={() => setAbaSelecionada('areas')}
        >
          <Text style={styles.textoAba}>Áreas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.aba, abaSelecionada === 'reservas' && styles.abaSelecionada]}
          onPress={() => setAbaSelecionada('reservas')}
        >
          <Text style={styles.textoAba}>Reservas</Text>
        </TouchableOpacity>
      </View>

      {abaSelecionada === 'areas' && (
        <>
          {areas.length === 0 ? (
            <Text style={styles.texto}>Nenhuma área disponível no momento.</Text>
          ) : (
            areas.map((area, index) => (
              <View key={index} style={styles.caixaArea}>
                <Text style={styles.nomeArea}>{area.nome}</Text>
                <TouchableOpacity style={styles.botao}>
                  <Text style={styles.textoBotao}>Agendar 📅</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </>
      )}

      {abaSelecionada === 'reservas' && (
        <Text style={styles.texto}>Você ainda não possui reservas.</Text>
      )}
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  abas: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  aba: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
  },
  abaSelecionada: {
    borderBottomColor: '#1E6FF2',
  },
  textoAba: {
    fontWeight: 'bold',
  },
  texto: {
    textAlign: 'center',
    marginTop: 20,
  },
  caixaArea: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
  },
  nomeArea: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  botao: {
    backgroundColor: '#1E6FF2',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  textoBotao: {
    color: 'white',
    fontWeight: 'bold',
  },
});
