import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import api from '../../services/api';

type Cliente = { id: number; nome: string };
type Veiculo = { id: number; modelo: string; placa: string };
type Funcionario = { id: number; nome: string };

const EditLocacaoScreen = ({ route, navigation }: any) => {
  const { locacao } = route.params;

  const [cliente, setCliente] = useState<number | null>(null);
  const [veiculo, setVeiculo] = useState<number | null>(null);
  const [funcionario, setFuncionario] = useState<number | null>(null);
  const [dataRetirada, setDataRetirada] = useState('');
  const [dataDevolucao, setDataDevolucao] = useState('');
  const [valorPrevisto, setValorPrevisto] = useState('');
  const [status, setStatus] = useState<'Agendada' | 'Em andamento' | 'Concluída' | 'Cancelada'>('Agendada');

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchClientes();
    fetchVeiculos();
    fetchFuncionarios();
    if (locacao) {
      setCliente(locacao.cliente?.id ?? null);
      setVeiculo(locacao.veiculo?.id ?? null);
      setFuncionario(locacao.funcionario?.id ?? null);
      setDataRetirada(locacao.data_hora_retirada || '');
      setDataDevolucao(locacao.data_hora_prevista_devolucao || '');
      setValorPrevisto(locacao.valor_total_previsto ? String(locacao.valor_total_previsto) : '');
      setStatus(locacao.status || 'Agendada');
    }
  }, [locacao]);

  const fetchClientes = async () => {
    try {
      const { data } = await api.get('/cliente/');
      setClientes(data as Cliente[]);
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar os clientes.');
    }
  };

  const fetchVeiculos = async () => {
    try {
      const { data } = await api.get('/veiculo/');
      setVeiculos(data as Veiculo[]);
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar os veículos.');
    }
  };

  const fetchFuncionarios = async () => {
    try {
      const { data } = await api.get('/funcionario/');
      setFuncionarios(data as Funcionario[]);
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar os funcionários.');
    }
  };

  const handleSave = async () => {
    if (!cliente || !veiculo || !funcionario || !dataRetirada || !dataDevolucao || !status) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }
    setSaving(true);

    const locacaoData = {
      cliente,
      veiculo,
      funcionario,
      data_hora_retirada: dataRetirada,
      data_hora_prevista_devolucao: dataDevolucao,
      valor_total_previsto: valorPrevisto ? Number(valorPrevisto) : null,
      status,
    };

    try {
      await api.put(`/locacao/${locacao.id}/`, locacaoData);
      navigation.goBack();
    } catch (error) {
      if (typeof error === 'object' && error !== null) {
        const err = error as { response?: any; message?: string };
        console.log('Erro:', err.response?.data || err.message || err);
        Alert.alert('Erro', 'Não foi possível atualizar a locação. ' + (err.response?.data?.detail || err.message));
      } else {
        console.log('Erro:', error);
        Alert.alert('Erro', 'Não foi possível atualizar a locação.');
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Cliente</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={cliente}
          onValueChange={setCliente}
          style={styles.picker}
          dropdownIconColor="#fff"
        >
          <Picker.Item label="Selecione um cliente" value={null} />
          {clientes.map(c => (
            <Picker.Item key={c.id} label={c.nome} value={c.id} />
          ))}
        </Picker>
      </View>

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
            <Picker.Item key={v.id} label={`${v.modelo} (${v.placa})`} value={v.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Funcionário</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={funcionario}
          onValueChange={setFuncionario}
          style={styles.picker}
          dropdownIconColor="#fff"
        >
          <Picker.Item label="Selecione um funcionário" value={null} />
          {funcionarios.map(f => (
            <Picker.Item key={f.id} label={f.nome} value={f.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Data/Hora Retirada</Text>
      <TextInput
        style={styles.input}
        value={dataRetirada}
        onChangeText={setDataRetirada}
        placeholder="YYYY-MM-DDTHH:MM:SS"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Data/Hora Devolução Prevista</Text>
      <TextInput
        style={styles.input}
        value={dataDevolucao}
        onChangeText={setDataDevolucao}
        placeholder="YYYY-MM-DDTHH:MM:SS"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Valor Total Previsto</Text>
      <TextInput
        style={styles.input}
        value={valorPrevisto}
        onChangeText={setValorPrevisto}
        placeholder="Valor total previsto"
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
          <Picker.Item label="Agendada" value="Agendada" />
          <Picker.Item label="Em andamento" value="Em andamento" />
          <Picker.Item label="Concluída" value="Concluída" />
          <Picker.Item label="Cancelada" value="Cancelada" />
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
  container: { flex: 1, padding: 16, backgroundColor: '#1c1c1e', },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 12, marginLeft: 280, marginBottom: 4, color: '#FFFFFF' },
  input: { borderWidth: 1, borderColor: '#555', borderRadius: 8, marginLeft: 280, padding: 12, fontSize: 16, color: '#FFFFFF', marginBottom: 12 },
  pickerContainer: { borderColor: '#555', borderWidth: 1, marginLeft: 280, borderRadius: 8, marginBottom: 12 },
  picker: { color: '#000000', height: 50,  },
  buttonContainer: { marginTop: 20, marginBottom: 40, marginLeft: 280, },
});

export default EditLocacaoScreen;