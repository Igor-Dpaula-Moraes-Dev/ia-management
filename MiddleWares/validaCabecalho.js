
export default function verificaHeader(req,res,next){

    const authorization = req.headers.authorization;

if (!authorization || !authorization.startsWith("Bearer ")) {
  return res.status(400).json({ error: "API Key não fornecida ou inválida no cabeçalho." });
}
    const apiKey = authorization.split(" ")[1]; // Extrai a chave após "Bearer"
    req.apiKey = apiKey;
    next();
}
