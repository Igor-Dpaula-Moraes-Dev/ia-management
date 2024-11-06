import rota from "../routers/topicos.js"
//const routerTopico = require("./topicos");
export default  (app)=>{
    app.use(rota);
};