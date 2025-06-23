import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CarrinhoScreen from '../screens/CarrinhoLocacao/CarrinhoScreen';


const Stack = createStackNavigator();

const CarrinhoStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ 
        headerShown: false, 
    }}>
      <Stack.Screen name="CarrinhoList" component={CarrinhoScreen} />
      

    </Stack.Navigator>
  );
};

export default CarrinhoStackNavigator;