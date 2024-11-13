
import { execute } from "../Infra/connection.js";

    
   export const criartabelaTopico = async () =>{
        const sql =`
        create table if not exists topico(
        id_topico VARCHAR(100)  PRIMARY KEY,
        status enum("queued","in_progress","completed") 
        );
        
        `;
        try {
            await execute(sql);
            console.log("Tabela criada com sucesso");
        } catch (error) {
            console.error("Erro ao criar a tabela");
            console.error(error.message);
        }
    };

    //     await execute(sql,(error)=>{
    //         if(error){
    //             console.log("Erro ao criar a tabela");
    //             console.log(error.message());
    //             return;
    //         }
    //         console.log("tabela criada com sucesso")
    //     }
    //     );
    // }
    
//module.exports = new tabelas();