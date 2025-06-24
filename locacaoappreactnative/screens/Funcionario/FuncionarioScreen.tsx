import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import api from '../../services/api';

export type Funcionario = {
  id: number;
  nome: string;
  matricula: string;
  cargo: string;
  data_admissao: string;
  email_corporativo: string;
};

const FuncionarioScreen = ({ navigation }: any) => {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFuncionarios = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/funcionario/');
      setFuncionarios(data as Funcionario[]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os funcionários. ' + error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(useCallback(() => { fetchFuncionarios(); }, []));

  const handleDelete = async (id: number) => {
  try {
    console.log('Enviando DELETE para:', `/funcionario/${id}/`);
    await api.delete(`/funcionario/${id}/`);
    setFuncionarios(prev => prev.filter(f => f.id !== id));
    console.log('Funcionário removido com sucesso.');
  } catch (error: any) {
    console.log('Erro ao excluir funcionário:', error.response?.data || error.message);
  }
};

  const renderItem = ({ item }: { item: Funcionario }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.nome}</Text>
        <Text style={styles.details}>Matrícula: {item.matricula}</Text>
        <Text style={styles.details}>Cargo: {item.cargo}</Text>
        <Text style={styles.details}>Admissão: {item.data_admissao}</Text>
        <Text style={styles.details}>Email: {item.email_corporativo}</Text>
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity onPress={() => navigation.navigate('EditFuncionario', { funcionario: item })}>
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
          data={funcionarios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CreateFuncionario')}>
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

export default FuncionarioScreen;