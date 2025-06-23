import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';

type Veiculo = { id: number; modelo: string; marca: string };
type Seguro = { id: number; tipo: string };
type Locacao = { id: number };

type CarrinhoLocacao = {
  id: number;
  locacao?: Locacao;
  nome_cliente: string;
  veiculo?: Veiculo;
  marca_veiculo: string;
  seguro?: Seguro;
  seguro_nome: string;
  quantidade: number;
  preco_unitario: number;
};

const CarrinhoLocacaoScreen = ({ navigation }: any) => {
  const [itens, setItens] = useState<CarrinhoLocacao[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItens = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/carrinholocacao/');
      setItens(data as CarrinhoLocacao[]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar o carrinho. ' + error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => { fetchItens(); }, []);

  const handleDelete = (id: number) => {
    Alert.alert('Remover item', 'Deseja remover este item do carrinho?', [
      { text: 'Cancelar' },
      {
        text: 'Remover',
        onPress: async () => {
          try {
            await api.delete(`/carrinholocacao/${id}/`);
            setItens(prev => prev.filter(item => item.id !== id));
          } catch (error) {
            Alert.alert('Erro', 'Não foi possível remover o item. ' + error);
          }
        },
        style: 'destructive'
      }
    ]);
  };

  const renderItem = ({ item }: { item: CarrinhoLocacao }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.name}>
             {item.quantidade}x {item.veiculo?.modelo ?? 'Veículos'}
        </Text>
        <Text style={styles.details}>Locação: {item.nome_cliente ?? '--'}</Text>
        <Text style={styles.details}>Marca: {item.marca_veiculo ?? '--'}</Text>
        <Text style={styles.details}>Seguro: {item.seguro_nome ?? '--'}</Text>
        <Text style={styles.details}>Preço unitário: R$ {Number(item.preco_unitario).toFixed(2)}</Text>
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity onPress={() => navigation.navigate('EditCarrinho', { carrinho: item })}>
                  <Ionicons name="create" size={24} color='#3fd941' />
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
          data={itens}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CreateCarrinho')}>
              <Ionicons name="add" size={28} color="#fff" />
            </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  card: { backgroundColor: '#1e1e1e', marginVertical: 8, marginLeft: 280, marginHorizontal: 16, borderRadius: 8, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 2, borderWidth: 1, borderColor: '#333', maxWidth: '100%' },
  cardContent: { flex: 1 },
  fab: { position: 'absolute', right: 20, bottom: 20, backgroundColor: '#3fd941', width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', elevation: 4 },
  name: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  details: { fontSize: 14, color: '#aaa', marginTop: 4 },
  cardActions: { flexDirection: 'row', gap: 16 }
});

export default CarrinhoLocacaoScreen;