import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import api from '../../services/api';

type Veiculo = { id: number; modelo: string; marca: string };
type Seguro = { id: number; tipo: string };
type Locacao = {
  nome_cliente: any; id: number 
};

const EditCarrinhoScreen = ({ route, navigation }: any) => {
  const { carrinho } = route.params;

  const [veiculo, setVeiculo] = useState<number | null>(null);
  const [seguro, setSeguro] = useState<number | null>(null);
  const [locacao, setLocacao] = useState<number | null>(null);
  const [quantidade, setQuantidade] = useState('1');
  const [precoUnitario, setPrecoUnitario] = useState('');
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [seguros, setSeguros] = useState<Seguro[]>([]);
  const [locacoes, setLocacoes] = useState<Locacao[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchVeiculos();
    fetchSeguros();
    fetchLocacoes();
    if (carrinho) {
      setVeiculo(carrinho.veiculo?.id ?? null);
      setSeguro(carrinho.seguro?.id ?? null);
      setLocacao(carrinho.locacao?.id ?? null);
      setQuantidade(String(carrinho.quantidade ?? '1'));
      setPrecoUnitario(String(carrinho.preco_unitario ?? ''));
    }
  }, [carrinho]);

  const fetchVeiculos = async () => {
    try {
      const { data } = await api.get('/veiculo/');
      setVeiculos(data as Veiculo[]);
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar os veículos.');
    }
  };

  const fetchSeguros = async () => {
    try {
      const { data } = await api.get('/seguro/');
      setSeguros(data as Seguro[]);
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar os seguros.');
    }
  };

  const fetchLocacoes = async () => {
    try {
      const { data } = await api.get('/locacao/');
      setLocacoes(data as Locacao[]);
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar as locações.');
    }
  };

  const handleSave = async () => {
    if (!veiculo || !quantidade || !precoUnitario) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }
    setSaving(true);

    const carrinhoData = {
      veiculo,
      seguro,
      locacao,
      quantidade: Number(quantidade),
      preco_unitario: Number(precoUnitario),
    };

    try {
      await api.put(`/carrinholocacao/${carrinho.id}/`, carrinhoData);
      navigation.goBack();
    } catch (error) {
      if (typeof error === 'object' && error !== null) {
        const err = error as { response?: any; message?: string };
        console.log('Erro:', err.response?.data || err.message || err);
        Alert.alert('Erro', 'Não foi possível atualizar o item. ' + (err.response?.data?.detail || err.message));
      } else {
        console.log('Erro:', error);
        Alert.alert('Erro', 'Não foi possível atualizar o item.');
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Veículo</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={veiculo}
          onValueChange={setVeiculo}
          style={styles.picker}
          dropdownIconColor="#fff"
        >
          <Picker.Item label="Selecione um veículo" value={null} />
          {veiculos.map(v => (
            <Picker.Item key={v.id} label={`${v.modelo} (${v.marca})`} value={v.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Seguro</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={seguro}
          onValueChange={setSeguro}
          style={styles.picker}
          dropdownIconColor="#fff"
        >
          <Picker.Item label="Sem seguro" value={null} />
          {seguros.map(s => (
            <Picker.Item key={s.id} label={s.tipo} value={s.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Locação</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={locacao}
          onValueChange={setLocacao}
          style={styles.picker}
          dropdownIconColor="#fff"
        >
          <Picker.Item label="Sem locação" value={null} />
          {locacoes.map(l => (
            <Picker.Item key={l.id} label={`Locação ${l.nome_cliente}`} value={l.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Quantidade</Text>
      <TextInput
        style={styles.input}
        value={quantidade}
        onChangeText={setQuantidade}
        placeholder="Quantidade"
        placeholderTextColor="#999"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Preço unitário</Text>
      <TextInput
        style={styles.input}
        value={precoUnitario}
        onChangeText={setPrecoUnitario}
        placeholder="Preço unitário"
        placeholderTextColor="#999"
        keyboardType="numeric"
      />

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
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 12, marginLeft: 280, marginBottom: 4, color: '#FFFFFF' },
  input: { borderWidth: 1, borderColor: '#555', borderRadius: 8, padding: 12, marginLeft: 280, fontSize: 16, color: '#FFFFFF', marginBottom: 12 },
  pickerContainer: { borderColor: '#555', borderWidth: 1, borderRadius: 8, marginLeft: 280, marginBottom: 12 },
  picker: { color: '#00000', height: 50 },
  buttonContainer: { marginTop: 20, marginBottom: 40, marginLeft: 280, },
});

export default EditCarrinhoScreen;