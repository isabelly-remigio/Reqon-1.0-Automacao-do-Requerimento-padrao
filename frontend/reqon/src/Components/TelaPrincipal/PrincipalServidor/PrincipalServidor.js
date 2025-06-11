import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import "./PrincipalServidor.css";

const TelaServidor = () => {
  const [requerimentos, setRequerimentos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/requerimento")
      .then((res) => res.json())
      .then((data) => setRequerimentos(data))
      .catch((error) => console.error("Erro ao buscar requerimentos:", error));
  }, []);

  const pendentes = requerimentos.filter(
    (req) => req.status.trim().toLowerCase() === "analisando"
  );

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">
          <img src="/logo-branca.png" alt="Logo" />
        </div>
        <div className="navbar-links">
          <a href="/TelaPrincipal/PrincipalServidor/Finalizados">Requerimentos Concluídos</a>
          <a href="/TelaPrincipal/PrincipalServidor/PerfilS">
            <FaUserCircle size={24} title="Perfil" />
          </a>
          <a href="/">
            <FaSignOutAlt size={24} title="Sair" />
          </a>
        </div>
      </nav>

      <div className="solicitacoes-container">
        <h2>Requerimentos dos Alunos</h2>

        {pendentes.length === 0 ? (
          <p>Nenhum requerimento pendente.</p>
        ) : (
          <table className="solicitacoes-table">
            <thead>
              <tr>
                <th>Matrícula</th>
                <th>Tipo</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {pendentes.map((req) => (
                <tr key={req.id}>
                  <td>{req.aluno.matricula}</td>
                  <td>{req.titulo}</td>
                  <td>{new Date(req.createdAt).toLocaleDateString("pt-BR")}</td>
                  <td>
                    <button
                      className="btn-detalhes"
                      onClick={() => navigate(`/TelaPrincipal/Servidor/${req.id}`)}
                    >
                      Ver Detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TelaServidor;
