import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState, ReactNode } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import api from '../../services/api';

export type Veiculo = {
  id: number;
  placa: string;
  marca: string;
  modelo: string;
  ano: number;
  cor: string;
  valor_diaria: number;
  categoria: { id: number; nome: string };
  nome_categoria: ReactNode;
  acessorios: { id: number; nome: string }[];
  nomes_acessorios: any;
};

const VeiculoScreen = ({ navigation }: any) => {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVeiculos = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/veiculo/');
      setVeiculos(
        (data as Veiculo[]).map(v => ({
          ...v,
          valor_diaria: Number(v.valor_diaria),
        }))
      );
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os veículos. ' + error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(useCallback(() => { fetchVeiculos(); }, []));

  const handleDelete = (id: number) => {
    Alert.alert('Confirmar Exclusão', 'Deseja realmente excluir este veículo?', [
      { text: 'Cancelar' },
      {
        text: 'Excluir',
        onPress: async () => {
          try {
            await api.delete(`/veiculo/${id}/`);
            setVeiculos(prev => prev.filter(v => v.id !== id));
          } catch (error) {
            Alert.alert('Erro', 'Não foi possível excluir o veículo. ' + error);
          }
        },
        style: 'destructive'
      }
    ]);
  };

  const renderItem = ({ item }: { item: Veiculo }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.modelo} - {item.ano}</Text>
        <Text style={styles.details}>Placa: {item.placa}</Text>
        <Text style={styles.details}>Marca: {item.marca}</Text>
        <Text style={styles.details}>Cor: {item.cor}</Text>
        <Text style={styles.details}>Categoria: {item.nome_categoria}</Text>
        <Text style={styles.details}>Valor diária: R$ {Number(item.valor_diaria).toFixed(2)}</Text>
        <Text style={styles.details}>
             Acessórios: {item.nomes_acessorios && item.nomes_acessorios.length > 0
             ? item.nomes_acessorios.join(', ')
              : 'Nenhum'}
        </Text>
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity onPress={() => navigation.navigate('EditVeiculo', { veiculo: item })}>
          <Ionicons name="create" size={24} color='#008080' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Ionicons name="trash" size={24} color="#e74c3c" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#3498db" style={{ flex: 1 }} />
      ) : (
        <FlatList
          data={veiculos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CreateVeiculo')}>
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

export default VeiculoScreen;