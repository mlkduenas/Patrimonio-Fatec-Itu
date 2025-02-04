import React, { useState, useEffect, useLayoutEffect } from 'react'
import { useSafeAreaInsets }
    from 'react-native-safe-area-context'
import { View, Text, TouchableOpacity, StyleSheet, 
         Image, TextInput, Alert } from 'react-native'
import themes from '../themes'
import { auth } from '../../config/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default function Login({navigation, route}) {
    useLayoutEffect(()=> {
        navigation.setOptions({
            headerLeft: () => <></>,
        })
    }, [navigation])

    const insets = useSafeAreaInsets();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    useEffect(() => {
        if (route.params?.email) {
            setEmail(route.params.email);
            setSenha('123456');
        }
    }, [route.params?.email]);
    
    
    const handleLogin = async() => {
        //Efetuando as validações básicas do form
        if(email === '' || senha ===''){
            Alert.alert('Atenção⚠',
            'Informe um email e senha para efetuar o login')
            return
        }
        if(senha.length < 6){
            Alert.alert('Atenção⚠',
            'A senha deve ter no mínimo 6 caracteres')
            return  
        }

        signInWithEmailAndPassword(auth, email, senha)
        .then(() => {
            navigation.navigate("Home");
        })
        .catch((error) => {
            Alert.alert('Erro',
            `Erro ao efetuar o login: ${error.message}`)
        })
    }

    return (
        <View style={{
            paddingTop: insets.top,
            // backgroundColor: themes.colors.brand.roxoEscuro,
            flex: 1
        }}>
            <View style={styles.container}>
                <Text style={styles.titulo}>Login</Text>
                <Image source={require('../../assets/icon.png')}
                    style={styles.logo} />

                <View style={styles.form}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        placeholder="Digite seu email"
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        autoCompleteType="email" />

                    <Text style={styles.label}>Senha</Text>
                    <TextInput
                        placeholder='Digite sua senha'
                        style={styles.input}
                        value={senha}
                        onChangeText={setSenha}
                        secureTextEntry />

                    <TouchableOpacity style={styles.loginButton}
                        onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>
                            Login
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Signup')}>
                        <Text>
                            Ainda não é usuário? Registre-se
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: themes.colors.brand.roxoClaro,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 16,
        borderRadius: 16
    },
    titulo: {
        fontSize: 24,
        color: themes.colors.brand.roxoEscuro,
        marginVertical: 8
    },
    logo: {
        width: 200,
        height: 200,
        marginVertical: 16
    },
    input: {
        borderWidth: 1,
        borderColor: themes.colors.brand.roxoEscuro,
        backgroundColor: themes.colors.neutral.foreground,
        borderRadius: 8,
        padding: 8,
        marginBottom: 8
    },
    form: {
        width: '80%'
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: themes.colors.brand.roxoEscuro
    },
    loginButton: {
        backgroundColor: themes.colors.utility.info,
        borderRadius: 4,
        padding: 16,
        marginVertical: 8
    },
    loginButtonText: {
        color: themes.colors.neutral.foreground,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})