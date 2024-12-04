import express from "express";
const{Router}= express;
const rotaMessage = Router();
import MensagensController from "../Controllers/messagesControllers.js";
import topicosControllers from "../Controllers/topicosControllers.js";
import verificaHeader from "../MiddleWares/validaCabecalho.js";


rotaMessage.get("/:topicoID", verificaHeader, async (req, res)=>{
    const {topicoID}= req.params;//obtem o topicoId atraves da url
    const apiKey = req.apiKey;//recupera apikey do middleware

    if (!topicoID) {
        return res.status(400).json({ error: "O ID do tópico é obrigatório." });
      }


    try{
        const response = await MensagensController.listaMessage(topicoID,apiKey);
        res.status(200).json({ message: "Mensagens encontradas", data: response });

    }catch (error){
        console.error("Erro ao Buscar novas mensagens",error);
        res.status(500).json({error: "Erro ao buscar mensagens"});
    }
    
});

rotaMessage.post("/:topicoID", verificaHeader, async (req, res)=>{
    const {topicoID}= req.params; // Obtém o `topicoID` da URL
    const {content, assistant_id}= req.body;//obtem o conteudo da mensagem do  corpo da requisição e o id da assistente
    const apiKey = req.apiKey;

   
        
        if(!content){
            return res.status(400).json({error:"Conteudo da mensagem é necessario"});
        }
        if(!assistant_id){
            return res.status(400).json({falha:"Falta o id da assistente no corpo da requisição"})
        }

    try{
         const newMessage = await MensagensController.criarMessage(topicoID, content,apiKey);
         
         if (newMessage.error) {
            return res.status(500).json({ error: newMessage.error });
          }

         // 2. Chama o controlador de tópicos para executar o tópico e processar a nova mensagem com a assistente
        const respostaAssistente = await topicosControllers.executarTopico(topicoID, assistant_id,apiKey);

        if (respostaAssistente.error) {
            return res.status(500).json({ error: respostaAssistente.error });
          }
      
            res.status(201).json({
            message: "Mensagem criada e executada com sucesso",
            userMessage: newMessage,
            assistantResponse: respostaAssistente,
          });

        } catch (error){
        console.error("Erro ao Criar novas mensagens",error);
        res.status(500).json({error: "Erro não foi possivel criar uma mensagen"});
      }
});
      
      

export default rotaMessage;