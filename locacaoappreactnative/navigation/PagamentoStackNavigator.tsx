import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import PagamentoScreen from '../screens/Pagamento/PagamentoScreen';
import CreatePagamentoScreen from '@/screens/Pagamento/CreatePagamentoScreen';
import EditPagamentoScreen from '@/screens/Pagamento/EditPagamentoScreen';


const Stack = createStackNavigator();

const PagamentoStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ 
        headerShown: false, 
    }}>
      <Stack.Screen name="PagamentoList" component={PagamentoScreen} />
      <Stack.Screen name="CreatePagamento" component={CreatePagamentoScreen} />
      <Stack.Screen name="EditPagamento" component={EditPagamentoScreen} />
      
    </Stack.Navigator>
  );
};

export default PagamentoStackNavigator;