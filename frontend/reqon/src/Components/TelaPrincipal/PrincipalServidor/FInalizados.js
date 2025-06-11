import React, { useEffect, useState } from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import "./Finalizados.css";

const Finalizados = () => {
  const [finalizados, setFinalizados] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/requerimento")
      .then((res) => res.json())
      .then((data) => {
        const requerimentosFinalizados = data.filter(
          (req) =>
            req.status.trim().toLowerCase() === "aceito" ||
            req.status.trim().toLowerCase() === "indeferido"
        );
        setFinalizados(requerimentosFinalizados);
      })
      .catch((error) => console.error("Erro ao buscar requerimentos:", error));
  }, []);

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
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
          <a href="/TelaPrincipal/PrincipalServidor">Requerimentos em aberto</a>
          <a href="/TelaPrincipal/PrincipalServidor/PerfilS">
            <FaUserCircle size={24} title="Perfil" />
          </a>
          <a href="/">
            <FaSignOutAlt size={24} title="Sair" />
          </a>
        </div>
      </nav>

      <div className="solicitacoes-container">
        <h2>Requerimentos Finalizados</h2>
        {finalizados.length === 0 ? (
          <p>Nenhum requerimento finalizado.</p>
        ) : (
          <table className="solicitacoes-table">
            <thead>
              <tr>
                <th>Matrícula</th>
                <th>Tipo</th>
                <th>Data</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {finalizados.map((req) => (
                <tr key={req.id}>
                  <td>{req.aluno.matricula}</td>
                  <td>{req.titulo}</td>
                  <td>{new Date(req.createdAt).toLocaleDateString("pt-BR")}</td>
                  <td>
                    <span className={`status ${getStatusClass(req.status)}`}>
                      {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                    </span>
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

export default Finalizados;
