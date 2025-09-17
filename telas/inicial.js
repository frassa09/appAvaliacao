import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-web'

export default function Inicial() {
  return (
    <SafeAreaView style={styles.container}>


    <View style={styles.titulos}>
        <Text style={styles.titulo}>
            Chef IA
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
    titulo: {
        fontSize: 30,
    },
    titulos: {
        flex: 1,
    }
})