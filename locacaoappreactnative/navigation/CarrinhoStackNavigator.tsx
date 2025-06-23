import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CarrinhoScreen from '../screens/CarrinhoLocacao/CarrinhoScreen';
import CreateCarrinhoScreen from '@/screens/CarrinhoLocacao/CreateCarrinhoScreen';
import EditCarrinhoScreen from '@/screens/CarrinhoLocacao/EditCarrinhoScreen';


const Stack = createStackNavigator();

const CarrinhoStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ 
        headerShown: false, 
    }}>
      <Stack.Screen name="CarrinhoList" component={CarrinhoScreen} />
      <Stack.Screen name="CreateCarrinho" component={CreateCarrinhoScreen} />
      <Stack.Screen name="EditCarrinho" component={EditCarrinhoScreen} />
      

    </Stack.Navigator>
  );
};

export default CarrinhoStackNavigator;