import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native'
import themes from '../themes'

import { database, auth } from '../../config/firebase'
import { collection, addDoc, query, where, updateDoc, onSnapshot, doc } from 'firebase/firestore'

import moment from 'moment'
const hoje = moment()

export default function Cadastro({navigation, route}){
	const { data } = route.params;
	const [editar, setEditar] = useState(false); // true se ja existe, false se não
	const [docId, setDocId] = useState('');

	const [patrimonio, setPatrimonio] = useState({
		codigo: data,
		nome: '',
		local: '',
        createdAt: hoje.format(),
        usuarioInclusao: auth.currentUser.uid
	})

	useEffect(() => {
		const patrimonioRef = collection(database, "patrimonio");
		const q = query(patrimonioRef, where("codigo", "==", data));
		onSnapshot(q, querySnapshot => {
			if (!querySnapshot.empty) {
				setEditar(true);
				setPatrimonio({ ...patrimonio,
					nome: querySnapshot.docs[0].data().nome,
					local: querySnapshot.docs[0].data().local,
				});
				setDocId(querySnapshot.docs[0].id)
			}
		})
	   }, [])

	// codigo pra consultar a database e verificar o cadastro do patrimonio
	

	const handleCadastro = async() => {
		await addDoc(collection(database, 'patrimonio'), patrimonio)
		.then(() => {
			Alert.alert("Sucesso", "Patrimônio editado com sucesso");
			navigation.goBack();
		})
		.catch((error) => {
            Alert.alert('Erro',
            `Erro ao adicionar o doc: ${error.message}`)
        })
        navigation.goBack()
		return;
	}

	const handleEditar = async() => {
		await updateDoc(doc(database, 'patrimonio', docId), patrimonio)
		.then(() => {
			Alert.alert("Sucesso", "Patrimônio editado com sucesso");
			navigation.goBack();
		})
		.catch((error) => {
            Alert.alert('Erro',
            `Erro ao atualizar o doc: ${error.message}`);
        })
		return;
	}

	return (
		<View>
			<Text style={styles.titulo}>{(editar ? "Editar" : "Cadastrar")} Patrimônio</Text>
			<TextInput
				style = {styles.input}
				onChangeText = {(text) => setPatrimonio(
                    { ...patrimonio, codigo: text })}
				value = {patrimonio.codigo}
				placeholder = "Código"
				keyboardType = "numeric"
				readOnly = {editar}
			/>
			<TextInput
				style = {styles.input}
				onChangeText = {(text) => setPatrimonio(
                    { ...patrimonio, nome: text })}
				value = {patrimonio.nome}
				placeholder = "Nome"
			/>
			<TextInput
				style = {styles.input}
				onChangeText = {(text) => setPatrimonio(
                    { ...patrimonio, local: text })}
				value = {patrimonio.local}
				placeholder = "Local"
			/>
			<Button
				onPress={(editar ? handleEditar : handleCadastro)}
				title={(editar ? "Editar" : "Cadastrar")}
			/>
			<Button
				onPress={() => setEditar(!editar)}
				title="Switch Cadastro/Edição"
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	titulo: {
		margin: 20,
		fontSize: 30,
		alignSelf: "center",
	},
	input: {
		fontSize: 20,
		margin: 10,
		borderWidth: 1,
		padding: 10,
		paddingLeft: 10,
	},
});
