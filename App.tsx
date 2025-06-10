import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import CadastroScreen from './screens/CadastroScreen';
import { RootStackParamList } from './types';
import CadastrarUserScreen from './screens/CadastrarUserScreen';
import InicioScreen from './screens/InicioScreen';
import AreasScreen from './screens/AreasScreen';
import ChamadosScreen from './screens/ChamadosScreen';
import AberturadeChamadosScreen from './screens/AberturadeChamadosScreen';
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="CadastroUser" component={CadastrarUserScreen} /> 
        <Stack.Screen name="Inicio" component={InicioScreen} />
         <Stack.Screen name="Areas" component={AreasScreen} />
         <Stack.Screen name="Chamados" component={ChamadosScreen} />
         <Stack.Screen name="AberturadeChamados" component={AberturadeChamadosScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
