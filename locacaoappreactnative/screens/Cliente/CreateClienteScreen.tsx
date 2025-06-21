import React, { useState } from 'react';
import { ActivityIndicator, Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import api from '../../services/api';

const CreateClienteScreen = ({ navigation }: any) => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [cnh, setCnh] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cidade, setCidade] = useState('');
  const [saving, setSaving] = useState(false);

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
      await api.post('/cliente/', clienteData);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o cliente. ' + error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Nome" placeholderTextColor="#999" />

      <Text style={styles.label}>CPF</Text>
      <TextInput style={styles.input} value={cpf} onChangeText={setCpf} placeholder="CPF" placeholderTextColor="#999" />

      <Text style={styles.label}>CNH</Text>
      <TextInput style={styles.input} value={cnh} onChangeText={setCnh} placeholder="CNH" placeholderTextColor="#999" />

      <Text style={styles.label}>Telefone</Text>
      <TextInput style={styles.input} value={telefone} onChangeText={setTelefone} placeholder="Telefone" placeholderTextColor="#999" />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="Email" placeholderTextColor="#999" />

      <Text style={styles.label}>Data de Nascimento</Text>
      <TextInput style={styles.input} value={dataNascimento} onChangeText={setDataNascimento} placeholder="Data de Nascimento"  placeholderTextColor="#999" />

      <Text style={styles.label}>Endereço</Text>
      <TextInput style={styles.input} value={endereco} onChangeText={setEndereco} placeholder="Endereço" placeholderTextColor="#999" />

      <Text style={styles.label}>Cidade</Text>
      <TextInput style={styles.input} value={cidade} onChangeText={setCidade} placeholder="Cidade" placeholderTextColor="#999" />

      <View style={styles.buttonContainer}>
        {!saving && <Button title="Salvar" onPress={handleSave} color="#3498db" />}
        {saving && <ActivityIndicator size="large" color="#3498db" />}
        <View style={{ marginTop: 10 }}>
          <Button title="Voltar" onPress={() => navigation.goBack()} color="#888" disabled={saving} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#121212' },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 0, marginBottom: 0, color: '#FFFFFF' },
  input: { borderWidth: 1, borderColor: '#555', borderRadius: 8, padding: 12, fontSize: 16, marginLeft: 280, color: '#FFFFFF', marginBottom: 12 },
  buttonContainer: { marginTop: 8, marginBottom: 40 , marginLeft: 280, },
});

export default CreateClienteScreen;