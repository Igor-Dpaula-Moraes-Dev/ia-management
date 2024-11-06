//const Router = require ("express").Router;
import express from "express";
const{Router}= express;
const rota = Router();
import topicosControllers from "../Controllers/topicosControllers.js";


//get post put delete

rota.get("/topicos", (req, res)=>{
    const response = topicosControllers.buscar();
    res.status(200).send(response)
})

rota.post("/topicos", (req, res)=>{
    const response = topicosControllers.criar();
    res.send(response)
})

rota.put("/topicos/:id", (req, res)=>{
    const {id}=req.params;
    const response = topicosControllers.atualizar(id);
  res.send(response)
})
  
    

rota.delete("/topicos/:id", (req, res)=>{
   const{id}= req.params;
   const response = topicosControllers.apagar(); 
   res.send(response)
})

export default rota;
