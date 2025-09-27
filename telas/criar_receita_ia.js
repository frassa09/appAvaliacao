import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import gerarReceita from '../development_functions/gemini_api_function'

export default function CriarReceitaIa() {

    const [promptReceita, setPromptReceita] = useState('')

    const gerarReceitaIA = async () => {

        const receitaEIngredientes = await gerarReceita(promptReceita)


    }



  return (

    <SafeAreaView style={styles.container}>

        <View style={styles.titulos}>
            <Text style={styles.titulo1}>
                Chef IA
            </Text>
            <Text style={styles.titulo2}>
                Criação de receita IA
            </Text>
        </View>

        <View style={styles.content}>

            <TextInput style={styles.inputReceita} value={promptReceita} placeholder='Descreva sua receita...' onChangeText={(text) => setPromptReceita(text)}></TextInput>

            <View style={styles.viewImagensGeradas}>

            </View>

            <ScrollView style={styles.viewReceitaGerada}>

                <Text>
                    Receita
                </Text>
            </ScrollView>
        </View>

        <View style={styles.footer}>

            <Text>
                footer
            </Text>
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
        width: 400,
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

    }
})