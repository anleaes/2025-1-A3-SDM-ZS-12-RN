import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ClienteScreen from '../screens/Cliente/ClienteScreen';
import EditCategoriaScreen from '../screens/CategoriaVeiculo/EditCategoriaScreen';
import CreateCategoriaScreen from '../screens/CategoriaVeiculo/CreateCategoriaScreen';

const Stack = createStackNavigator();

const CategoriaStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ 
        headerShown: false, 
    }}>
      <Stack.Screen name="CategoriaList" component={CategoriaScreen} />
      <Stack.Screen name="EditCategoriaVeiculo" component={EditCategoriaScreen} />
      <Stack.Screen name="CreateCategoriaVeiculo" component={CreateCategoriaScreen} />
      
    </Stack.Navigator>
  );
};

export default CategoriaStackNavigator;