import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import api from '../../services/api';

export type Acessorio = {
  id: number;
  nome: string;
  descricao?: string;
  valor_adicional: number;
  categoria: 'Segurança' | 'Conforto' | 'Entretenimento' | 'Utilitário';
};

const EditAcessorioScreen = ({ route, navigation }: any) => {
  const { acessorio } = route.params as { acessorio: Acessorio };

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valorAdicional, setValorAdicional] = useState('');
  const [categoria, setCategoria] = useState<Acessorio['categoria']>('Segurança');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (acessorio) {
      setNome(acessorio.nome);
      setDescricao(acessorio.descricao || '');
      setValorAdicional(String(acessorio.valor_adicional));
      setCategoria(acessorio.categoria);
    }
  }, [acessorio]);

  const handleSave = async () => {
    if (!nome || !valorAdicional || !categoria) {
      Alert.alert('Erro', 'Nome, valor adicional e categoria são obrigatórios.');
      return;
    }
    setSaving(true);

    const acessorioData = {
      nome,
      descricao,
      valor_adicional: Number(valorAdicional),
      categoria,
    };

    try {
      await api.put(`/Acessorio/${acessorio.id}/`, acessorioData);
      navigation.goBack();
    } catch (error) {
      if (typeof error === 'object' && error !== null) {
        const err = error as { response?: any; message?: string };
        console.log('Erro:', err.response?.data || err.message || err);
        Alert.alert('Erro', 'Não foi possível atualizar o acessório. ' + (err.response?.data?.detail || err.message));
      } else {
        console.log('Erro:', error);
        Alert.alert('Erro', 'Não foi possível atualizar o acessório.');
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Nome" placeholderTextColor="#999" />

      <Text style={styles.label}>Descrição</Text>
      <TextInput style={styles.input} value={descricao} onChangeText={setDescricao} placeholder="Descrição" placeholderTextColor="#999" />

      <Text style={styles.label}>Valor Adicional</Text>
      <TextInput style={styles.input} value={valorAdicional} onChangeText={setValorAdicional} placeholder="Valor Adicional" placeholderTextColor="#999" keyboardType="numeric" />

      <Text style={styles.label}>Categoria</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={categoria}
          onValueChange={setCategoria}
          style={styles.picker}
          dropdownIconColor="#fff"
        >
          <Picker.Item label="Segurança" value="Segurança" />
          <Picker.Item label="Conforto" value="Conforto" />
          <Picker.Item label="Entretenimento" value="Entretenimento" />
          <Picker.Item label="Utilitário" value="Utilitário" />
        </Picker>
      </View>

      <View style={styles.buttonContainer}>
        {!saving && <Button title="Salvar Alterações" onPress={handleSave} color="#3498db" />}
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
  input: { borderWidth: 1, borderColor: '#555', borderRadius: 8, marginLeft: 280, padding: 12, fontSize: 16, color: '#FFFFFF', marginBottom: 12 },
  buttonContainer: { marginTop: 20, marginBottom: 40, marginLeft: 280, },
  pickerContainer: { borderColor: '#555', borderWidth: 1, borderRadius: 8, marginBottom: 12, marginLeft: 280, },
  picker: { color: '#000', height: 50 },
});

export default EditAcessorioScreen;