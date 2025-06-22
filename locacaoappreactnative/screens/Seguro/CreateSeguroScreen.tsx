import React, { useState } from 'react';
import { ActivityIndicator, Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import api from '../../services/api';

const CreateSeguroScreen = ({ navigation }: any) => {
  const [tipo, setTipo] = useState('');
  const [cobertura, setCobertura] = useState('');
  const [valorDiario, setValorDiario] = useState('');
  const [franquia, setFranquia] = useState('');
  const [seguradora, setSeguradora] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!tipo || !cobertura || !valorDiario || !franquia || !seguradora) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }
    setSaving(true);

    const seguroData = {
      tipo,
      cobertura,
      valor_diario: Number(valorDiario),
      franquia,
      seguradora,
    };

    try {
      await api.post('/seguro/', seguroData);
      navigation.goBack();
    } catch (error) {
      if (typeof error === 'object' && error !== null) {
        const err = error as { response?: any; message?: string };
        console.log('Erro:', err.response?.data || err.message || err);
        Alert.alert('Erro', 'Não foi possível salvar o seguro. ' + (err.response?.data?.detail || err.message));
      } else {
        console.log('Erro:', error);
        Alert.alert('Erro', 'Não foi possível salvar o seguro.');
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Tipo</Text>
      <TextInput style={styles.input} value={tipo} onChangeText={setTipo} placeholder="Tipo" placeholderTextColor="#999" />

      <Text style={styles.label}>Cobertura</Text>
      <TextInput style={styles.input} value={cobertura} onChangeText={setCobertura} placeholder="Cobertura" placeholderTextColor="#999" />

      <Text style={styles.label}>Valor Diário</Text>
      <TextInput style={styles.input} value={valorDiario} onChangeText={setValorDiario} placeholder="Valor Diário" placeholderTextColor="#999" keyboardType="numeric" />

      <Text style={styles.label}>Franquia</Text>
      <TextInput style={styles.input} value={franquia} onChangeText={setFranquia} placeholder="Franquia" placeholderTextColor="#999" />

      <Text style={styles.label}>Seguradora</Text>
      <TextInput style={styles.input} value={seguradora} onChangeText={setSeguradora} placeholder="Seguradora" placeholderTextColor="#999" />

      <View style={styles.buttonContainer}>
        {!saving && <Button title="Salvar" onPress={handleSave} color="#3498db" />}
        {saving && <ActivityIndicator size="large" color="#3498db" />}
        <View style={{ marginTop: 10 }}>
          <Button title="Voltar" onPress={() => navigation.goBack()} color="#888" disabled={saving} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#1c1c1e' },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 12, marginBottom: 4, color: '#FFFFFF' },
  input: { borderWidth: 1, borderColor: '#555', borderRadius: 8, padding: 12, marginLeft: 280, fontSize: 16, color: '#FFFFFF', marginBottom: 12 },
  buttonContainer: { marginTop: 20, marginBottom: 40, marginLeft: 280, },
});

export default CreateSeguroScreen;