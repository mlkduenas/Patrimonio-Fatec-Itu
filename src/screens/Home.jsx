import React, { useLayoutEffect } from 'react'
import { StyleSheet, View, Text, Image, Alert, Button, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import BotaoFlutuante from '../components/BotaoFlutuante'
import themes from '../themes'
import { MotiView } from 'moti';
import { auth } from '../../config/firebase'
import { signOut } from 'firebase/auth'

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

export default function Home({navigation}){
	useLayoutEffect(()=> {
        navigation.setOptions({
            headerLeft: () => <></>, //remove o voltar
            headerRight: () => <MaterialCommunityIcons.Button
                    name="logout"
                    backgroundColor={themes.colors.brand.roxoEscuro}
                    onPress={() => {signOut(auth).then(() => {navigation.navigate('Login')})}}>
                </MaterialCommunityIcons.Button>
        })
    }, [navigation])

	function checkLogin(){
		if(auth.currentUser != null) {
			navigation.navigate("Scanner");
		}
		else{
			Alert.alert("Erro", "É necessário realizar o login antes de escanear");
		}
	}

	return (
		<View style={styles.container}>
			<View>
				<View style={styles.logo_fundo}>   
					<Text style={styles.texto}>SCAN<Text style={styles.subtexto}>dinavia</Text></Text>
				</View>
				<Image source={require('../../assets/viking128px.png')}
					style={styles.scanButton}/>
			</View>
			<View style={{marginBottom: 20}}>
				<MotiView>
					<Animate>
						<BotaoFlutuante onPress={checkLogin}
							icon="qrcode-scan" size={150} style={styles.scanButton}/> 
					</Animate>
				</MotiView>
				{/* <BotaoFlutuante onPress={checkLogin}
					icon="qrcode-scan" size={150} style={styles.button}/>  */}
				
				<TouchableOpacity
					onPress={() => navigation.navigate('Lista')}
					style={styles.button}
				><Text style={styles.buttonText}>Lista de Patrimônios</Text></TouchableOpacity>
				<TouchableOpacity
					onPress={() => navigation.navigate('addPatrimonio')}
					style={styles.button}
				><Text style={styles.buttonText}>Cadastrar patrimônio</Text></TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: themes.colors.brand.roxoClaro,
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	logo_fundo: {
		backgroundColor: themes.colors.brand.roxoEscuro,
		margin: 20,
		padding: 10,
		borderRadius: 16
	},
	texto: {
		color: '#e2e6e7',
		fontSize: 30,
		fontWeight: 800,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center'
	},
	subtexto: {
		color: "#000000",
		fontSize: 30,
		fontWeight: 800,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center'
	},
	scanButton: {
		marginBottom: 20,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
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
	shape: {
		justifyContent: 'center',
		borderRadius: 25,
		marginRight: 10,
	},
});
