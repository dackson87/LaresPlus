import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types.ts';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.image} />

      <Text style={styles.title}>Página Inicial</Text>
      <Button
        title="Login"
        onPress={() => navigation.navigate('Cadastro')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
  image: {
    width: '150%',
    height: undefined,
    aspectRatio: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
});
