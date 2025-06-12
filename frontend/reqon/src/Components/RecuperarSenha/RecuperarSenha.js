import { useState } from "react";
import "./RecuperarSenha.css";

export default function RecuperarSenha() {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [linkRecuperacao, setLinkRecuperacao] = useState("");  // Novo estado para o link

  const handleRecuperarSenha = async () => {
    if (!email) {
      setMensagem("Digite seu e-mail.");
      return;
    }
    
    try {
      const resposta = await fetch("http://localhost:3000/recuperar-senha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      
      const resultado = await resposta.json();

      if (resultado.link) {
        setLinkRecuperacao(resultado.link);
      } else {
        setMensagem(resultado.message);
      }
    } catch (erro) {
      setMensagem("Erro ao enviar solicitação.");
    }
  };

  return (
    <div className="recuperar-page">
    <div className="senha-container">
      <h2>Recuperar Senha</h2>
      <input
        type="email"
        placeholder="Digite seu e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="senha-input"
      />
      <button onClick={handleRecuperarSenha} className="senha-botao">Enviar</button>
      {mensagem && <p className="senha-mensagem">{mensagem}</p>}
      
      {/* Exibindo o link caso ele seja retornado */}
      {linkRecuperacao && (
        <div>
          <p>Utilize o seguinte link para redefinir sua senha:</p>
          <a href={linkRecuperacao} target="_blank" rel="noopener noreferrer">Clique aqui para redefinir a senha</a>
        </div>
      )}
    </div>
    </div>
  );
}
