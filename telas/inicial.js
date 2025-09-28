import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { resgatarDados } from '../data_functions/tratar_dados'
import * as FileSystem from 'expo-file-system/legacy'
import { Button, Menu, Provider, IconButton } from 'react-native-paper'

export default function Inicial({escolherTela}) {

    const [receitas, setReceitas] = useState([])
    const [receitasExistem, setReceitasExistem] = useState(false)

    const [menuVisible, setMenuVisible] = useState(false)

    const openMenu = () => setMenuVisible(true)
    const closeMenu = () => setMenuVisible(false)

    useEffect(() => {

        const resgatarReceitas = async () => {

            try{
                const data = await resgatarDados(`${FileSystem.documentDirectory}data`, `${FileSystem.documentDirectory}data/receitas.json`)

                console.log(`Dados resgatados: ${JSON.stringify(data)}`)
                setReceitas(data)
            }
            catch(e){
                console.log(`Erro ao resgatar receitas: ${e}`)
            }
        }

        resgatarReceitas()
    }, [])

    useEffect(() => {

        if(Array.isArray(receitas) && receitas.length > 0){
            setReceitasExistem(true)
        }
        else{
            setReceitasExistem(false)
        }


    }, [receitas])

    const escolherTipoCriacao = () => {

        Alert.alert(
            'Qual método de criação você deseja utilizar?',
            'IA: Uma inteligência artificial cria receitas a partir de seus prompts. \nManual: Você cria suas próprias receitas.',
            [
                {
                    text: 'IA',
                    onPress: () => escolherTela('criar_receita_ia')
                },
                {
                    text: 'Manual',
                    onPress: () => escolherTela('criar_receita')
                }
            ],
            {  cancelable: true }

        )
    } 


  return (
  <Provider>
    <SafeAreaView style={styles.container}>

        <TouchableOpacity onPress={() => escolherTela('default')}>
            <Text>
                Matriz
            </Text>
        </TouchableOpacity>

        <View style={styles.header}>
            <TextInput placeholder='Busque por nome da receita' style={styles.inputBuscarReceita}></TextInput>

            
            <Menu visible={menuVisible} onDismiss={() => closeMenu()} anchor={
                <IconButton onPress={() => openMenu()} icon={'dots-vertical'}></IconButton>
            }>
            <Menu.Item title={'Limpar dados do aplicativo'} onPress={() => closeMenu()}></Menu.Item>
            </Menu>


        </View>

        <ScrollView style={styles.content}>

            <View style={[receitasExistem ? styles.desativado : styles.semReceitas]}>

                <Text>
                    Nenhuma receita encontrada
                </Text>
            </View>

            <View style={[receitasExistem ? styles.receitas : styles.desativado]}>

                {receitas.map((receita, index) => {

                        return(
                        <TouchableOpacity key={index} style={styles.btnReceitas}>
                            <Text style={{fontSize: 15, textAlign: 'center'}}>
                                {receita.tituloReceita}
                            </Text>
                        </TouchableOpacity>
                        )
                })}


            </View>

            
            
        </ScrollView>
        
        <TouchableOpacity style={styles.btnAddReceitas} onPress={() => escolherTipoCriacao()}>
                <Image source={require('../imgs/mais.png')} resizeMode='contain' style={{height: 45, alignSelf: 'center'}}></Image>
        </TouchableOpacity>
    </SafeAreaView>
    </Provider>
  )
}

const styles = StyleSheet.create({

    inputBuscarReceita: {
        borderWidth: 0.5,
        flex: 1,
        borderRadius: 8,
        height: 40,
        marginBottom: 20,
        marginRight: 10,
        paddingHorizontal: 10
    },
    header: {
        borderBottomColor: 'grey',
        borderBottomWidth: 0.5,
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 10
    },
    desativado: {
        display: 'none'
    },
    semReceitas: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    content: {
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: '#fffff3'
    },
    btnReceitas: {
        margin: 10,
        marginBottom: 20,
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
        width: 170,
        height: 190,
        borderRadius: 10,
        borderColor: 'red',
        borderWidth: 0.8,
        elevation: 30
    },
    receitas: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginLeft: 25,
        marginRight: 15,
        marginTop: 20
    },
    btnAddReceitas: {
        backgroundColor: '#a6b985',
        borderRadius: 500,
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignSelf: 'flex-end',
        margin: 30,
        position: 'absolute',
        marginTop: 800,
        elevation: 30
    }
})