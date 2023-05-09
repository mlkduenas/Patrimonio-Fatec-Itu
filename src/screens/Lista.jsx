import React, {useState, useEffect, useLayoutEffect} 
       from 'react'
import {View, Text, Alert, ActivityIndicator, ScrollView, StyleSheet} from 'react-native'
import BotaoFlutuante from '../components/BotaoFlutuante'
import themes from '../themes'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {auth, database} from '../../config/firebase'
import {signOut} from 'firebase/auth'
import {collection, onSnapshot, orderBy, query, where, addDoc} 
       from 'firebase/firestore'
import Patrimonio from '../components/Patrimonio'       

export default function Home({navigation}){
    const [busca, setBusca] = useState('')
    const [patrimonios, setPatrimonios] = useState([])
    const [carregaPatrimonios, setCarregaPatrimonios] = useState(false)

    useEffect(() => {
        setCarregaPatrimonios(true)
        const collectionRef = collection(database, 'patrimonio')
        const q = query(collectionRef, where("usuarioInclusao", "==", auth.currentUser.uid))
        const getPatrimonios = onSnapshot(q, querySnapshot => {
            setPatrimonios(
                querySnapshot.docs.map(doc => ({
                    id: doc.id, 
                    codigo: doc.data().codigo,
                    nome: doc.data().nome,
                    local: doc.data().local,
                    createdAt: doc.data().createdAt
                }))
            )
        })

        setCarregaPatrimonios(false)
        return getPatrimonios
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{paddingBottom: 64}}>

                <Text style={styles.tituloApp}>Controle de Patrimonios</Text>    

                {carregaPatrimonios && 
                    <ActivityIndicator size="large"
                    color={themes.colors.brand.roxoEscuro}/>}
                
                {
                    patrimonios.map(dadoPatrimonio => 
                    <Patrimonio key={dadoPatrimonio.id} {...dadoPatrimonio} />)
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themes.colors.brand.roxoEscuro,
        margin: 0
    },
    tituloApp: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: themes.colors.neutral.foreground,
        padding: 8,
        alignSelf: "center",
    },
    buscaInput: {
        color: themes.colors.neutral.foreground,
        backgroundColor: themes.colors.neutral.neutral100,
        borderBottomColor: themes.colors.utility.contrast,
        marginHorizontal: 100,
        marginBottom: 8,
        padding: 8,
        borderBottomWidth: 2,
        textAlign: 'center',

    }
});