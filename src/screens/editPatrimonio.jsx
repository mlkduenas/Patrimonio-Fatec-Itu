import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, View, Text, TextInput, Alert, TouchableOpacity, ScrollView } from 'react-native'
import themes from '../themes'
import { MotiView } from 'moti';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { database, auth } from '../../config/firebase'
import { updateDoc, doc } from 'firebase/firestore'
import { Picker } from '@react-native-picker/picker';

import moment from 'moment'

function Animate(props) {
	return (
		<MotiView
			from={{
				rotate: "10deg",
			}}
			animate={{
				rotate: "-10deg",
			}}
			transition={{
				loop: true,
				type: 'timing',
				duration: 1500,
				delay: 100,
			}}
			style={styles.shape}
		>{props.children}</MotiView>
	);
}

const hoje = moment()

export default function Cadastro({navigation, route}){
	const [patrimonio, setPatrimonio] = useState({...route.params, lastEditedAt: hoje.format()});
	const [lockCodigo, setLockCodigo] = useState(patrimonio.codigo != "")

	const handleEditar = async() => {
		if (patrimonio.codigo == ""){
			Alert.alert('Atenção⚠',
			'Informe um código para o patrimônio!');
			return;
		}
		if (patrimonio.nome == ""){
			Alert.alert('Atenção⚠',
			'Informe um nome para o patrimônio!');
			return;
		}
		if (patrimonio.local == ""){
			Alert.alert('Atenção⚠',
			'Informe um local para o patrimônio!');
			return;
		}
		if (patrimonio.estado == ""){
			Alert.alert('Atenção⚠',
			'Informe um estado para o patrimônio!');
			return;
		}

		await updateDoc(doc(database, 'patrimonio', patrimonio.id), patrimonio)
		.then(() => {
			Alert.alert("Sucesso", "Patrimônio editado com sucesso");
			navigation.navigate("Home");
		})
		.catch((error) => {
            Alert.alert('Erro',
            `Erro ao atualizar o patrimônio: ${error.message}`);
        })
		return;
	}

	return (
		<ScrollView contentContainerstyle={styles.container}>
			<View style={{marginBottom: 20}}>
				<MotiView>
					<Animate>
					<Image source={require('../../assets/tool.png')}
					style={styles.icon}/>
					</Animate>
				</MotiView>
			</View>
			<Text style={styles.titulo}>Editar Patrimônio</Text>
			<View style={styles.form}>
				<TextInput
					style = {styles.input}
					onChangeText = {(text) => setPatrimonio(
						{ ...patrimonio, codigo: text })}
					value = {patrimonio.codigo}
					placeholder = "Código"
					keyboardType = "numeric"
					readOnly = {lockCodigo}
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
				<Text style={styles.label}>Estado</Text>
				<Picker
					style = {styles.input}
					selectedValue={patrimonio.estado}
					onValueChange={(itemValue, itemIndex) => {
						setPatrimonio({...patrimonio, estado: itemValue})
					}}>
					<Picker.Item label="Em uso" value="Em uso" />
					<Picker.Item label="Em manutenção" value="Em manutenção" />
					<Picker.Item label="Em baixa" value="Em baixa" />
				</Picker>
				<Text style={styles.label}>Categoria</Text>
				<Picker
					style = {styles.input}
					selectedValue={patrimonio.categoria}
					onValueChange={(itemValue, itemIndex) => {
						setPatrimonio({...patrimonio, categoria: itemValue})
					}}>
					<Picker.Item label="Informática" value="Informática" />
					<Picker.Item label="Mobiliário" value="Mobiliário" />
					<Picker.Item label="Ferramenta" value="Ferramenta" />
					<Picker.Item label="Eletrodoméstico" value="Eletrodoméstico" />
				</Picker>

			<TouchableOpacity
				onPress={handleEditar}
				style={styles.button}
				>
					<MaterialCommunityIcons name="application-edit" size={24} color="white" />
					<Text style={styles.buttonText}>Editar</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: themes.colors.brand.roxoClaro,
		padding: 10
	},
	titulo: {
		margin: 20,
		fontSize: 30,
		alignSelf: "center",
	},
	form: {
		padding: 30
	},
	label: {
		marginTop: 12,
		fontSize: 15
	},
	input: {
		fontSize: 20,
		marginVertical: 10,
		borderRadius: 10,
		borderWidth: 2,
		padding: 10,
		backgroundColor: themes.colors.neutral.foreground
	},
	button: {
		backgroundColor: themes.colors.utility.info,
		marginVertical: 10,
		borderRadius: 10,
		borderWidth: 2,
		padding: 20,
		alignSelf: "center",
		width: "100%",
		flexDirection: "row",
		//justifyContent: "flex-start",
		justifyContent: "center",
		flexWrap: 'wrap'
	},
	buttonText: {
        color: themes.colors.neutral.foreground,
        fontWeight: 'bold',
        textAlign: 'center'
    },
	icon: {
		alignSelf: 'center'
	}
});
