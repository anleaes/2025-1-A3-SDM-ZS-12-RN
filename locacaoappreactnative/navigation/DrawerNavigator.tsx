import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import CustomDrawerContent from '../components/CustomDrawerContent';
import HomeScreen from '../screens/HomeScreen';
import CadeiraStackNavigator from '../navigation/CadeiraStackNavigator';



export type DrawerParamList = {
  Home: undefined;
  Cadeiras: undefined;
 
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: '#4B7BE5',
        drawerLabelStyle: { marginLeft: 0, fontSize: 16 },
        drawerStyle: { backgroundColor: '#fff', width: 250 },
        headerStyle: { backgroundColor: '#4B7BE5' },
        headerTintColor: '#fff',
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color}  />,
          title: 'Início',
        }}
      />

       <Drawer.Screen
        name="Cadeiras"
        component={CadeiraStackNavigator} 
        options={{
          title: 'Cadeiras',
          drawerIcon: ({ color, size }) => <Ionicons name="easel-outline" size={size} color={color} />,
        }}
      />

    </Drawer.Navigator>  
  );
};

export default DrawerNavigator;