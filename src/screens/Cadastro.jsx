import React, { useState } from 'react'
import { StyleSheet, View, Text, Image, TextInput, Button, Alert } from 'react-native'
import themes from '../themes'

export default function Cadastro({navigation, route}){
	// codigo pra consultar a database e verificar o cadastro do patrimonio
	const [editar, setEditar] = useState(true); // true se ja existe, false se não

	const { data } = route.params;
	const [codigo, setCodigo] = useState(data);
	const [nome, setNome] = useState('');
	const [local, setLocal] = useState('');

	function handleCadastro(){
		Alert.alert("Cadastro", "Cadastro")
		return;
	}

	function handleEditar(){
		Alert.alert("Editar", "Editar")
		return;
	}

	return (
		<View>
			<Text style={styles.titulo}>{(editar ? "Editar" : "Cadastrar")} Patrimonio</Text>
			<TextInput
				style = {styles.input}
				onChangeText = {setCodigo}
				value = {codigo}
				placeholder = "Código"
				keyboardType = "numeric"
				readOnly = {editar}
			/>
			<TextInput
				style = {styles.input}
				onChangeText = {setNome}
				value = {nome}
				placeholder = "Nome"
			/>
			<TextInput
				style = {styles.input}
				onChangeText = {setLocal}
				value = {local}
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
