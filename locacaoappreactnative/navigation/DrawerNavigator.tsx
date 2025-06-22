import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import CustomDrawerContent from '../components/CustomDrawerContent';
import HomeScreen from '../screens/HomeScreen';
import CategoriasStackNavigator from './CategoriasStackNavigator';
import ClienteStackNavigator from './ClienteStackNavigator';
import SeguroStackNavigator from './SeguroStackNavigator';
import AcessorioStackNavigator from './AcessorioStackNavigator';
import FuncionarioStackNavigator from './FuncionarioStackNavigator';



export type DrawerParamList = {
  Home: undefined;
  Categorias: undefined;
  Clientes: undefined;
  Seguro: undefined;
  Acessórios: undefined;
  Funcionario: undefined;
 
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: '#000000',
        drawerInactiveTintColor: '#000000',
        drawerLabelStyle: { marginLeft: 0, fontSize: 16 },
        drawerStyle: { backgroundColor: '#e8ede9', width: 250 },
        headerStyle: { backgroundColor: '#3fd941' },
        headerTintColor: '#000000',
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="home" size={size} color="#000000"  />,
          title: 'Início',
        }}
      />

       <Drawer.Screen
        name="Categorias"
        component={CategoriasStackNavigator} 
        options={{
          title: 'Categorias',
          drawerIcon: ({ color, size }) => <Ionicons name="clipboard" size={size} color={color} />,
        }}
      />

      <Drawer.Screen
        name="Clientes"
        component={ClienteStackNavigator} 
        options={{
          title: 'Clientes',
          drawerIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
        }}
      />

      <Drawer.Screen
        name="Seguro"
        component={SeguroStackNavigator} 
        options={{
          title: 'Seguros',
          drawerIcon: ({ color, size }) => <Ionicons name="shield-checkmark" size={size} color={color} />,
        }}
      />

      <Drawer.Screen
        name="Acessórios"
        component={AcessorioStackNavigator} 
        options={{
          title: 'Acessórios',
          drawerIcon: ({ color, size }) => <Ionicons name="build" size={size} color={color} />,
        }}
      />

      <Drawer.Screen
        name="Funcionario"
        component={FuncionarioStackNavigator} 
        options={{
          title: 'Funcionário',
          drawerIcon: ({ color, size }) => <Ionicons name="people" size={size} color={color} />,
        }}
      />

    </Drawer.Navigator>  
  );
};

export default DrawerNavigator;