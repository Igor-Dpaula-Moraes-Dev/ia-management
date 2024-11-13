import express from "express";
const{Router}= express;
const rotaMessage = Router();
import MensagensController from "../Controllers/messagesControllers.js";
import topicosControllers from "../Controllers/topicosControllers.js";


rotaMessage.get("/:topicoID",async (req, res)=>{
    const {topicoID}= req.params;//obtem o topicoId atraves da url
    try{
        const response = await MensagensController.listaMessage(topicoID);
        res.status(200).json(response);
    }catch (error){
        console.error("Erro ao Buscar novas mensagens",error);
        res.status(500).json({error: "Erro ao buscar mensagens"});
    }
    
});

rotaMessage.post("/:topicoID",async (req, res)=>{
    const {topicoID}= req.params; // Obtém o `topicoID` da URL
    const {content}= req.body;//obtem o conetudo da mensagem do  corpo da requisição
        
        if(!content){
            return res.status(400).json({error:"Conteudo da mensagem é necessario"});
        }
       
    try{
         const response = await MensagensController.criarMessage(topicoID, content);
         // 2. Chama o controlador de tópicos para executar o tópico e processar a nova mensagem com a assistente
        const respostaAssistente = await topicosControllers.executarTopico(topicoID);
    
        // res.status(201).json(response);
         res.status(201).json(respostaAssistente);
        console.log(respostaAssistente)
        return respostaAssistente;

        } catch (error){
        console.error("Erro ao Criar novas mensagens",error);
        res.status(500).json({error: "Erro não foi possivel criar uma mensagen"});
      }
});
      
      

export default rotaMessage;