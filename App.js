import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CriarReceita from './telas/criar_receita';
import Inicial from './telas/inicial';

export default function App() {

  const [tela, setTela] = useState('criar_receita')

  const escolherTela = (telaEscolhida) => {
    setTela(telaEscolhida)
  }

  switch(tela){
    case 'criar_receita': {
      return <CriarReceita escolherTela={escolherTela}></CriarReceita>
    }
    case 'inicial': {
      return <Inicial escolherTela={escolherTela}></Inicial>
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
