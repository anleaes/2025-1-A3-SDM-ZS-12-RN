import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LocacaoScreen from '../screens/Locacao/LocacaoScreen';
import CreateLocacaoScreen from '@/screens/Locacao/CreateLocacaoScreen';
import EditLocacaoScreen from '@/screens/Locacao/EditLocacaoScreen';


const Stack = createStackNavigator();

const LocacaoStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ 
        headerShown: false, 
    }}>
      <Stack.Screen name="LocacaoList" component={LocacaoScreen} />
      <Stack.Screen name="CreateLocacao" component={CreateLocacaoScreen} />
      <Stack.Screen name="EditLocacao" component={EditLocacaoScreen} />
      
    </Stack.Navigator>
  );
};

export default LocacaoStackNavigator;