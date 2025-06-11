import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import "./PerfilS.css";

const PerfilS = () => {
  const [servidor, setServidor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/servidor/1")
      .then((res) => res.json())
      .then((data) => setServidor(data))
      .catch((error) => console.error("Erro ao buscar perfil:", error));
  }, []);

  if (!servidor) {
    return (
      <div className="loading-container">
        <p>Carregando perfil...</p>
      </div>
    );
  }

  return (
    <div className="perfil-container">
      <nav className="navbar">
        <div className="navbar-logo">
          <img src="/logo-branca.png" alt="Logo" />
        </div>
        <div className="navbar-links">
          <Link to="/TelaPrincipal/PrincipalServidor" className="nav-link">
            Requerimentos
          </Link>
          <Link to={`/Perfil/${servidor.id}`} className="nav-icon" title="Perfil">
            <FaUserCircle size={28} />
          </Link>
          <Link to="/" className="nav-icon" title="Sair">
            <FaSignOutAlt size={28} />
          </Link>
        </div>
      </nav>

      <div className="perfil-card">
        <h2>Perfil do Servidor</h2>
        <div className="perfil-info">
          <p><strong>Nome:</strong> {servidor.nomeCompleto}</p>
          <p><strong>Matrícula:</strong> {servidor.matricula}</p>
          <p><strong>Email:</strong> {servidor.email}</p>
        </div>
        <Link
          to={`/TelaPrincipal/PrincipalServidor/PerfilS/Editar`}
          className="perfil-editar-btn"
        >
          Editar Perfil
        </Link>
      </div>
    </div>
  );
};

export default PerfilS;
