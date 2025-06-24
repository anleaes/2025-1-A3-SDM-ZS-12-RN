import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import api from '../../services/api';

export type Acessorio = {
  id: number;
  nome: string;
  descricao?: string;
  valor_adicional: number;
  categoria: 'Segurança' | 'Conforto' | 'Entretenimento' | 'Utilitário';
};

const AcessorioScreen = ({ navigation }: any) => {
  const [acessorios, setAcessorios] = useState<Acessorio[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAcessorios = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/Acessorio/');
      setAcessorios(
        (data as Acessorio[]).map(acc => ({
          ...acc,
          valor_adicional: Number(acc.valor_adicional),
        }))
      );
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os acessórios. ' + error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(useCallback(() => { fetchAcessorios(); }, []));

  const handleDelete = async (id: number) => {
  try {
    console.log('Enviando DELETE para:', `/acessorio/${id}/`);
    await api.delete(`/acessorio/${id}/`);
    setAcessorios(prev => prev.filter(acc => acc.id !== id));
    console.log('Acessório removido com sucesso.');
  } catch (error: any) {
    console.log('Erro ao deletar acessório:', error.response?.data || error.message);
  }
};

  const renderItem = ({ item }: { item: Acessorio }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.nome}</Text>
        {item.descricao ? <Text style={styles.details}>{item.descricao}</Text> : null}
        <Text style={styles.details}>Categoria: {item.categoria}</Text>
        <Text style={styles.details}>Valor adicional: R$ {Number(item.valor_adicional).toFixed(2)}</Text>
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity onPress={() => navigation.navigate('EditAcessorio', { acessorio: item })}>
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
          data={acessorios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CreateAcessorio')}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  fab: { position: 'absolute', right: 20, bottom: 20, backgroundColor: '#008080', width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', elevation: 4 },
  card: { backgroundColor: '#1e1e1e', marginVertical: 8, marginHorizontal: 16, borderRadius: 8, marginLeft: 280, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 2, borderWidth: 1, borderColor: '#333', maxWidth: '100%' },
  cardContent: { flex: 1 },
  name: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  details: { fontSize: 14, color: '#aaa', marginTop: 4 },
  cardActions: { flexDirection: 'row', gap: 16 }
});

export default AcessorioScreen;