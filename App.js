import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CriarReceita from './telas/criar_receita';
import Inicial from './telas/inicial';
import CriarReceitaIa from './telas/criar_receita_ia';
import { deletarTodosDados } from './data_functions/tratar_dados';
import * as FileSystem from 'expo-file-system/legacy'

export default function App() {

  const [tela, setTela] = useState('inicial')

  const escolherTela = (telaEscolhida) => {
    setTela(telaEscolhida)
  }


   const limparTodosDados = async () => {
    await deletarTodosDados(`${FileSystem.documentDirectory}data`, `${FileSystem.documentDirectory}data/IDs_existentes.json`)
    await deletarTodosDados(`${FileSystem.documentDirectory}data`, `${FileSystem.documentDirectory}data/receitas.json`)
  }

  switch(tela){
    case 'criar_receita': {
      return <CriarReceita escolherTela={escolherTela}></CriarReceita>
    }
    case 'inicial': {
      return <Inicial escolherTela={escolherTela}></Inicial>
    }
    case 'criar_receita_ia': {
      return <CriarReceitaIa escolherTela={escolherTela}></CriarReceitaIa>
    }
    default:
      return (
    <SafeAreaView style={styles.container}>

      <View>
        <Text>
          Escolha uma tela para trabalhar
        </Text>


        <TouchableOpacity onPress={() => escolherTela('criar_receita')} style={styles.botao}>
          <Text>
            Criar Receita
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => escolherTela('inicial')} style={styles.botao}>
          <Text>
            Inicial
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => escolherTela('criar_receita_ia')} style={styles.botao}>
          <Text>
            Criar Receita IA
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => limparTodosDados()} style={styles.botao}>
          <Text>
            Limpar dados
          </Text>
        </TouchableOpacity>
      </View>



    </SafeAreaView>
  );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a5c8ca',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botao: {
    alignItems: 'center',
    backgroundColor: '#e3e5d7',
    borderRadius: 8,
    marginTop: 10
  }
});
