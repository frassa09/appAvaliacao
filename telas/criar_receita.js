import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { use, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Alert } from 'react-native'
import { guardarDados } from '../data_functions/tratar_dados'
import * as FileSystem from 'expo-file-system/legacy'
import gerarId from '../data_functions/gerarID'

export default function CriarReceita({escolherTela}) {

    const [tituloReceita, setTituloReceita] = useState(null)
    const [ingrediente, setIngrediente] = useState(null)
    const [ingredienteArray, setIngredienteArray] = useState([])
    const [modoPreparo, setModoPreparo] = useState(null)
    const [tempoPreparo, setTempoPreparo] = useState(null)
    const [porcoes, setPorcoes] = useState(null)


    const adicionarReceita = async () => {
        console.log('funcao chamada')

        if(!tituloReceita || ingredienteArray.length == 0 || !modoPreparo ||
            tituloReceita.trim() == '' || modoPreparo.trim() == ''    ){

            Alert.alert('Você deve preencher todos os campos obrigatórios')
            return
        }

        const ID = await gerarId(`${FileSystem.documentDirectory}data`, `${FileSystem.documentDirectory}data/IDs_existentes.json`)

        const receita = {
            tituloReceita: tituloReceita,
            ingredientes: ingredienteArray,
            modoPreparo: modoPreparo,
            tempoPreparo: tempoPreparo ? tempoPreparo : 'Não informado',
            porcoes: porcoes ? porcoes : 'Não informado',
            id: ID
        }

        try{
            const resposta = await guardarDados(`${FileSystem.documentDirectory}data`, `${FileSystem.documentDirectory}data/receitas.json`, receita)
            console.log(resposta)
        }
        catch(e){
            console.log(`Erro ao guardar as receitas: ${e}`)
        }


    }






    const adicionarIngrediente = () => {

        if(ingrediente != null){
            if(ingrediente.trim().length > 0){
                setIngredienteArray([...ingredienteArray, ingrediente])

                setIngrediente('')
            }
        }
        else{
            Alert.alert('Não é possível adicionar um ingrediente com o campo vazio')
        }

    }

    const deletarIngrediente = (indexParaDeletar) => {

        const novosIngredientes = ingredienteArray.filter((_, index) => index !== indexParaDeletar)
        setIngredienteArray(novosIngredientes)
    }

  return (
    <SafeAreaView style={styles.container}>


    <View style={styles.titulos}>
        <Text style={styles.titulo1}>
            Chef IA
        </Text>
        <Text style={styles.titulo2}>
            Criação de receita
        </Text>
    </View>

    <ScrollView style={styles.content}>

        <Text style={styles.desc1}>
            Título da Receita *
        </Text>
        <TextInput style={styles.inputTituloReceita} value={tituloReceita} onChangeText={(text) => setTituloReceita(text)}></TextInput>

        <TouchableOpacity style={styles.btnAddFoto} onPress={() => escolherTela('default')}>
            <Text style={{color: 'white'}}>
                Faça upload de uma imagem / Tire uma foto
            </Text>
        </TouchableOpacity>

        <Text style={styles.desc2}>
            Ingredientes *
        </Text>
        <TextInput style={styles.inputIngredientes} value={ingrediente} onChangeText={(text) => setIngrediente(text)}></TextInput>




        {ingredienteArray.map((ingrediente, index) => {
            return (<View style={styles.ingredientesAdicionados} key={index}>
            <Text style={styles.nomeIngrediente}>
                {ingrediente}
            </Text>
            <TouchableOpacity style={styles.btnDeletarIngrediente} key={index} onPress={() => deletarIngrediente(index)}>
                <Text style={{color: 'red'}}>
                    Deletar
                </Text>
            </TouchableOpacity>
        </View>
            )
        })}



        <TouchableOpacity style={styles.btnAddIngredientes} onPress={() => adicionarIngrediente()}>
            <Text>
                Adicionar ingrediente
            </Text>
        </TouchableOpacity>

        <Text style={styles.desc3}>
            Modo de preparo *
        </Text>
        <TextInput style={styles.inputModoDePreparo} value={modoPreparo} onChangeText={(text) => setModoPreparo(text)}></TextInput>

        <View style={styles.viewTempo_Porcoes}>
            <View style={styles.viewTempoPreparo}>
            <Text>
                Tempo de preparo (min)
            </Text>
            <TextInput style={styles.inputTempoPreparo} keyboardType='numeric' value={tempoPreparo} onChangeText={(text) => setTempoPreparo(text)}></TextInput>
            </View>

            <View style={styles.viewPorcoes}>
            <Text>
                Porções
            </Text>
            <TextInput style={styles.inputPorcoes} keyboardType='numeric' value={porcoes} onChangeText={(text) => setPorcoes(text)}></TextInput>
            </View>
        </View>

        <View style={styles.botoesFinais}>

            <TouchableOpacity style={styles.btnSalvar} onPress={() => adicionarReceita()}>
                <Text style={{color: 'white'}}>
                    Salvar
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnCancel} onPress={() => escolherTela('inicial')}>
                <Text>
                    Cancelar
                </Text>
            </TouchableOpacity>
        </View>


    </ScrollView>

    <View style={styles.footer}>

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
        marginTop: 20
    },
    footer: {
    },
    desc1: {
        margin: 20
    },
    desc2: {
        margin: 20
    },
    desc3: {
        margin: 20,
        marginTop: 40
    },
     inputTituloReceita: {
        borderWidth: 0.5,
        alignSelf: 'center',
        width: 400,
        borderRadius: 8,
        height: 40
     },
     inputIngredientes: {
        borderWidth: 0.5,
        alignSelf: 'center',
        width: 400,
        borderRadius: 8,
        height: 40
     },
     inputModoDePreparo: {
        borderWidth: 0.5,
        alignSelf: 'center',
        width: 400,
        borderRadius: 8,
        height: 200,
        textAlignVertical: 'top'
     },
     inputTempoPreparo: {
        borderWidth: 0.5,
        alignSelf: 'center',
        width: 180,
        borderRadius: 8,
        height: 40
     },
     inputPorcoes: {
        borderWidth: 0.5,
        alignSelf: 'center',
        width: 180,
        borderRadius: 8,
        height: 40
     },
     btnAddFoto: {
        alignSelf: 'center',
        marginTop: 20,
        backgroundColor: '#a6b985',
        width: 400,
        alignItems: 'center',
        height: 40,
        borderRadius: 8,
        justifyContent: 'center'
     },
     btnAddIngredientes: {
        alignSelf: 'center',
        marginTop: 20,
        backgroundColor: '#c4c8c5',
        width: 400,
        alignItems: 'center',
        height: 40,
        borderRadius: 8,
        justifyContent: 'center'
     },
     viewTempo_Porcoes: {
        flexDirection: 'row',
        gap: 40,
        alignSelf: 'center',
        marginTop: 20
     },
     botoesFinais: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 20,
        marginTop: 40,
        gap: 20
     },
     btnSalvar: {
        backgroundColor: '#a6b985',
        height: 35,
        borderRadius: 8,
        justifyContent: 'center',
        width: 80,
        alignItems: 'center'
     },
     btnCancel: {
        height: 35,
        borderRadius: 8,
        justifyContent: 'center',
        width: 90,
        backgroundColor: '#c4c8c5',
        alignItems: 'center'
     },
     ingredientesAdicionados: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 0.5,
        width: 350,
        alignSelf: 'center',
        marginTop: 15,
        borderRadius: 8,
        height: 30,
        alignItems: 'center',
        paddingRight: 15,
        paddingLeft: 15
     },
     desativado: {
        display: 'none'
     }
})