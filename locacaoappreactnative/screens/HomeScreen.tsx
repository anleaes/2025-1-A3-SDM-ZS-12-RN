import { DrawerScreenProps } from '@react-navigation/drawer';
import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => (
  <View style={styles.container}>
    <Image
      source={require('../assets/images/car.png')}
      style={styles.logo}
      resizeMode="contain"
    />
    <Text style={styles.title}>Locação App</Text>
    <Text style={styles.subtitle}>Bem-vindo ao seu sistema de gestão de locação de veículos!</Text>
    <View style={styles.buttonGroup}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Categorias')}>
         <Text style={styles.buttonText}>Categorias</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Clientes')}>
          <Text style={styles.buttonText}>Clientes</Text>
       </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Seguro')}>
         <Text style={styles.buttonText}>Seguros</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Acessórios')}>
          <Text style={styles.buttonText}>Acessórios</Text>
        </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212', padding: 24 },
  logo: { width: 250, height: 120, marginBottom: 24 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#3fd941', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#ccc', marginBottom: 32, textAlign: 'center' },
  buttonGroup: { width: '100%', alignItems: 'center' },
  button: { backgroundColor: '#3fd941', paddingVertical: 14, paddingHorizontal: 40, borderRadius: 8, marginVertical: 8, width: 220, alignItems: 'center' },
  buttonText: { color: '#121212', fontSize: 18, fontWeight: 'bold' },
});

export default HomeScreen;