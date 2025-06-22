import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import api from '../../services/api';

export type Categoria = { id: number; nome: string };
export type Acessorio = { id: number; nome: string };

const CreateVeiculoScreen = ({ navigation }: any) => {
  const [placa, setPlaca] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [cor, setCor] = useState('');
  const [valorDiaria, setValorDiaria] = useState('');
  const [categoria, setCategoria] = useState<number | null>(null);
  const [acessorios, setAcessorios] = useState<number[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [todosAcessorios, setTodosAcessorios] = useState<Acessorio[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCategorias();
    fetchAcessorios();
  }, []);

  const fetchCategorias = async () => {
    try {
      const { data } = await api.get('/CategoriaVeiculo/');
      setCategorias(data as Categoria[]);
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar as categorias.');
    }
  };

  const fetchAcessorios = async () => {
    try {
      const { data } = await api.get('/Acessorio/');
      setTodosAcessorios(data as Acessorio[]);
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar os acessórios.');
    }
  };

  const handleToggleAcessorio = (id: number) => {
    setAcessorios(prev =>
      prev.includes(id) ? prev.filter(aid => aid !== id) : [...prev, id]
    );
  };

  const handleSave = async () => {
    if (!placa || !marca || !modelo || !ano || !cor || !valorDiaria || !categoria) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }
    setSaving(true);

    const veiculoData = {
      placa,
      marca,
      modelo,
      ano: Number(ano),
      cor,
      valor_diaria: Number(valorDiaria),
      categoria,
      acessorios,
    };

    try {
      await api.post('/veiculo/', veiculoData);
      navigation.goBack();
    } catch (error) {
      if (typeof error === 'object' && error !== null) {
        const err = error as { response?: any; message?: string };
        console.log('Erro:', err.response?.data || err.message || err);
        Alert.alert('Erro', 'Não foi possível criar o veículo. ' + (err.response?.data?.detail || err.message));
      } else {
        console.log('Erro:', error);
        Alert.alert('Erro', 'Não foi possível criar o veículo.');
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Placa</Text>
      <TextInput style={styles.input} value={placa} onChangeText={setPlaca} placeholder="Placa" placeholderTextColor="#999" />

      <Text style={styles.label}>Marca</Text>
      <TextInput style={styles.input} value={marca} onChangeText={setMarca} placeholder="Marca" placeholderTextColor="#999" />

      <Text style={styles.label}>Modelo</Text>
      <TextInput style={styles.input} value={modelo} onChangeText={setModelo} placeholder="Modelo" placeholderTextColor="#999" />

      <Text style={styles.label}>Ano</Text>
      <TextInput style={styles.input} value={ano} onChangeText={setAno} placeholder="Ano" placeholderTextColor="#999" keyboardType="numeric" />

      <Text style={styles.label}>Cor</Text>
      <TextInput style={styles.input} value={cor} onChangeText={setCor} placeholder="Cor" placeholderTextColor="#999" />

      <Text style={styles.label}>Valor Diária</Text>
      <TextInput style={styles.input} value={valorDiaria} onChangeText={setValorDiaria} placeholder="Valor Diária" placeholderTextColor="#999" keyboardType="numeric" />

      <Text style={styles.label}>Categoria</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={categoria}
          onValueChange={setCategoria}
          style={styles.picker}
          dropdownIconColor="#fff"
        >
          <Picker.Item label="Selecione uma categoria" value={null} />
          {categorias.map(cat => (
            <Picker.Item key={cat.id} label={cat.nome} value={cat.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Acessórios</Text>
      <View style={styles.acessoriosContainer}>
        {todosAcessorios.map(acc => (
          <TouchableOpacity
            key={acc.id}
            style={[
              styles.acessorioItem,
              acessorios.includes(acc.id) && styles.acessorioItemSelected
            ]}
            onPress={() => handleToggleAcessorio(acc.id)}
          >
            <Text style={styles.acessorioText}>{acc.nome}</Text>
          </TouchableOpacity>
        ))}
      </View>

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
  input: { borderWidth: 1, borderColor: '#555', borderRadius: 8, marginLeft: 280, padding: 12, fontSize: 16, color: '#FFFFFF', marginBottom: 12 },
  pickerContainer: { borderColor: '#555', borderWidth: 1, borderRadius: 8, marginBottom: 12 },
  picker: { color: '#000000', height: 50, marginLeft: 280, },
  acessoriosContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16, marginLeft: 280, },
  acessorioItem: { backgroundColor: '#222', borderRadius: 16, paddingVertical: 8, paddingHorizontal: 16,  margin: 4 },
  acessorioItemSelected: { backgroundColor: '#3fd941' },
  acessorioText: { color: '#fff' },
  buttonContainer: { marginTop: 20, marginBottom: 40, marginLeft: 280, },
});

export default CreateVeiculoScreen;