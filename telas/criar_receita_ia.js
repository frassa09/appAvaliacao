import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import gerarReceita, { gerarImagemReceita } from '../development_functions/gemini_api_function'
import { guardarDados } from '../data_functions/tratar_dados'
import gerarId from '../data_functions/gerarID'
import * as FileSystem from 'expo-file-system/legacy'

export default function CriarReceitaIa({escolherTela}) {

    const [promptReceita, setPromptReceita] = useState(null)
    const [gravarPromptReceita, setGravarPromptReceita] = useState(null)
    const [receitaEIngredientes, setReceitaEIngredientes] = useState(['', []])
    const [receitaFoiGerada, setReceitaFoiGerada] = useState(false)
    const [estadoReceita, setEstadoReceita] = useState('Sua receita aparecerá aqui')


    const gerarReceitaIA = async () => {

        setReceitaFoiGerada(false)

        setEstadoReceita('Carregando...')
        setGravarPromptReceita(promptReceita)
        setPromptReceita('')



        const respostaReceita = await gerarReceita(gravarPromptReceita)

        if(respostaReceita[1][0] == 'naogerado'){
            Alert.alert('Você digitou algo que não pôde ser criado')
            setEstadoReceita('Sua receita aparecerá aqui')
            return
        }

        setReceitaEIngredientes(respostaReceita)
    }

    useEffect(() => {

        if(Array.isArray(receitaEIngredientes) && receitaEIngredientes[1].length > 1){
            setReceitaFoiGerada(true)
        }
        else{
            setReceitaFoiGerada(false)
        }
    }, [receitaEIngredientes])


    const confirmacaoSalvar = () => {

        if(!receitaFoiGerada){
            Alert.alert('Você não gerou nenhuma receita ainda')
            return
        }

        Alert.alert(
            'Tem certeza de que deseja salvar?',
            `Título: ${gravarPromptReceita}\n`,
            [
                {
                    text: 'Sim',
                    onPress: () => salvarReceita()
                },
                {
                    text: 'Não'
                }
            ],
            {cancelable: true}
        )
    }

    const salvarReceita = async () => {

        const ID = await gerarId(`${FileSystem.documentDirectory}data`, `${FileSystem.documentDirectory}data/IDs_existentes.json`)

        const receita = {
            tituloReceita: gravarPromptReceita,
            ingredientes: receitaEIngredientes[1],
            modoPreparo: receitaEIngredientes[0],
            tempoPreparo: 'Não informado',
            porcoes: 'Não informado',
            id: ID
        }

        try{
            const resposta = await guardarDados(`${FileSystem.documentDirectory}data`, `${FileSystem.documentDirectory}data/receitas.json`, receita)
            console.log(resposta)
            Alert.alert('Receita guardada com sucesso!')
        }
        catch(e){
            console.log(`Erro ao guardar as receitas: ${e}`)
        }


        

    }


  return (

    <SafeAreaView style={styles.container}>

        <View style={styles.titulos}>
            <Text style={styles.titulo1}>
                Chef IA
            </Text>

            <View style={{flexDirection: 'row'}}>
            <Text style={styles.titulo2}>
                Criação de receita IA
            </Text>

            <TouchableOpacity style={styles.btnHome} onPress={() => escolherTela('inicial')}>
            <Image source={require('../imgs/home.png')} resizeMode='contain' style={{width: 40, height: 35}}></Image>
            </TouchableOpacity>
            </View>

        </View>

        <View style={styles.content}>

            <View style={styles.viewPrompt}>
            <TextInput style={styles.inputReceita} value={promptReceita} placeholder='Descreva sua receita...' onChangeText={(text) => setPromptReceita(text)}></TextInput>
            <TouchableOpacity style={styles.btnPrompt} onPress={() => gerarReceitaIA()}>
                <Text>
                    Gerar
                </Text>
            </TouchableOpacity>

            </View>
            <View style={styles.viewImagensGeradas}>
            </View>

            <ScrollView style={styles.viewReceitaGerada}>
                
                <View style={[receitaFoiGerada ? styles.receitaGerada : styles.desativado]}>
                <Text style={styles.tituloModoPreparo}>
                    Receita
                </Text>
                
                <Text style={styles.modoPreparo}>
                    {receitaEIngredientes[0]}
                </Text>

                <Text style={styles.tituloIngredientes}>
                    Ingredientes
                </Text>

                {receitaEIngredientes[1].map((ingrediente, index) => {

                    return(
                        <Text key={index} style={styles.ingredientes}>
                            {ingrediente}
                        </Text>
                    )
                })}


                </View>

                <View style={[receitaFoiGerada ? styles.desativado : styles.receitaNaoGerada]}>


                    <Image source={require('../imgs/comida.png')} resizeMode='contain' style={{width: 100, alignSelf: 'center', height: 150}}></Image>

                    <Text>
                        {estadoReceita}
                    </Text>
                </View>




            </ScrollView>
        </View>

        <View style={styles.footer}>

            <TouchableOpacity style={styles.btnSalvarReceita} onPress={() => confirmacaoSalvar()}>
                <Text>
                    Salvar Receita
                </Text>
            </TouchableOpacity>
        </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffff3',
    },
    titulo1: {
        fontSize: 20,
        margin: 20,
        fontWeight: 'bold'
    },
    titulo2: {
        margin: 20,
        fontSize: 20
    },
    titulos: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: 'grey'
    },
    content: {
        flex: 1,
        marginTop: 30
    },
    inputReceita: {
        borderWidth: 0.5,
        alignSelf: 'center',
        width: 330,
        borderRadius: 8,
        height: 40,
        paddingLeft: 15
    },
    viewReceitaGerada: {
        flex: 1,
        backgroundColor: '#dfdfdf',
        width: 370,
        marginBottom: 20,
        alignSelf: 'center',
        borderRadius: 8
    },
    viewImagensGeradas: {
        height: 150,
        borderWidth: 0.5,
        marginTop: 15,
        marginBottom: 15
    },
    footer: {
        borderTopWidth: 0.5,
        alignItems: 'center',
        height: 50,
        justifyContent: 'center'
    },
    tituloModoPreparo: {
        margin: 35,
        fontSize: 25
    },
    modoPreparo: {
        marginLeft: 35,
        marginRight: 35
    },
    receitaGerada: {
        marginBottom: 30
    },
    receitaNaoGerada: {
        alignSelf: 'center',
        marginTop: 150
    },
    tituloIngredientes: {
        margin: 35,
        fontSize: 25
    },
    desativado: {
        display: 'none'
    },
    viewPrompt: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10
    },
    btnPrompt: {
        textAlign: 'center',
        borderWidth: 0.5,
        borderRadius: 8,
        justifyContent: 'center',
        width: 50,
        alignItems: 'center'
    },
    ingredientes: {
        marginLeft: 35,
        marginRight: 35
    },
    btnSalvarReceita: {
        backgroundColor: '#a6b985',
        height: 35,
        justifyContent: 'center',
        width: 100,
        alignItems: 'center',
        borderRadius: 8
    },
    btnHome: {
        marginTop: 17,
        marginRight: 10
    }
})