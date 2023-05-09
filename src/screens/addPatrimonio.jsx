import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TextInput, Alert, Pressable, TouchableOpacity } from 'react-native'
import themes from '../themes'

import { database, auth } from '../../config/firebase'
import { collection, addDoc, query, where, updateDoc, onSnapshot, doc } from 'firebase/firestore'

import moment from 'moment'
const hoje = moment()

export default function Cadastro({navigation, route}){
	const { data } = route.params;
	const [vsf, setVsf] = useState(false)

	useEffect(() => {
		setVsf(data == "");
	}, []);

	const [patrimonio, setPatrimonio] = useState({
		codigo: data,
		nome: '',
		local: '',
        createdAt: hoje.format(),
        usuarioInclusao: auth.currentUser.uid
	})

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
		return;
	}

	// const handleEditar = async() => {
	// 	await updateDoc(doc(database, 'patrimonio', patrimonio.id), patrimonio)
	// 	.then(() => {
	// 		Alert.alert("Sucesso", "Patrimônio editado com sucesso");
	// 		navigation.goBack();
	// 	})
	// 	.catch((error) => {
    //         Alert.alert('Erro',
    //         `Erro ao atualizar o doc: ${error.message}`);
    //     })
	// 	return;
	// }

	return (
		<View style={styles.container}>
			<Text style={styles.titulo}>Cadastrar Patrimônio</Text>
			<TextInput
				style = {styles.input}
				onChangeText = {(text) => setPatrimonio(
                    { ...patrimonio, codigo: text })}
				value = {patrimonio.codigo}
				placeholder = "Código"
				keyboardType = "numeric"
				readOnly = {vsf}
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
			<TouchableOpacity
				onPress={handleCadastro}
				style={styles.button}
			><Text style={styles.buttonText}>Cadastrar</Text></TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		margin: 20,
	},
	titulo: {
		margin: 20,
		fontSize: 30,
		alignSelf: "center",
	},
	input: {
		fontSize: 20,
		marginVertical: 10,
		borderRadius: 10,
		borderWidth: 1,
		padding: 10,
	},
	button: {
		backgroundColor: themes.colors.utility.info,
		marginVertical: 10,
		borderRadius: 10,
		borderWidth: 2,
		padding: 10,
		alignSelf: "center",
	},
	buttonText: {
        color: themes.colors.neutral.foreground,
        fontWeight: 'bold',
        textAlign: 'center'
    },
});
