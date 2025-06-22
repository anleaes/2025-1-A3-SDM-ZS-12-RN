import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import SeguroScreen from '../screens/Seguro/SeguroScreen';
import EditSeguroScreen from '../screens/Seguro/EditSeguroScreen';
import CreateSeguroScreen from '../screens/Seguro/CreateSeguroScreen';

const Stack = createStackNavigator();

const SeguroStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ 
        headerShown: false, 
    }}>
      <Stack.Screen name="SeguroList" component={SeguroScreen} />
      <Stack.Screen name="CreateSeguro" component={CreateSeguroScreen} />
      <Stack.Screen name="EditSeguro" component={EditSeguroScreen} />
      
    </Stack.Navigator>
  );
};

export default SeguroStackNavigator;