import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Inicial({escolherTela}) {



  return (
    <SafeAreaView>

        <View style={styles.header}>
            <TextInput placeholder='Busque por nome da receita' style={styles.inputBuscarReceita}></TextInput>
        </View>

        <View style={styles.content}>


        </View>
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
    }
})