import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { resgatarDados, deletarTodosDados } from '../data_functions/tratar_dados'
import * as FileSystem from 'expo-file-system/legacy'
import { Provider, IconButton, Modal } from 'react-native-paper'
import { Dropdown } from 'react-native-element-dropdown'
import useBuscaFuse from '../data_functions/busca_fuse'

export default function Inicial({escolherTela}) {

    const [receitas, setReceitas] = useState([])

    const {resultado, setTermoBusca} = useBuscaFuse(receitas)


    const [modalVisivel, setModalVisivel] = useState(false)
    const [receitaEscolhida, setReceitaEscolhida] = useState(null)

    const receitasExistem = Array.isArray(resultado) && resultado.length > 0


    const limparTodosDados = async () => {
        console.log('funcao de apagar dados')

        await deletarTodosDados(`${FileSystem.documentDirectory}data`, `${FileSystem.documentDirectory}data/IDs_existentes.json`)
        await deletarTodosDados(`${FileSystem.documentDirectory}data`, `${FileSystem.documentDirectory}data/receitas.json`)

        setReceitas([])

        Alert.alert('Todos os dados foram apagados com sucesso!')
      }

    const abrirReceita = (receita) => {

        setReceitaEscolhida(receita)
        setModalVisivel(true)

        console.log('receita chamada')
    }

    const fecharReceita = () => {
        setModalVisivel(false)
    }

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

    const abrirOpcoes = () => {

        Alert.alert(
            'Opções',
            'Opções do aplicativo',
            [
                {
                    text: 'Apagar todos os dados',
                    onPress: () => limparTodosDados()
                }
            ],
            {cancelable: true}
        )
    }


  return (
  <Provider>
    <SafeAreaView style={styles.container}>

        <TouchableOpacity onPress={() => escolherTela('default')} style={styles.desativado}>
            <Text>
                Matriz
            </Text>
        </TouchableOpacity>

        <View style={styles.header}>
            <TextInput placeholder='Busque por nome da receita' style={styles.inputBuscarReceita} onChangeText={(text) => setTermoBusca(text)}></TextInput>

            <TouchableOpacity onPress={() => abrirOpcoes()}>
                <Image source={require('../imgs/tres_pontos.png')} resizeMode='contain' style={{height: 20, width: 20, marginBottom: 20}}></Image>
            </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>

            <View style={[receitasExistem ? styles.desativado : styles.semReceitas]}>

                <Text>
                    Nenhuma receita encontrada
                </Text>
            </View>

            <View style={[receitasExistem ? styles.receitas : styles.desativado]}>

                {resultado?.map((receita, index) => {

                        return(
                        <TouchableOpacity key={index} style={styles.btnReceitas} onPress={() => abrirReceita(receita)}>
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
        
        
        <Modal animationType={'slide'} onDismiss={() => fecharReceita()} visible={modalVisivel} >

        <ScrollView style={styles.containerReceita}>

            <Text style={styles.tituloReceita}>
                {receitaEscolhida ? receitaEscolhida.tituloReceita : 'Carregando...'}
            </Text>

            <Text style={styles.modoPreparo}>

                {receitaEscolhida ? receitaEscolhida.modoPreparo : 'Não carregado'}
            </Text>

            <Text style={styles.tituloIngredientes}>
                Ingredientes
            </Text>

            <View style={styles.ingredientes}>

                {receitaEscolhida ? receitaEscolhida.ingredientes.map((ingrediente, index) => {
                    return <Text key={index}>{ingrediente}</Text>
                }) : 'Não carregado'}
            </View>

            <View style={styles.infoAdicionais}>

                <Text>
                    Tempo de preparo: {receitaEscolhida ? receitaEscolhida.tempoPreparo : 'Não carregado'}
                </Text>
                <Text>
                    Porções: {receitaEscolhida ? receitaEscolhida.porcoes : 'Não carregado'}
                </Text>
            </View>

        </ScrollView>

        </Modal>
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
        marginBottom: 10,
        zIndex: 10
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
        backgroundColor: '#a6b985',
        alignItems: 'center',
        justifyContent: 'center',
        width: 170,
        height: 190,
        borderRadius: 10,
        borderColor: '#47793b',
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
    },
    containerReceita: {
        backgroundColor: '#a7de96',
        marginRight: 35,
        marginLeft: 35,
        height: 600,
        borderRadius: 12
    },
    tituloReceita: {
        marginLeft: 30,
        marginTop: 30,
        fontSize: 25
    },
    modoPreparo: {
        margin: 30,
        marginBottom: 40
    },
    tituloIngredientes: {
        marginLeft: 30,
        marginTop: 30,
        fontSize: 25
    },
    ingredientes: {
        margin: 30,
        marginBottom: 40
    },
    infoAdicionais: {
        margin: 30,
        justifyContent: 'space-between',
    },
})