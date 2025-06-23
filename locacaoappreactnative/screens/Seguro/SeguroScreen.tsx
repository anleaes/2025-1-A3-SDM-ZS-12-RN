import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import api from '../../services/api';

export type Seguro = {
  id: number;
  tipo: string;
  cobertura: string;
  valor_diario: number;
  franquia: string;
  seguradora: string;
};

const SeguroScreen = ({ navigation }: any) => {
  const [seguros, setSeguros] = useState<Seguro[]>([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar os seguros da API
  const fetchSeguros = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/seguro/');
      setSeguros(data as Seguro[]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os seguros. ' + error);
    } finally {
      setLoading(false);
    }
  };

  // Carrega os seguros sempre que a tela estiver em foco
  useFocusEffect(useCallback(() => { fetchSeguros(); }, []));

  // Função para lidar com a exclusão de um seguro
  const handleDelete = (id: number) => {
    Alert.alert('Confirmar Exclusão', 'Deseja realmente excluir este seguro?', [
      { text: 'Cancelar' },
      {
        text: 'Excluir',
        onPress: async () => {
          try {
            await api.delete(`/seguro/${id}/`);
            setSeguros(prev => prev.filter(seg => seg.id !== id));
          } catch (error) {
            Alert.alert('Erro', 'Não foi possível excluir o seguro. ' + error);
          }
        },
        style: 'destructive'
      }
    ]);
  };

  // Renderização de cada item da lista
  const renderItem = ({ item }: { item: Seguro }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.tipo}</Text>
        <Text style={styles.details}>Cobertura: {item.cobertura}</Text>
        <Text style={styles.details}>Valor diário: R$ {Number(item.valor_diario).toFixed(2)}</Text>
        <Text style={styles.details}>Franquia: {item.franquia}</Text>
        <Text style={styles.details}>Seguradora: {item.seguradora}</Text>
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity onPress={() => navigation.navigate('EditSeguro', { seguro: item })}>
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
          data={seguros}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CreateSeguro')}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  fab: { position: 'absolute', right: 20, bottom: 20, backgroundColor: '#008080', width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', elevation: 4 },
  card: { backgroundColor: '#1e1e1e', marginVertical: 8, marginHorizontal: 16, borderRadius: 8, padding: 16, marginLeft: 280, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 2, borderWidth: 1, borderColor: '#333', maxWidth: '100%' },
  cardContent: { flex: 1 },
  name: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  details: { fontSize: 14, color: '#aaa', marginTop: 4 },
  cardActions: { flexDirection: 'row', gap: 16 }
});

export default SeguroScreen;