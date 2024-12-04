import OpenAI from "openai";
import dotenv from "dotenv";
//import respostaMessage from "../Controllers/messagesControllers.js"
dotenv.config();
//const assistantId=process.env.ASSISTANT_ID;

// const openai = new OpenAI({
//   apiKey:process.env.API_KEY,
//   headers:{
//     Authorization: `Bearer ${process.env.API_KEY}`
//   }
// }); 



 export let topicoID = null;
class TopicosController{



// Cria uma instância do cliente OpenAI usando a chave fornecida
getOpenAiInstance(apiKey) {
  if (!apiKey) {
    throw new Error("API Key é obrigatória."); // Validação
  }
  return new OpenAI({
    apiKey: apiKey, // Configura a API Key dinamicamente
    headers: {
      Authorization: `Bearer ${apiKey}`,// Define o cabeçalho dinamicamente
      "OpenAI-Beta": "assistants=v2",//Cabeçalho Beta para suporte a `assistants=v2`
    }
  });
}


async criarTopico (content ,assistantId,apiKey){
try{
  const openai = this.getOpenAiInstance(apiKey); // Instância criada dinamicamente

  const stream = await openai.beta.threads.createAndRun({
      
      assistant_id: assistantId,
      thread: {
        messages: [
          { role: "user",
            content: content
          },
        ],
      },
     // stream: false
  });

  console.log("Resposta Completa", stream)
  topicoID = stream.thread_id;
  console.log(topicoID);
  // for await (const event of stream) {
  //   console.log(event);
  //   if (event && event.thread_id) {
  //     topicoID = event.thread_id; // Armazena o ID do tópico criado
  //     console.log(`Tópico criado com ID: ${topicoID}`);
  //     break; // Sai do loop assim que o ID é encontrado
  // }
  // }

 return{message:"Topico Criado com sucesso",
        thread_id:topicoID};

} catch (error) {
  console.error("Erro ao criar o tópico:", error);
  return {
    Erro: "Não Foi Possivel Criar o Tópico",
    detail: error.message|| error
  };
}
};

async executarTopico(topicoID,assistantId,apiKey) {
  const openai = this.getOpenAiInstance(apiKey);//instancia
  try {
    const resposta = await openai.beta.threads.runs.create(topicoID, {
      assistant_id: assistantId
      }
  );
  console.log("Resposta B",resposta);
  console.log("A resposta gerada pela assistente foi:",resposta)
 
    //const responseContent = resposta.messages?.[0]?.content?.[0]?.text?.value || "Resposta não encontrada";
    //console.log("A resposta gerada pela assistente foi:",responseContent)
    return resposta;
  } catch (error) {
    console.error("Erro ao executar o tópico:", error);
    throw new Error("Erro ao processar a mensagem no tópico existente");
  }
};

 atualizar(){
    return "Atualizando Topicos"
 };

 apagar(){
    return" Apagando Topicos"
 };   
}

 export default new TopicosController(); // exportando como padrão