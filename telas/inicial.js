import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { use, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Inicial({escolherTela}) {

    const [tituloReceita, setTituloReceita] = useState('')
    const [ingredientes, setIngredientes] = useState('')

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
            Título da Receita
        </Text>
        <TextInput style={styles.inputTituloReceita}></TextInput>

        <TouchableOpacity style={styles.btnAddFoto}>
            <Text style={{color: 'white'}}>
                Faça upload de uma imagem / Tire uma foto
            </Text>
        </TouchableOpacity>

        <Text style={styles.desc2}>
            Ingredientes
        </Text>
        <TextInput style={styles.inputIngredientes}></TextInput>

        <TouchableOpacity style={styles.btnAddIngredientes}>
            <Text>
                Adicionar outro ingrediente
            </Text>
        </TouchableOpacity>

        <Text style={styles.desc3}>
            Modo de preparo
        </Text>
        <TextInput style={styles.inputModoDePreparo}></TextInput>

        <View style={styles.viewTempo_Porcoes}>
            <View style={styles.viewTempoPreparo}>
            <Text>
                Tempo de preparo (min)
            </Text>
            <TextInput style={styles.inputTempoPreparo} keyboardType='numeric'></TextInput>
            </View>

            <View style={styles.viewPorcoes}>
            <Text>
                Porções
            </Text>
            <TextInput style={styles.inputPorcoes} keyboardType='numeric'></TextInput>
            </View>
        </View>

        <View style={styles.botoesFinais}>

            <TouchableOpacity style={styles.btnSalvar}>
                <Text style={{color: 'white'}}>
                    Salvar
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnCancel}>
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
        height: 200
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
     }
})