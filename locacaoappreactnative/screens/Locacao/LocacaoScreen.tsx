import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState, ReactNode } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import api from '../../services/api';

export type Locacao = {
  id: number;
  cliente: { id: number; nome: string };
  nome_cliente: ReactNode;
  veiculo: { id: number; modelo: string; placa: string };
  nome_veiculo: ReactNode;
   placa_veiculo: ReactNode;
  funcionario: { id: number; nome: string };
  nome_funcionario: ReactNode;
  data_hora_retirada: string;
  data_hora_prevista_devolucao: string;
  valor_total_previsto: number | null;
  status: "Agendada" | "Em andamento" | "Concluída" | "Cancelada";
};

const LocacaoScreen = ({ navigation }: any) => {
  const [locacoes, setLocacoes] = useState<Locacao[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLocacoes = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/locacao/');
      setLocacoes(data as Locacao[]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as locações. ' + error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(useCallback(() => { fetchLocacoes(); }, []));

  const handleDelete = async (id: number) => {
  try {
    console.log('Enviando DELETE para:', `/locacao/${id}/`);
    await api.delete(`/locacao/${id}/`);
    setLocacoes(prev => prev.filter(l => l.id !== id));
    console.log('Locação removida com sucesso.');
  } catch (error: any) {
    console.log('Erro ao excluir locação:', error.response?.data || error.message);
  }
};

  const renderItem = ({ item }: { item: Locacao }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.name}>Locação {item.nome_cliente}</Text>
        <Text style={styles.details}>Cliente: {item.nome_cliente}</Text>
        <Text style={styles.details}>Veículo: {item.nome_veiculo}</Text>
        <Text style={styles.details}>Funcionário: {item.nome_funcionario}</Text>
        <Text style={styles.details}>Retirada: {new Date(item.data_hora_retirada).toLocaleString()}</Text>
        <Text style={styles.details}>Devolução prevista: {new Date(item.data_hora_prevista_devolucao).toLocaleString()}</Text>
        <Text style={styles.details}>Valor previsto: R$ {item.valor_total_previsto !== null && item.valor_total_previsto !== undefined ? Number(item.valor_total_previsto).toFixed(2): '--'}</Text>
        <Text style={[styles.details, { color: statusColor(item.status) }]}>Status: {item.status}</Text>
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity onPress={() => navigation.navigate('EditLocacao', { locacao: item })}>
          <Ionicons name="create" size={24} color='#008080' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Ionicons name="trash" size={24} color="#e74c3c" />
        </TouchableOpacity>
      </View>
    </View>
  );

  function statusColor(status: string) {
    switch (status) {
      case 'Agendada': return '#3498db';
      case 'Em andamento': return '#f1c40f';
      case 'Concluída': return '#3fd941';
      case 'Cancelada': return '#e74c3c';
      default: return '#aaa';
    }
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#3498db" style={{ flex: 1 }} />
      ) : (
        <FlatList
          data={locacoes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CreateLocacao')}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  fab: { position: 'absolute', right: 20, bottom: 20, backgroundColor: '#008080', width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', elevation: 4 },
  card: { backgroundColor: '#1e1e1e', marginVertical: 8, marginHorizontal: 16, marginLeft: 280, borderRadius: 8, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 2, borderWidth: 1, borderColor: '#333', maxWidth: '100%' },
  cardContent: { flex: 1 },
  name: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  details: { fontSize: 14, color: '#aaa', marginTop: 4 },
  cardActions: { flexDirection: 'row', gap: 16 }
});

export default LocacaoScreen;