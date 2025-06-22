import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AcessorioScreen from '../screens/Acessorios/AcessorioScreen';
import EditAcessorioScreen from '../screens/Acessorios/EditAcessorioScreen';
import CreateAcessorioScreen from '../screens/Acessorios/CreateAcessorioScreen';

const Stack = createStackNavigator();

const AcessorioStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ 
        headerShown: false, 
    }}>
      <Stack.Screen name="AcessorioList" component={AcessorioScreen} />
      <Stack.Screen name="EditAcessorio" component={EditAcessorioScreen} />
      <Stack.Screen name="CreateAcessorio" component={CreateAcessorioScreen} />

        

      
    </Stack.Navigator>
  );
};

export default AcessorioStackNavigator;