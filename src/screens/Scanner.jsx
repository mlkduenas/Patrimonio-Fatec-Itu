import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Linking, Alert, Pressable, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import BotaoFlutuante from '../components/BotaoFlutuante';
import themes from '../themes'


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

				<Pressable onPress={() => {setScanned(false); navigation.navigate("Cadastro", { data })}}
					style={({pressed}) => [
						{backgroundColor: pressed ? themes.colors.brand.vermelhoClaro : themes.colors.brand.vermelhoEscuro},
						styles.botao]}>
					<Text style={styles.btnTexto}>ESCANEAR NOVAMENTE</Text>
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
		borderWidth: 1
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
		borderWidth: 1
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

