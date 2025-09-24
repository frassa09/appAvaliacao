import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Inicial from './telas/inicial';

export default function App() {

  const [tela, setTela] = useState('')

  const escolherTela = (telaEscolhida) => {
    setTela(telaEscolhida)
  }

  switch(tela){
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


        <TouchableOpacity onPress={() => escolherTela('inicial')} style={styles.botao}>
          <Text>
            Tela inicial
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
