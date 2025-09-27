import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { resgatarDados } from '../data_functions/tratar_dados'
import * as FileSystem from 'expo-file-system/legacy'

export default function Inicial({escolherTela}) {

    const [receitas, setReceitas] = useState([])
    const [receitasExistem, setReceitasExistem] = useState(false)

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


  return (
    <SafeAreaView style={styles.container}>

        <TouchableOpacity onPress={() => escolherTela('default')}>
            <Text>
                Matriz
            </Text>
        </TouchableOpacity>

        <View style={styles.header}>
            <TextInput placeholder='Busque por nome da receita' style={styles.inputBuscarReceita}></TextInput>
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
                            <Text>
                                {receita.tituloReceita}
                            </Text>
                        </TouchableOpacity>
                        )
                })}


            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

    inputBuscarReceita: {
        borderWidth: 0.5,
        alignSelf: 'center',
        width: 350,
        borderRadius: 8,
        height: 40,
        marginBottom: 20
    },
    header: {
        borderBottomColor: 'grey',
        borderBottomWidth: 0.5,
        marginTop: 15
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
        flex: 1
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
        borderWidth: 0.8
    },
    receitas: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginLeft: 25,
        marginRight: 15,
        marginTop: 20
    }
})