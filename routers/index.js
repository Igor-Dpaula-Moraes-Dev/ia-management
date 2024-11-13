import express from 'express'
import rotaTopicos from "../routers/topicos.js"
import rotaMensagem from "../routers/mensagens.js"
//const routerTopico = require("./topicos");
// export default  (app)=>{
//     app.use(rota);
//     app.use(rotaMessage);
// };

const router = express.Router();

console.log("Registrando rota/topico");
//definição de caminho base para cada rota
router.use('/topicos',rotaTopicos);
router.use('/mensagens',rotaMensagem);
//export default router

// Exporta uma função para registrar as rotas no aplicativo principal
export default (app) => {
    app.use(router);
  };