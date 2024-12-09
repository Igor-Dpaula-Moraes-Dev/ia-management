import OpenAI from "openai";
import { topicoID } from "../Controllers/topicosControllers.js";
import dotenv from 'dotenv';
dotenv.config();

// const openai = new OpenAI({
//     apiKey:process.env.API_KEY,
//     headers:{
//       Authorization: `Bearer ${process.env.API_KEY}`
//     }
//   }); 
// Função para criar uma instância do cliente OpenAI dinamicamente
function getOpenAiInstance(apiKey) {
  if (!apiKey) {
    throw new Error("API Key é obrigatória.");
  }
  return new OpenAI({
    apiKey: apiKey,
    headers: {
      Authorization: `Bearer ${apiKey}`, // Define o cabeçalho dinamicamente
      "OpenAI-Beta": "assistants=v2",//Cabeçalho Beta para suporte a `assistants=v2`
    }
  });
}

async function listaMessage(topicoID,apiKey) {
  if (!topicoID) {
    console.error("ID do tópico não encontrado. Crie um tópico primeiro.");
    return { error: "ID do tópico não encontrado." };
  }

  try{            
    const openai= getOpenAiInstance (apiKey)//cliente dinamico

    const threadMessages = await openai.beta.threads.messages.list(
    topicoID)
    console.log("Mensagens",threadMessages.data);

    // Extrai e formata `role` e `content[].text.value` de cada mensagem
    const mensagensFormatadas = threadMessages.data.map(mensagem => ({
      role: mensagem.role,
      content: mensagem.content[0].text.value.trim() // Acessa o texto em `content[].text.value`
    }));
   // console.log(threadMessages);
    console.log(mensagensFormatadas);
    
    return mensagensFormatadas;

    //return threadMessages.data//extrai objeto com principais dados retornados pela api
  }catch (error){
    console.error("Erro ao listar mensagens", error);
    return {error: "Erro ao listar mensagens"};
  }
 
};


 async function criarMessage(topicoID,content ,apiKey){

  if (!topicoID) {
    throw new Error("ID do tópico não encontrado. Certifique-se de que o tópico foi criado.");
  }

  try{
    const openai= getOpenAiInstance (apiKey)//cliente dinamico
     const threadMessages = await openai.beta.threads.messages.create(
    topicoID, 
    { role: "user", 
      content: content 
    }
  );
   console.log("Resposta da API",threadMessages);
   const  perguntaContent =  threadMessages?.content?.[0]?.text?.value.trim(); // Extrai `content.value`
  // Extrai `content.value` da resposta da mensagem criada
  console.log("console no conteudo da pergunta",perguntaContent)
  return { 
    message: "Mensagem criada com sucesso",
    content: perguntaContent
  };

  

  }catch(error){
    console.log("Erro ao criar mensagem",error);
    return { error: "Erro ao criar mensagem", details:error.message ||error }; // Retorna uma resposta de erro consistente
  }
};


export default {listaMessage,criarMessage};