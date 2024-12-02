import OpenAI from "openai";
import dotenv from "dotenv";

// Carregar variáveis do .env
dotenv.config();

const apiKey = process.env.API_KEY;

// Verifique se a chave foi carregada corretamente
if (!apiKey) {
  console.error("Chave da API não encontrada. Verifique o arquivo .env e a configuração.");
  process.exit(1);
}

const openai = new OpenAI({
  apiKey,
});

console.log("Chave da API carregada com sucesso.");
