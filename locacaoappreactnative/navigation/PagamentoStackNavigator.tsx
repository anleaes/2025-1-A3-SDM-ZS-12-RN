import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import PagamentoScreen from '../screens/Pagamento/PagamentoScreen';


const Stack = createStackNavigator();

const PagamentoStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ 
        headerShown: false, 
    }}>
      <Stack.Screen name="PagamentoList" component={PagamentoScreen} />
      
    </Stack.Navigator>
  );
};

export default PagamentoStackNavigator;