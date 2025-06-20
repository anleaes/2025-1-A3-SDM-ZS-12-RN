import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CategoriaScreen from '../screens/CategoriaVeiculo/CategoriaScreen';
import EditCategoriaScreen from '../screens/CategoriaVeiculo/EditCategoriaScreen';

const Stack = createStackNavigator();

const CategoriaStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ 
        headerShown: false, 
    }}>
      <Stack.Screen name="CategoriaList" component={CategoriaScreen} />
      <Stack.Screen name="EditCategoriaVeiculo" component={EditCategoriaScreen} />
      
    </Stack.Navigator>
  );
};

export default CategoriaStackNavigator;