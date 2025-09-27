import assegurarExistencia, { resgatarDados } from "./tratar_dados";
import * as FileSystem from 'expo-file-system/legacy'


export default async function gerarId(dirPath, path){

    await assegurarExistencia(dirPath)

    let idGerado = Math.floor(Math.random() * 1000000)

    const IDS_EXISTENTES = await resgatarDados(dirPath, path)

    IDS_EXISTENTES.map((id) => {

        if(id == idGerado){
            while(id == idGerado){
                idGerado = Math.floor(Math.random() * 1000000)
            }
        }
    })

    IDS_EXISTENTES.push(idGerado)

    try{

        await FileSystem.writeAsStringAsync(path, JSON.stringify(IDS_EXISTENTES))
    }
    catch(e){
        console.log(`Erro ao armazenar ID: ${e}`)
        return
    }

    return idGerado

}