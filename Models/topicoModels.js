import { response } from "express";
import connection from "../Infra/connection";
class TopicosModels{
    listar(){
        const sql = `select * from topicos`;
        return this.connection.query(sql,{},(error , response)=>{
          if (error){
            console.log("Erro ao listar");
            return;
          }  
          console.log("Ok")
        });
    }

}

module.exports= TopicosModels();