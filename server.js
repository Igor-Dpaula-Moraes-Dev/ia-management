import OpenAI from "openai";
import express from "express";

//import routers from './routers/index.js';//importando o roteamento de rotas
import configurarRotas from './routers/index.js'
import connection from "./Infra/connection.js";// arquivo de conexão com bd
import { criartabelaTopico } from "./Infra/tables.js";// criando tables no banco
import dotenv  from'dotenv';
//const dotenv = require('dotenv')
//require('dotenv').config();+

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());//middleware para parse de json
//criartabelaTopico.init(connection);

// Inicializa a criação da tabela ao iniciar o servidor
// (async () => {
//     await criartabelaTopico();
// })();
console.log("Registrando rotas");
//app.use(routers);
configurarRotas(app);

async function inicializarBanco () {
    try {
        await criartabelaTopico(connection); // Certifique-se de passar a conexão como argumento
        console.log("Tabelas criadas/verificadas com sucesso.");
    } catch (error) {
        console.error("Erro ao criar/verificar tabelas:", error);
    }
}
inicializarBanco();


// define as rotas
/*router(app);*/
app.get('/teste', (req, res) => {
    res.send("Rota de teste funcionando");
});


app.listen(port,(error)=>{
    if(error){
        console.error("Server Off verifique");
        return;
    }
        console.log(`Servidor em execução na porta ${port}`)
})