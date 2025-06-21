import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import api from '../../services/api';

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

const EditClienteScreen = ({ route, navigation }: any) => {
  const { cliente } = route.params as { cliente: Cliente };

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [cnh, setCnh] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cidade, setCidade] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (cliente) {
      setNome(cliente.nome);
      setCpf(cliente.cpf);
      setCnh(cliente.cnh);
      setTelefone(cliente.telefone);
      setEmail(cliente.email);
      setDataNascimento(cliente.data_nascimento);
      setEndereco(cliente.endereco);
      setCidade(cliente.cidade || '');
    }
  }, [cliente]);

  const handleSave = async () => {
    if (!nome || !cpf || !cnh || !telefone || !email || !dataNascimento || !endereco) {
      Alert.alert('Erro', 'Todos os campos obrigatórios devem ser preenchidos.');
      return;
    }
    setSaving(true);

    const clienteData = {
      nome,
      cpf,
      cnh,
      telefone,
      email,
      data_nascimento: dataNascimento,
      endereco,
      cidade,
    };

    try {
      await api.put(`/clientes/${cliente.id}/`, clienteData);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o cliente. ' + error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />

      <Text style={styles.label}>CPF</Text>
      <TextInput style={styles.input} value={cpf} onChangeText={setCpf} />

      <Text style={styles.label}>CNH</Text>
      <TextInput style={styles.input} value={cnh} onChangeText={setCnh} />

      <Text style={styles.label}>Telefone</Text>
      <TextInput style={styles.input} value={telefone} onChangeText={setTelefone} />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />

      <Text style={styles.label}>Data de Nascimento</Text>
      <TextInput style={styles.input} value={dataNascimento} onChangeText={setDataNascimento} placeholder="YYYY-MM-DD" />

      <Text style={styles.label}>Endereço</Text>
      <TextInput style={styles.input} value={endereco} onChangeText={setEndereco} />

      <Text style={styles.label}>Cidade</Text>
      <TextInput style={styles.input} value={cidade} onChangeText={setCidade} />

      <View style={styles.buttonContainer}>
        {!saving && <Button title="Salvar Alterações" onPress={handleSave} color="#3498db" />}
        {saving && <ActivityIndicator size="large" color="#3498db" />}
        <View style={{ marginTop: 10 }}>
          <Button title="Voltar" onPress={() => navigation.goBack()} color="#888" disabled={saving} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#1c1c1e' },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 12, marginBottom: 4, color: '#FFFFFF' },
  input: { borderWidth: 1, borderColor: '#555', borderRadius: 8, padding: 12, fontSize: 16, color: '#FFFFFF', marginBottom: 12 },
  buttonContainer: { marginTop: 20, marginBottom: 40 },
});

export default EditClienteScreen;