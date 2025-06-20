import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import api from '../../services/api';
import { CategoriaVeiculo } from './CategoriaScreen';

const EditCategoriaScreen = ({ route, navigation }: any) => {
  const { categoria } = route.params as { categoria: CategoriaVeiculo };

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tipoCombustivel, setTipoCombustivel] = useState<'Gasolina' | 'Etanol' | 'Flex' | 'Diesel' | 'Elétrico' | 'Hibrido'>('Gasolina');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (categoria) {
      setNome(categoria.nome);
      setDescricao(categoria.descricao);
      setTipoCombustivel(categoria.tipo_combustivel);
    }
  }, [categoria]);

  const handleSave = async () => {
    if (!nome || !descricao || !tipoCombustivel) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }
    setSaving(true);

    const categoriaData = {
      nome,
      descricao,
      tipo_combustivel: tipoCombustivel,
    };

    try {
      await api.put(`/CategoriaVeiculo/${categoria.id}/`, categoriaData);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar a categoria. ' + error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />

      <Text style={styles.label}>Descrição</Text>
      <TextInput style={styles.input} value={descricao} onChangeText={setDescricao} />

      <Text style={styles.label}>Tipo de Combustível</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={tipoCombustivel}
          onValueChange={setTipoCombustivel}
          style={styles.picker}
          dropdownIconColor="#fff"
        >
          <Picker.Item label="Gasolina" value="Gasolina" />
          <Picker.Item label="Etanol" value="Etanol" />
          <Picker.Item label="Flex" value="Flex" />
          <Picker.Item label="Diesel" value="Diesel" />
          <Picker.Item label="Elétrico" value="Elétrico" />
          <Picker.Item label="Hibrido" value="Hibrido" />
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

export default EditCategoriaScreen;