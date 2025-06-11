import React, { useEffect, useState } from "react";
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import './SolicitacaoAluno.css';

const SolicitacaoAluno = () => {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [alunoId, setAlunoId] = useState(null); 

  useEffect(() => {
    const id = localStorage.getItem("alunoId");
    setAlunoId(id); 

    if (!id) {
      console.error("Aluno não identificado.");
      return;
    }

    const fetchSolicitacoes = async () => {
      try {
        const response = await fetch(`http://localhost:3000/requerimento/aluno/${id}`);
        const data = await response.json();
        setSolicitacoes(data);
      } catch (error) {
        console.error("Erro ao buscar solicitações:", error);
      }
    };

    fetchSolicitacoes();
  }, []);

  const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case "analisando":
      return "status-analisando";
    case "aceito":
      return "status-aceito";
    case "indeferido":
      return "status-indeferido";
    default:
      return "status-padrao";
  }
};


  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">
          <img src="/logo-branca.png" alt="Logo" />
        </div>
        <div className="navbar-links">
          <a href="/TelaPrincipal/PrincipalAluno">Requerimento</a>
          <a href={alunoId ? `/Perfil/${alunoId}` : "#"}>
            <FaUserCircle size={24} title="Perfil" />
          </a>
          <a href="/" onClick={() => localStorage.removeItem("alunoId")}>
            <FaSignOutAlt size={24} title="Sair" />
          </a>
        </div>
      </nav>

      <div className="solicitacoes-container">
        <h2>Minhas Solicitações</h2>
        {solicitacoes.length > 0 ? (
          <table className="solicitacoes-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Solicitação</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {solicitacoes.map((solicitacao) => (
                <tr key={solicitacao.id}>
                  <td>{new Date(solicitacao.createdAt).toLocaleDateString("pt-BR")}</td>
                  <td>{solicitacao.titulo}</td>
                  <td>
  <span className={`status ${getStatusClass(solicitacao.status)}`}>
    {solicitacao.status}
  </span>
</td>

                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nenhuma solicitação encontrada.</p>
        )}
      </div>
    </div>
  );
};

export default SolicitacaoAluno;
