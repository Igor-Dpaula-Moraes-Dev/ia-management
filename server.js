import express from "express";


//const port=3000

import router from './routers/index.js';//importando o roteamento de rotas
import connection from "./Infra/connection.js";// arquivo de conexão com bd
import { criartabelaTopico } from "./Infra/tables.js";// criando tables no banco
import dotenv  from'dotenv';
//const dotenv = require('dotenv')
//require('dotenv').config();+

dotenv.config();

const port = process.env.MYSQL_PORT || 3000;
const app = express();
app.use(express.json());//middleware para json
//criartabelaTopico.init(connection);

// Inicializa a criação da tabela ao iniciar o servidor
(async () => {
    await criartabelaTopico();
})();

router(app);// define as rotas

app.listen(port,(error)=>{
    if(error){
        console.error("Server Off verifique");
        return;
    }
        console.log(`Servidor em execução na porta ${port}`)
})