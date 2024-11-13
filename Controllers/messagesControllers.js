import OpenAI from "openai";
import { topicoID } from "../Controllers/topicosControllers.js";

const openai = new OpenAI({
    apiKey:process.env.API_KEY,
    headers:{
      Authorization: `Bearer ${process.env.API_KEY}`
    }
  }); 

async function listaMessage() {
  if (!topicoID) {
    console.error("ID do tópico não encontrado. Crie um tópico primeiro.");
    return { error: "ID do tópico não encontrado." };
  }

  try{
    const threadMessages = await openai.beta.threads.messages.list(
    topicoID)
    console.log("Mensagens",threadMessages.data);

    // Extrai e formata `role` e `content[].text.value` de cada mensagem
    const mensagensFormatadas = threadMessages.data.map(mensagem => ({
      role: mensagem.role,
      content: mensagem.content[0].text.value // Acessa o texto em `content[].text.value`
    }));
    console.log(threadMessages);
    console.log(mensagensFormatadas);
    
    return mensagensFormatadas;

   // return threadMessages.data;
  }catch (error){
    console.error("Erro ao listar mensagens", error);
    return {error: "Erro ao listar mensagens"};
  }
 
};


 async function criarMessage(topicoID,content){
  if (!topicoID) {
    throw new Error("ID do tópico não encontrado. Certifique-se de que o tópico foi criado.");
  }

  try{
     const threadMessages = await openai.beta.threads.messages.create(
    topicoID, 
    { role: "user", 
      content: content 
    }
  );
   console.log("Resposta da API",threadMessages);
   const  respostaContent =  threadMessages?.data?.content?.[0].text?.value // Extrai `content.value`
  // Extrai `content.value` da resposta da mensagem criada
  return { 
    message: "Mensagem criada com sucesso",
    response: respostaContent
  };

  }catch(error){
    console.log("Erro ao criar mensagem",error);
    return { error: "Erro ao criar mensagem", details:error.message ||error }; // Retorna uma resposta de erro consistente
  }
};
async function apagarMensagem() {
  const deletedMessage = await openai.beta.threads.messages.del(
    "thread_abc123",
    "msg_abc123"
  );

  console.log(deletedMessage);
}

export default {listaMessage,criarMessage};