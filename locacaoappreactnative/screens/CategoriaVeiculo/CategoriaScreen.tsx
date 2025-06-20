import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import api from '../../services/api';

// Definição da interface CategoriaVeiculo
export type CategoriaVeiculo = {
  id: number;
  nome: string;
  descricao: string;
  tipo_combustivel: 'Gasolina' | 'Etanol' | 'Flex' | 'Diesel' | 'Elétrico' | 'Hibrido';
};

const CategoriaVeiculoScreen = ({ navigation }: any) => {
  const [categorias, setCategorias] = useState<CategoriaVeiculo[]>([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar as categorias de veículos da API
  const fetchCategorias = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/CategoriaVeiculo/'); // Adapte o endpoint da sua API
      setCategorias(data as CategoriaVeiculo[]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as categorias de veículos. ' + error);
    } finally {
      setLoading(false);
    }
  };

  // Carrega as categorias sempre que a tela estiver em foco
  useFocusEffect(useCallback(() => { fetchCategorias(); }, []));

  // Função para lidar com a exclusão de uma categoria
  const handleDelete = (id: number) => {
    Alert.alert('Confirmar Exclusão', 'Deseja realmente excluir esta categoria de veículo?', [
      { text: 'Cancelar' },
      {
        text: 'Excluir',
        onPress: async () => {
          try {
            await api.delete(`/CategoriaVeiculo/${id}/`); // Adapte o endpoint da sua API
            setCategorias(prev => prev.filter(cat => cat.id !== id));
          } catch (error) {
            Alert.alert('Erro', 'Não foi possível excluir a categoria de veículo. ' + error);
          }
        },
        style: 'destructive'
      }
    ]);
  };

  // Renderização de cada item da lista
  const renderItem = ({ item }: { item: CategoriaVeiculo }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.nome}</Text>
        <Text style={styles.details}>{item.descricao}</Text>
        <Text style={styles.details}>Combustível: {item.tipo_combustivel}</Text>
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity onPress={() => navigation.navigate('EditCategoriaVeiculo', { categoria: item })}>
          <Ionicons name="pencil" size={24} color="#3498db" />
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
          data={categorias}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CreateCategoriaVeiculo')}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  fab: { position: 'absolute', right: 20, bottom: 20, backgroundColor: '#3498db', width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', elevation: 4 },
  card: { backgroundColor: '#1e1e1e', marginVertical: 8, marginHorizontal: 16, marginLeft: 280, borderRadius: 8, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 2, borderWidth: 1, borderColor: '#333', maxWidth: '100%' },
  cardContent: { flex: 1 },
  name: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  details: { fontSize: 14, color: '#aaa', marginTop: 4 },
  cardActions: { flexDirection: 'row', gap: 16 }
});

export default CategoriaVeiculoScreen;