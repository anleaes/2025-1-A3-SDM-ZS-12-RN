import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CategoriaScreen from '../screens/CategoriaVeiculo/CategoriaScreen';

const Stack = createStackNavigator();

const CadeiraStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ 
        headerShown: false, 
        cardStyle: { backgroundColor: '#121212' }
    }}>
      <Stack.Screen name="CadeiraList" component={CategoriaScreen} />
      
    </Stack.Navigator>
  );
};

export default CadeiraStackNavigator;