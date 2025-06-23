import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import api from '../../services/api';

const FORMAS_PAGAMENTO = ['Pix', 'Crédito', 'Débito', 'Dinheiro'];

type PagamentoProps = {
  route: {
    params: {
      carrinhoId: number;
      valor: number;
    };
  };
  navigation: any;
};

const PagamentoScreen: React.FC<PagamentoProps> = ({ route, navigation }) => {
  const { carrinhoId, valor } = route.params;
  const [formaPagamento, setFormaPagamento] = useState<string>('Pix');
  const [loading, setLoading] = useState(false);

  const handlePagamento = async () => {
    setLoading(true);
    try {
      await api.post('/pagamento/', {
        carrinho_locacao: carrinhoId,
        forma_pagamento: formaPagamento,
        valor: valor,
        status: 'Pago'
      });
      Alert.alert('Sucesso', 'Pagamento realizado com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível realizar o pagamento.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pagamento</Text>
      <Text style={styles.label}>Valor total:</Text>
      <Text style={styles.valor}>R$ {valor?.toFixed(2)}</Text>
      <Text style={styles.label}>Forma de pagamento:</Text>
      <View style={styles.formasContainer}>
        {FORMAS_PAGAMENTO.map((forma) => (
          <TouchableOpacity
            key={forma}
            style={[
              styles.formaBtn,
              formaPagamento === forma && styles.formaBtnSelected
            ]}
            onPress={() => setFormaPagamento(forma)}
          >
            <Text style={styles.formaBtnText}>{forma}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={styles.pagarBtn}
        onPress={handlePagamento}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.pagarBtnText}>Pagar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 24 },
  label: { fontSize: 16, color: '#aaa', marginTop: 16 },
  valor: { fontSize: 24, color: '#fff', marginBottom: 16 },
  formasContainer: { flexDirection: 'row', flexWrap: 'wrap', marginVertical: 16 },
  formaBtn: { backgroundColor: '#222', padding: 12, borderRadius: 8, marginRight: 12, marginBottom: 12 },
  formaBtnSelected: { backgroundColor: '#3498db' },
  formaBtnText: { color: '#fff', fontSize: 16 },
  pagarBtn: { backgroundColor: '#27ae60', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 32 },
  pagarBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});

export default PagamentoScreen;