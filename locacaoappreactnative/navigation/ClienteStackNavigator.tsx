import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ClienteScreen from '../screens/Cliente/ClienteScreen';
import EditClienteScreen from '../screens/Cliente/EditClienteScreen';
//import CreateClienteScreen from '../screens/Cliente/CreateClienteScreen';

const Stack = createStackNavigator();

const ClienteStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ 
        headerShown: false, 
    }}>
      <Stack.Screen name="ClienteList" component={ClienteScreen} />
      <Stack.Screen name="EditCliente" component={EditClienteScreen} />
      
     
      
    </Stack.Navigator>
  );
};

export default ClienteStackNavigator;