import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CategoriaScreen from '../screens/CategoriaVeiculo/CategoriaScreen';

const Stack = createStackNavigator();

const CategoriaStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ 
        headerShown: false, 
    }}>
      <Stack.Screen name="CategoriaList" component={CategoriaScreen} />
      
    </Stack.Navigator>
  );
};

export default CategoriaStackNavigator;