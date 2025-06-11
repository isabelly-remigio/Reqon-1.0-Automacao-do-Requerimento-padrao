import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { FaUser, FaLock, FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [action, setAction] = useState("active");
  const [selectedOption, setSelectedOption] = useState("");
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const toggleForm = (formType) => {
    setAction(formType === "register" ? "active" : "");
    setMensagem("");
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleConfirm = () => {
    if (selectedOption) {
      setAction("");
      setMatricula("");
      setSenha("");
    } else {
      alert("Por favor, selecione uma opção.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!matricula || !senha || !selectedOption) {
      setMensagem("Por favor, selecione Aluno ou Servidor e preencha todos os campos.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        matricula,
        senha,
        tipo: selectedOption, 
      });

      if (response.data.token && response.data.alunoId) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("alunoId", response.data.alunoId);
        setMensagem("Login bem-sucedido!");

        if (selectedOption === "Aluno") {
          navigate("/TelaPrincipal/PrincipalAluno");
        } else if (selectedOption === "Servidor") {
          navigate("/TelaPrincipal/PrincipalServidor");
        }
      } else {
        setMensagem("Matrícula ou senha incorretos!");
      }
    } catch (err) {
      console.error("Erro na requisição:", err);
      if (err.response) {
        setMensagem(err.response.data.error || "Erro ao realizar login.");
      } else {
        setMensagem("Erro de rede ou servidor não disponível.");
      }
    }
  };

  const getCadastroLink = () => {
    if (selectedOption === "Aluno") {
      return "/TelaDeCadastro/CadastroAluno";
    }
    if (selectedOption === "Servidor") {
      return "/TelaDeCadastro/CadastroServidor";
    }
    return "#";
  };

  return (
    <div className="login-page"> {/* Adicionada div para envolvimento da página de login */}
      <div className="logo-container">
        <img src="/logo-branca.png" alt="Logo da aplicação" />
      </div>

      <div className={`wrapper ${action}`}>
        <div className="form-box register">
          <form>
            <h1>Deseja entrar como?</h1>
            <div className="options">
              <div
                className={`option ${selectedOption === "Aluno" ? "selected" : ""}`}
                onClick={() => handleOptionClick("Aluno")}
              >
                Aluno
              </div>
              <div
                className={`option ${selectedOption === "Servidor" ? "selected" : ""}`}
                onClick={() => handleOptionClick("Servidor")}
              >
                Servidor
              </div>
            </div>

            <button type="button" className="confirm-button" onClick={handleConfirm}>
              Confirmar
            </button>
          </form>
        </div>

        <div className="form-box login">
          <form onSubmit={handleSubmit}>
            <div className="back-button" onClick={() => toggleForm("register")}>
              <FaArrowLeft className="back-icon" />
            </div>
            <h1>Login</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder="Matrícula"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                required
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
              <FaLock className="icon" />
            </div>

            <div className="remember-forgot">
              <label>
                <input type="checkbox" />
                Lembrar
              </label>
              <a href="/recuperar-senha" id="esqueci">
                Esqueceu a senha?
              </a>
            </div>

            <button type="submit">Login</button>

            {mensagem && <p className="mensagem">{mensagem}</p>}

            <div className="register-link">
              <p>
                Ainda não tem cadastro?{" "}
                {selectedOption ? (
                  <Link to={getCadastroLink()} onClick={() => toggleForm("")}>
                    Cadastre-se
                  </Link>
                ) : (
                  <span onClick={() => alert("Por favor, selecione uma opção antes de prosseguir.")}>
                    Cadastre-se
                  </span>
                )}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;