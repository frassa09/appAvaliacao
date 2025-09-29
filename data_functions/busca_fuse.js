import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import Fuse from 'fuse.js'

export default function useBuscaFuse(listaDeItens, termoBuscaInicial) {

    const [termoBusca, setTermoBusca] = useState(termoBuscaInicial || '')


    const opcoesFuse = {
  // Campos onde a busca será realizada
    keys: ['tituloReceita'],
  // Limite de similaridade (0.0 = exata, 1.0 = muito solta)
    threshold: 0.4, 
    ignoreLocation: true, // Ignora a localização do termo
    }

    

    const fuse = useMemo(() => new Fuse(listaDeItens || [], opcoesFuse), [listaDeItens])

    const resultado = termoBusca ? fuse.search(termoBusca).map(resultado => resultado.item) : listaDeItens
    
  return {resultado, setTermoBusca}
}