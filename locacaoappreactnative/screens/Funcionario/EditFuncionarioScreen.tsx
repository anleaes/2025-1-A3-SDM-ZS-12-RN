import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import api from '../../services/api';

export type Funcionario = {
  id: number;
  nome: string;
  matricula: string;
  cargo: string;
  data_admissao: string;
  email_corporativo: string;
};

const EditFuncionarioScreen = ({ route, navigation }: any) => {
  const { funcionario } = route.params as { funcionario: Funcionario };

  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [cargo, setCargo] = useState('');
  const [dataAdmissao, setDataAdmissao] = useState('');
  const [emailCorporativo, setEmailCorporativo] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (funcionario) {
      setNome(funcionario.nome);
      setMatricula(funcionario.matricula);
      setCargo(funcionario.cargo);
      setDataAdmissao(funcionario.data_admissao);
      setEmailCorporativo(funcionario.email_corporativo);
    }
  }, [funcionario]);

  const handleSave = async () => {
    if (!nome || !matricula || !cargo || !dataAdmissao || !emailCorporativo) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }
    setSaving(true);

    const funcionarioData = {
      nome,
      matricula,
      cargo,
      data_admissao: dataAdmissao,
      email_corporativo: emailCorporativo,
    };

    try {
      await api.put(`/funcionario/${funcionario.id}/`, funcionarioData);
      navigation.goBack();
    } catch (error) {
      if (typeof error === 'object' && error !== null) {
        const err = error as { response?: any; message?: string };
        console.log('Erro:', err.response?.data || err.message || err);
        Alert.alert('Erro', 'Não foi possível atualizar o funcionário. ' + (err.response?.data?.detail || err.message));
      } else {
        console.log('Erro:', error);
        Alert.alert('Erro', 'Não foi possível atualizar o funcionário.');
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Nome" placeholderTextColor="#999" />

      <Text style={styles.label}>Matrícula</Text>
      <TextInput style={styles.input} value={matricula} onChangeText={setMatricula} placeholder="Matrícula" placeholderTextColor="#999" />

      <Text style={styles.label}>Cargo</Text>
      <TextInput style={styles.input} value={cargo} onChangeText={setCargo} placeholder="Cargo" placeholderTextColor="#999" />

      <Text style={styles.label}>Data de Admissão</Text>
      <TextInput style={styles.input} value={dataAdmissao} onChangeText={setDataAdmissao} placeholder="YYYY-MM-DD" placeholderTextColor="#999" />

      <Text style={styles.label}>Email Corporativo</Text>
      <TextInput style={styles.input} value={emailCorporativo} onChangeText={setEmailCorporativo} placeholder="Email Corporativo" placeholderTextColor="#999" keyboardType="email-address" />

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
  input: { borderWidth: 1, borderColor: '#555', borderRadius: 8, padding: 12, marginLeft: 280, fontSize: 16, color: '#FFFFFF', marginBottom: 12 },
  buttonContainer: { marginTop: 20, marginBottom: 40, marginLeft: 280, },
});

export default EditFuncionarioScreen;