import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import VeiculoScreen from '../screens/Veiculo/VeiculoScreen';
import EditVeiculoScreen from '../screens/Veiculo/EditVeiculoScreen';
import CreateVeiculoScreen from '../screens/Veiculo/CreateVeiculoScreen';


const Stack = createStackNavigator();

const VeiculoStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ 
        headerShown: false, 
    }}>
      <Stack.Screen name="VeiculoList" component={VeiculoScreen} />
      <Stack.Screen name="EditVeiculo" component={EditVeiculoScreen} />
      <Stack.Screen name="CreateVeiculo" component={CreateVeiculoScreen} />
        
        
      
      
    </Stack.Navigator>
  );
};

export default VeiculoStackNavigator;