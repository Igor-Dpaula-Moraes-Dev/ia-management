import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const assistantId=process.env.ASSISTANT_ID;

const openai = new OpenAI({
  apiKey:process.env.API_KEY,
  headers:{
    Authorization: `Bearer ${process.env.API_KEY}`
  }
}); 

 export let topicoID = null;
class TopicosController{

 async buscarTopico(){
  
  try{
    if (!topicoID) {
      throw new Error("ID do tópico não encontrado. Crie um tópico primeiro.");
    }
     const runs = await openai.beta.threads.runs.list(topicoID);
     console.log("Tópicos Encontrados",runs);
     return runs;
  }catch(error){
    console.error("Erro ao Buscaro Tópicos:", error);
    return "Erro ao bucar topicos";
  }
 
};

async criarTopico (content){
  try{
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
  return "Erro ao criar o tópico";
}
};

async executarTopico(topicoID) {
  try {
    const resposta = await openai.beta.threads.runs.create(threadID, {
      assistant_id: process.env.ASSISTANT_ID
    }
  );

    const responseContent = resposta?.data?.messages?.[0]?.content?.[0]?.text?.value || "Resposta não encontrada";
    return responseContent;
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