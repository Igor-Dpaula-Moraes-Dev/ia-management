import express from "express";
const { Router } = express;
const rotaMessage = Router();

import MensagensController from "../Controllers/messagesControllers.js";

// Middleware que cria e armazena o topicoID na sessão se ainda não existir
rotaMessage.use((req, res, next) => {
  if (!req.session.topicoID) {
    req.session.topicoID = /* lógica para gerar ou recuperar topicoID */;
  }
  next();
});

// Rota GET que usa o topicoID armazenado na sessão
rotaMessage.get("/", async (req, res) => {
  try {
    const topicoID = req.session.topicoID;
    const response = await MensagensController.listaMessage(topicoID);
    res.status(200).send(response);
  } catch (error) {
    console.error("Erro ao buscar mensagens", error);
    res.status(500).json({ error: "Erro ao buscar mensagens" });
  }
});

export default rotaMessage;