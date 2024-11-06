import OpenAI from "openai";

class TopicosController{
 buscar(){
    return "Buscando Os Topicos";
};
criar (){
  

const openai = new OpenAI();

async function main() {
  const stream = await openai.beta.threads.createAndRun({
      assistant_id: "asst_123",
      thread: {
        messages: [
          { role: "user", content: "Hello" },
        ],
      },
      stream: true
  });

  for await (const event of stream) {
    console.log(event);
  }
}

main();
    return" criando topicos"
};
 atualizar(){
    return "Atualizando Topicos"
 };

 apagar(){
    return" Apagando Topicos"
 };   
}

 export default new TopicosController();// exportando como padrão