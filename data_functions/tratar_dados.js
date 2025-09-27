import * as FileSystem from 'expo-file-system/legacy'

export default async function assegurarExistencia(dirPath){


    try{

        const info = await FileSystem.getInfoAsync(dirPath)

        if(!info.exists){

            FileSystem.makeDirectoryAsync(dirPath)
        }
        
        console.log('Diretório já existe ou foi criado com sucesso')
    }
    catch(e){
        console.log(`Erro ao comunicar com diretório: ${e}`)
    }
}

export async function resgatarDados(dirPath, path){


    await assegurarExistencia(dirPath)

    try{

        const dataJSON = await FileSystem.readAsStringAsync(path)

        const data = JSON.parse(dataJSON)

        if(!data){
            return []
        }

        return data

    }
    catch(e){
        console.log(`Erro ao resgatar dados, retornando array: ${e}`)
        return []
    }
}


export async function guardarDados(dirPath, path, info){


    await assegurarExistencia(dirPath)

    console.log(`Dados a serem armazenados: ${JSON.stringify(info)}`)


    try{

        const data = await resgatarDados(dirPath, path)

        data.push(info)

        await FileSystem.writeAsStringAsync(path, JSON.stringify(data))

        return `Dados armazenados: ${JSON.stringify(data)}`
    }
    catch(e){
        console.log(`Erro ao guardar informações: ${e}`)
    }


}

export async function deletarTodosDados(dirPath, path){

    assegurarExistencia(dirPath)

    try{

        await FileSystem.writeAsStringAsync(path, JSON.stringify([]))

        const dados = await FileSystem.readAsStringAsync(path)

        console.log(`Dados apagados: ${JSON.stringify(dados)}`)
    }
    catch(e){
        console.log(`Erro ao apagar dados: ${e}`)
    }
}