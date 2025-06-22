import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import FuncionarioScreen from '../screens/Funcionario/FuncionarioScreen';
import CreateFuncionarioScreen from '@/screens/Funcionario/CreateFuncionarioScreen';
import EditFuncionarioScreen from '@/screens/Funcionario/EditFuncionarioScreen';


const Stack = createStackNavigator();

const FuncionarioStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ 
        headerShown: false, 
    }}>
      <Stack.Screen name="FuncionarioList" component={FuncionarioScreen} />
      <Stack.Screen name="CreateFuncionario" component={CreateFuncionarioScreen} />
      <Stack.Screen name="EditFuncionario" component={EditFuncionarioScreen} />
       

      
    </Stack.Navigator>
  );
};

export default FuncionarioStackNavigator;