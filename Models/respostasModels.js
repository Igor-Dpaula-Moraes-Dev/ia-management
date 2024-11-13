async function listaMessage(topicoID) {
    try {
      const threadMessages = await openai.beta.threads.messages.list(topicoID);
      
      // Extrai e formata `role` e `content[].text.value` de cada mensagem
      const mensagensFormatadas = threadMessages.data.map(mensagem => ({
        role: mensagem.role,
        content: mensagem.content[0].text.value // Acessa o texto em `content[].text.value`
      }));
      
      return mensagensFormatadas;
    } catch (error) {
      console.error("Erro ao listar mensagens:", error);
      return { error: "Erro ao listar mensagens" };
    }
  }