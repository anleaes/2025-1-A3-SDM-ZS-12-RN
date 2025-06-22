import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AcessorioScreen from '../screens/Acessorios/AcessorioScreen';
//import EditSeguroScreen from '../screens/Seguro/EditSeguroScreen';
//import CreateSeguroScreen from '../screens/Seguro/CreateSeguroScreen';

const Stack = createStackNavigator();

const AcessorioStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ 
        headerShown: false, 
    }}>
      <Stack.Screen name="AcessorioList" component={AcessorioScreen} />

      
    </Stack.Navigator>
  );
};

export default AcessorioStackNavigator;