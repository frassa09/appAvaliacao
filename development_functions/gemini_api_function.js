import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenAI } from '@google/genai';

const API_KEY = process.env.EXPO_PUBLIC_API_KEY


const genAI = new GoogleGenerativeAI(API_KEY)
const aiImg = new GoogleGenAI({
    apiKey: API_KEY
})

export default async function gerarReceita(comida){

    const receita = comida

    const model = genAI.getGenerativeModel({model: 'gemini-2.5-flash'})

    const chamada = 'Você está integrada em um aplicativo de receitas de comidas e o usuário irá te mandar qual a receita desejada. Não cumprimente, só escreva o necessário para as informações da receita. No final da receita, liste os ingredientes de forma separada, começando com `---INGREDIENTES---`. Não use caracteres especiais nos ingredientes, nem descrição, apenas QUANTIDADES, sempre coloque as QUANTIDADES, acentos das palavras e os ingredientes em si em uma linha só separados apenas por (,). Exemplo: arroz, feijão, macarrão. OBS: se a pessoa pedir qualquer outra coisa que fuja do contexto que eu te passei informe a ela que você é preparada só para gerar receitas e do mesmo jeito retorne o separador ---INGREDIENTES para não quebrar o código, só que com a diferença que ao invés de você escrever os ingredientes de verdade em baixo você escreverá exatamente isso: naogerado. ISSO É DE EXTREMA IMPORTÂNCIA. ---INGREDIENTES---.  Receita: ' + receita

    const result = await model.generateContent(chamada)
    const response = result.response
    const texto = response.text()
    console.log(texto)


    const partes = texto.split('---INGREDIENTES---')

    const ingredientes = partes[1].split(',')
    const ingredientesLimpo = ingredientes.map((ingrediente) => ingrediente.replaceAll('\n', '').trim())

    console.log(ingredientesLimpo)

    const receitaLimpa = partes[0]

    console.log(receitaLimpa)

    return [receitaLimpa, ingredientesLimpo]
}