import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import CustomDrawerContent from '../components/CustomDrawerContent';
import HomeScreen from '../screens/HomeScreen';
import CategoriasStackNavigator from './CategoriasStackNavigator';



export type DrawerParamList = {
  Home: undefined;
  Categorias: undefined;
 
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

    </Drawer.Navigator>  
  );
};

export default DrawerNavigator;