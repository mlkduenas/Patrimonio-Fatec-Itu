import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Linking, Alert, Pressable, Dimensions, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import BotaoFlutuante from '../components/BotaoFlutuante';
import themes from '../themes'

import { database, auth } from '../../config/firebase'
import { collection, query, where, onSnapshot, doc } from 'firebase/firestore'

export default function Scanner({navigation}) {
	const [hasPermission, setHasPermission] = useState(false);
	const [scanned, setScanned] = useState(false);
	const [data, setData] = useState('');

	useEffect(() => {
		(async () => {
			const { granted } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(granted);
		})();
	}, []);

	const handleBarCodeScanned = ({ data }) => {
		setScanned(true);
		setData(data);
	};

	const addPatrimonio = () => {
		const patrimonioRef = collection(database, "patrimonio");
		const q = query(patrimonioRef, where("codigo", "==", data), where("usuarioInclusao", "==", auth.currentUser.uid));
		onSnapshot(q, querySnapshot => {
			if (!querySnapshot.empty) {
				const doc = querySnapshot.docs[0];
				const patrimonio = {
					id: doc.id, 
					codigo: doc.data().codigo,
					nome: doc.data().nome,
					local: doc.data().local,
					createdAt: doc.data().createdAt
				}
				navigation.navigate("editPatrimonio", patrimonio);
			}
			else {
				navigation.navigate("addPatrimonio", { data });
			}
		setScanned(false);
		})
	}

	if (hasPermission === null) {
		return <Text style={styles.texto}>Solicitando permissão para usar a câmera</Text>;
	}
	if (hasPermission === false) {
		return <Text style={styles.texto}>Acesso negado à câmera</Text>;
	}

	return (
		<View style={styles.container}>
		{scanned ? (
			<View>
				<View style={styles.fundourl}>
					<Text style={styles.data}>{data}</Text>
				</View>

				<Pressable onPress={addPatrimonio}
					style={({pressed}) => [
						{backgroundColor: pressed ? themes.colors.brand.vermelhoClaro : themes.colors.brand.vermelhoEscuro},
						styles.botao]}>
					<Text style={styles.btnTexto}>Editar/Cadastrar Patrimônio</Text>
				</Pressable>
			</View>
		) : ( 
			<BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={{
				width: Dimensions.get('screen').width * 1.5,
				height: Dimensions.get('screen').height * 1.5,
			}} />
		)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		position: "relative",
		flex: 1,
		backgroundColor: themes.colors.brand.roxoClaro,
		alignItems: 'center',
		justifyContent: 'center',
	},
	fundourl: {
		backgroundColor: themes.colors.brand.roxoEscuro,
		borderRadius: 10,
		borderWidth: 2
	},
	data: {
		fontSize: 20,
		color: 'black',
		margin: 10,
		padding: 15,
		alignSelf: 'center'
	},
	texto: {
		fontSize: 30,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center'
	},
	botao: {
		//backgroundColor: themes.colors.brand.vermelhoEscuro,
		marginTop: 15,
		padding: 15,
		borderRadius: 8,
		borderWidth: 2
	},
	fileBtn: {
		alignSelf: "center",
		position: "absolute",
		bottom: Dimensions.get('screen').height / 8,
	},
	btnTexto: {
		color: 'white',
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		fontWeight: 600
	}
});

