
export default function verificaHeader(req,res,next){

    const authorization = req.headers.authorization;
    const openaiBeta = req.headers["openai-beta"];//captura o cabeçalho Openai-Beta

if (!authorization || !authorization.startsWith("Bearer ")) {
  return res.status(400).json({ error: "API Key não fornecida ou inválida no cabeçalho." });
}

//verificando se o cabeçalho OpenAi-Beta está presente e tem o valor esperado
if(!openaiBeta || openaiBeta !== "assistants=v2"){
    return res.status(400).json({error:"Cabeçalho OpenAI-Beta: assistants=v2 é obrigatorio"})
}
    const apiKey = authorization.split(" ")[1]; // Extrai a chave após "Bearer"
    req.apiKey = apiKey;
    next();
}
