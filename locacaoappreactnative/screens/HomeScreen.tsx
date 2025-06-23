import { DrawerScreenProps } from '@react-navigation/drawer';
import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'Home'>;

const HomeScreen = (_props: Props) => (
  <View style={styles.container}>
    <Image
      source={require('../assets/images/car.png')}
      style={styles.logo}
      resizeMode="contain"
    />
    <Text style={styles.title}>Locação App</Text>
    <Text style={styles.subtitle}>Bem-vindo ao sistema de locação de veículos!</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212', padding: 24 },
  logo: { width: 250, height: 120, marginBottom: 24 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#3fd941', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#ccc', marginBottom: 32, textAlign: 'center' },
});

export default HomeScreen;