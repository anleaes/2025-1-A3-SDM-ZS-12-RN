import React, { ReactNode, useCallback, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import api from '../../services/api';

type Pagamento = {
  id: number;
  carrinho_locacao?: number;
  nome_cliente: ReactNode;
  forma_pagamento: string;
  valor: number;
  data_hora_pagamento: string;
  status: 'Pago' | 'Pendente' | 'Cancelado';
};

const PagamentoScreen = ({ navigation }: any) => {
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPagamentos = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/pagamento/');
      setPagamentos(data as Pagamento[]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os pagamentos. ' + error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(useCallback(() => { fetchPagamentos(); }, []));

  const handleDelete = (id: number) => {
    Alert.alert('Confirmar Exclusão', 'Deseja realmente excluir este pagamento?', [
      { text: 'Cancelar' },
      {
        text: 'Excluir',
        onPress: async () => {
          try {
            await api.delete(`/pagamento/${id}/`);
            setPagamentos(prev => prev.filter(p => p.id !== id));
          } catch (error) {
            Alert.alert('Erro', 'Não foi possível excluir o pagamento. ' + error);
          }
        },
        style: 'destructive'
      }
    ]);
  };

  const renderItem = ({ item }: { item: Pagamento }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.name}>Pagamento #{item.id}</Text>
        <Text style={styles.details}>Carrinho: {item.carrinho_locacao ?? '--'}</Text>
        <Text style={styles.details}>Cliente: {item.nome_cliente}</Text>
        <Text style={styles.details}>Forma: {item.forma_pagamento}</Text>
        <Text style={styles.details}>Valor: R$ {Number(item.valor).toFixed(2)}</Text>
        <Text style={styles.details}>Data: {new Date(item.data_hora_pagamento).toLocaleString()}</Text>
        <Text style={[styles.details, { color: statusColor(item.status) }]}>Status: {item.status}</Text>
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity onPress={() => navigation.navigate('EditPagamento', { pagamento: item })}>
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
      case 'Pago': return '#3fd941';
      case 'Pendente': return '#f1c40f';
      case 'Cancelado': return '#e74c3c';
      default: return '#aaa';
    }
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#3498db" style={{ flex: 1 }} />
      ) : (
        <FlatList
          data={pagamentos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CreatePagamento')}>
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

export default PagamentoScreen;