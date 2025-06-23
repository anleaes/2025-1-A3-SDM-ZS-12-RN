import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import api from '../../services/api';

type CarrinhoLocacao = { id: number };

const EditPagamentoScreen = ({ route, navigation }: any) => {
  const { pagamento } = route.params;

  const [carrinhoLocacao, setCarrinhoLocacao] = useState<number | null>(null);
  const [formaPagamento, setFormaPagamento] = useState<'Pix' | 'Crédito' | 'Débito' | 'Dinheiro'>('Pix');
  const [valor, setValor] = useState('');
  const [status, setStatus] = useState<'Pago' | 'Pendente' | 'Cancelado'>('Pendente');
  const [carrinhos, setCarrinhos] = useState<CarrinhoLocacao[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCarrinhos();
    if (pagamento) {
      setCarrinhoLocacao(pagamento.carrinho_locacao ?? null);
      setFormaPagamento(pagamento.forma_pagamento);
      setValor(String(pagamento.valor ?? ''));
      setStatus(pagamento.status);
    }
  }, [pagamento]);

  const fetchCarrinhos = async () => {
    try {
      const { data } = await api.get('/carrinholocacao/');
      setCarrinhos(data as CarrinhoLocacao[]);
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar os carrinhos.');
    }
  };

  const handleSave = async () => {
    if (!valor) {
      Alert.alert('Erro', 'Preencha o valor.');
      return;
    }
    setSaving(true);

    const pagamentoData = {
      carrinho_locacao: carrinhoLocacao,
      forma_pagamento: formaPagamento,
      valor: Number(valor),
      status,
    };

    try {
      await api.put(`/pagamento/${pagamento.id}/`, pagamentoData);
      navigation.goBack();
    } catch (error) {
      if (typeof error === 'object' && error !== null) {
        const err = error as { response?: any; message?: string };
        console.log('Erro:', err.response?.data || err.message || err);
        Alert.alert('Erro', 'Não foi possível atualizar o pagamento. ' + (err.response?.data?.detail || err.message));
      } else {
        console.log('Erro:', error);
        Alert.alert('Erro', 'Não foi possível atualizar o pagamento.');
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Carrinho de Locação</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={carrinhoLocacao}
          onValueChange={setCarrinhoLocacao}
          style={styles.picker}
          dropdownIconColor="#fff"
        >
          <Picker.Item label="Selecione um carrinho" value={null} />
          {carrinhos.map(c => (
            <Picker.Item key={c.id} label={`Carrinho #${c.id}`} value={c.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Forma de Pagamento</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formaPagamento}
          onValueChange={setFormaPagamento}
          style={styles.picker}
          dropdownIconColor="#fff"
        >
          <Picker.Item label="Pix" value="Pix" />
          <Picker.Item label="Crédito" value="Crédito" />
          <Picker.Item label="Débito" value="Débito" />
          <Picker.Item label="Dinheiro" value="Dinheiro" />
        </Picker>
      </View>

      <Text style={styles.label}>Valor</Text>
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={setValor}
        placeholder="Valor"
        placeholderTextColor="#999"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Status</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={status}
          onValueChange={setStatus}
          style={styles.picker}
          dropdownIconColor="#fff"
        >
          <Picker.Item label="Pago" value="Pago" />
          <Picker.Item label="Pendente" value="Pendente" />
          <Picker.Item label="Cancelado" value="Cancelado" />
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
  input: { borderWidth: 1, borderColor: '#555', borderRadius: 8, padding: 12, marginLeft: 280, fontSize: 16, color: '#FFFFFF', marginBottom: 12 },
  pickerContainer: { borderColor: '#555', borderWidth: 1, borderRadius: 8, marginLeft: 280, marginBottom: 12 },
  picker: { color: '#000000', height: 50 },
  buttonContainer: { marginTop: 20, marginBottom: 40, marginLeft: 280 },
});

export default EditPagamentoScreen;