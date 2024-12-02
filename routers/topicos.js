//const Router = require ("express").Router;
import express from "express";
const{Router}= express;
const rota = Router();
import topicosControllers, { topicoID } from "../Controllers/topicosControllers.js";


//GET BUSCAR TÓPICOS

rota.get("/", async (req, res)=>{
    try{
      const response = await topicosControllers.buscarTopico();
    res.status(200).send(response);
    }catch (error){
        console.error("Erro ao Buscar Tòpicos:",error);
        res.status(500).json({error: "Erro ao buscar tópicos"});
    }
    
})

// POST - Criar um tópico
rota.post("/", async (req, res)=>{
    // Captura a API Key do cabeçalho Authorization
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(400).json({ error: "API Key não fornecida ou inválida no cabeçalho." });
  }
  const apiKey = authorization.split(" ")[1]; // Extrai a chave após "Bearer"
    
        const {content,assistant_id,} = req.body;
         
        if(!assistant_id){
            return res.status(400).json({erro:"Falta o Id da assistant_id"})
            } 
        if(!apiKey){
            return res.status(400).json({erro:"Chave de api key obrigatoria"})
        } 
            try{
                const response = await topicosControllers.criarTopico(content,assistant_id,apiKey);
                  console.log("Resposta da API:", JSON.stringify(response, null, 2)); // Log detalhado
                
                   res.status(201).json(response);//201 Created para o POST bem-sucedido.
                    return"";

            }catch(error){
            console.error("Erro ao criar tópico",error);
            res.status(500).json({error:"Erro ao criar topico"})//
    }
});
// rota.post("/", async (req, res)=>{
//     try{
//         const {content}= req.body;
//         const {topicoID}= req.params;
//         const response = await topicosControllers.executarTopico(topicoID);
//         res.status(201).json(response);//201 Created para o POST bem-sucedido.
//         return"";

//     }catch(error){
//         console.error("Erro ao criar tópico",error);
//         res.status(500).json({error:"Erro ao criar topico"})//
//     }
// })

rota.put("/:id", async (req, res)=>{
    try{
        const {id}= req.params;
        const{content}= req.body;
        const response =await topicosControllers.atualizar(id);
   
         res.status(200).json(response);
    }catch(error){
        console.error("Erro ao atualizar tópico", error);
        res.status(500).json({error:"Erro ao Atualizar o tópico"});
    }
});
  
    

rota.delete("/:id", async(req, res)=>{
    try{
         const{id} = req.params;
        const response = await topicosControllers.apagar(id); 
   
         res.status(200).json(response);
    }catch (error){
        console.error("Erro ao apagar tópico", error);
        res.status(500).json({error:"Erro ao apagar Tópico"});
    }
});
  

export default rota;
