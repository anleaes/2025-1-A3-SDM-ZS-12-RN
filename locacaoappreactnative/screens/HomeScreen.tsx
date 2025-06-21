import { DrawerScreenProps } from '@react-navigation/drawer';
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' }}>
    <Text style={styles.label}>Locacao App</Text>
  </View>
);

const styles = StyleSheet.create({
label: { fontSize: 30, fontWeight: 'bold', marginTop: 12, marginBottom: 4, color: '#FFFFFF' },
})

export default HomeScreen;