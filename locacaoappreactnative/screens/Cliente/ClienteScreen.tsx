import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import api from '../../services/api';

// Definição da interface Cliente
export type Cliente = {
  id: number;
  nome: string;
  cpf: string;
  cnh: string;
  telefone: string;
  email: string;
  data_nascimento: string;
  endereco: string;
  cidade?: string;
};

const ClienteScreen = ({ navigation }: any) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar os clientes da API
  const fetchCliente = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/cliente/');
      setClientes(data as Cliente[]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os clientes. ' + error);
    } finally {
      setLoading(false);
    }
  };

  // Carrega os clientes sempre que a tela estiver em foco
  useFocusEffect(useCallback(() => { fetchCliente(); }, []));

  // Função para lidar com a exclusão de um cliente
  const handleDelete = async (id: number) => {
  try {
    console.log('Enviando DELETE para:', `/cliente/${id}/`);
    const response = await api.delete(`/cliente/${id}/`);
    console.log('Resposta da API ao deletar:', response.status);

    // Atualiza a lista localmente
    setClientes(prev => {
      const novo = prev.filter(cli => cli.id !== id);
      console.log('Clientes após delete:', novo);
      return novo;
    });
  } catch (error: any) {
    console.log('Erro ao deletar:', error.response?.data || error.message);
  }
};

  // Renderização de cada item da lista
  const renderItem = ({ item }: { item: Cliente }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.nome}</Text>
        <Text style={styles.details}>CPF: {item.cpf}</Text>
        <Text style={styles.details}>CNH: {item.cnh}</Text>
        <Text style={styles.details}>Telefone: {item.telefone}</Text>
        <Text style={styles.details}>Email: {item.email}</Text>
        <Text style={styles.details}>Nascimento: {item.data_nascimento}</Text>
        <Text style={styles.details}>Endereço: {item.endereco}</Text>
        {item.cidade && <Text style={styles.details}>Cidade: {item.cidade}</Text>}
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity onPress={() => navigation.navigate('EditCliente', { cliente: item })}>
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
          data={clientes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CreateCliente')}>
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

export default ClienteScreen;