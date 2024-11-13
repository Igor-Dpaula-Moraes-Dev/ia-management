import express from "express";
import session from "express-session";
import MensagensController from "../Controllers/messagesControllers.js";

const app = express();

app.use(session({
  secret: 'chave_secreta',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Altere para true em produção com HTTPS
}));

// Rota para iniciar a conversa e definir o topicoID
app.post("/iniciar-conversa", (req, res) => {
  // Crie ou obtenha o `topicoID`
  const topicoID = "novoIDdoTopico"; // substitua pela lógica para gerar ou obter o ID
  req.session.topicoID = topicoID;   // Armazene o `topicoID` na sessão
  res.status(200).json({ message: "Conversa iniciada", topicoID });
});

// Rota GET para listar mensagens usando o `topicoID` armazenado na sessão
app.get("/mensagens", async (req, res) => {
  const topicoID = req.session.topicoID; // Recupera o `topicoID` da sessão
  if (!topicoID) {
    return res.status(400).json({ error: "Conversa não iniciada" });
  }
  try {
    const response = await MensagensController.listaMessage(topicoID);
    res.status(200).send(response);
  } catch (error) {
    console.error("Erro ao buscar novas mensagens", error);
    res.status(500).json({ error: "Erro ao buscar mensagens" });
  }
});