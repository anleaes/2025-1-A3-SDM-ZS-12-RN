import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import SeguroScreen from '../screens/Seguro/SeguroScreen';
//import EditClienteScreen from '../screens/Cliente/EditClienteScreen';
//import CreateClienteScreen from '../screens/Cliente/CreateClienteScreen';

const Stack = createStackNavigator();

const SeguroStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ 
        headerShown: false, 
    }}>
      <Stack.Screen name="SeguroList" component={SeguroScreen} />
      
      
     
      
    </Stack.Navigator>
  );
};

export default SeguroStackNavigator;