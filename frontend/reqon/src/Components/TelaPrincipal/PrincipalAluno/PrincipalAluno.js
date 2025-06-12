import React, { useState } from "react";
import { FaPaperclip, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./PrincipalAluno.css";
import { Link } from "react-router-dom";

const PrincipalAluno = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [files, setFiles] = useState([]);
  const [observations, setObservations] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const alunoId = localStorage.getItem("alunoId") || 1;

  const handleSelectChange = (e) => setSelectedOption(e.target.value);

  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files);
    const invalidFiles = filesArray.filter(
      (file) => file.type !== "application/pdf"
    );

    if (invalidFiles.length > 0) {
      setMessage("Apenas arquivos PDF.");
      return;
    }

    setFiles(filesArray);
  };

  const handleObservationsChange = (e) => setObservations(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedOption || files.length === 0 || !observations) {
      setMessage("Preencha todos os campos.");
      return;
    }

    const formData = new FormData();
    formData.append("alunoId", alunoId);
    formData.append("titulo", selectedOption);
    formData.append("observacoes", observations);

    files.forEach((file) => {
      formData.append("anexo", file);
    });

    try {
      const response = await fetch(
        "http://localhost:3000/requerimento/enviar",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Requerimento enviado com sucesso!");
        setFiles([]);
        setSelectedOption("");
        setObservations("");
        navigate("/TelaDeSolicitacoes/SolicitacaoAluno");
      } else {
        setMessage(data.message || "Erro ao enviar o requerimento.");
      }
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
      setMessage("Erro ao enviar o requerimento. Tente novamente.");
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">
          <img src="/logo-branca.png" alt="Logo" />
        </div>
        <div className="navbar-links">
          <a href="/TelaDeSolicitacoes/SolicitacaoAluno">Minhas Solicitações</a>
          <a href={`/Perfil/${alunoId}`}>
            <FaUserCircle size={24} title="Perfil" />
          </a>
          <a href="/">
            <FaSignOutAlt size={24} title="Sair" />
          </a>
        </div>
      </nav>

      <div className="principal-aluno-container">
        <h2>Formulário de Requerimento</h2>
        <form onSubmit={handleSubmit}>
          <div className="principal-form-group">
            <label htmlFor="selectOption">Selecione a opção:</label>
            <select
              id="selectOption"
              value={selectedOption}
              onChange={handleSelectChange}
              required
            >
              <option value="">Selecione...</option>
              <option value="Matriz curricular">Matriz curricular</option>
              <option value="Trancamento de Matrícula">
                Trancamento de Matrícula
              </option>
              <option value="Certificado de Conclusão">
                Certificado de Conclusão
              </option>
              <option value="Admissão por Transferência e Análise Curricular (anexos) - Solicitação no Protocolo Geral">
                Admissão por Transferência e Análise Curricular -
                Solicitação no Protocolo Geral  (anexos: c, f, g, h, j)
              </option>
              <option value="Ajuste de Matrícula Semestral">
                Ajuste de Matrícula Semestral
              </option>
              <option value="Cancelamento de Matrícula">
                Cancelamento de Matrícula
              </option>
              <option value="Cancelamento de Disciplina (especifique)">
                Cancelamento de Disciplina (especifique)
              </option>
              <option value="Certidão - Autenticidade (especifique)">
                Certidão - Autenticidade (especifique)
              </option>
              <option value="Complementação de Matrícula (especifique)">
                Complementação de Matrícula (especifique)
              </option>
              <option value="Cópia Xerox de Documento (especifique)">
                Cópia Xerox de Documento (especifique)
              </option>
              <option value="Declaração de Colação de Grau e Tramitação de Diploma (curso tecnológico)">
                Declaração de Colação de Grau e Tramitação de Diploma (curso
                tecnológico)  (anexos: a/b, d)
              </option>
              <option value="Declaração de Matrícula ou Matrícula Vínculo (especifique)">
                Declaração de Matrícula ou Matrícula Vínculo (especifique)
              </option>
              <option value="Declaração de Monitoria">
                Declaração de Monitoria
              </option>
              <option value="Diploma">Diploma</option>
              <option value="Dispensa da prática de Educação Física (anexos)">
                Dispensa da prática de Educação Física  (anexos: a/j)
              </option>
              <option value="Ementa de disciplina - (especifique)">
                Ementa de disciplina - (especifique)
              </option>
              <option value="Guia de Transferência">
                Guia de Transferência
              </option>
              <option value="Histórico Escolar">Histórico Escolar</option>
              <option value="Isenção de disciplinas cursadas (anexo)">
                Isenção de disciplinas cursadas (anexos: f/g/h, i)
              </option>
              <option value="Justificativa de falta(s) ou prova 2 o chamada">
                Justificativa de falta(s) ou prova 2 o chamada  (anexos: a, d, i)
              </option>
              <option value="Reabertura de Matrícula">
                Reabertura de Matrícula
              </option>
              <option value="Reintegração">Reintegração</option>
              <option value="Reintegração para Cursar (Solicitar no Protocolo Geral)">
                Reintegração para Cursar (Solicitar no Protocolo Geral)
              </option>
              <option value="Solicitação de Conselho de Classe">
                Solicitação de Conselho de Classe
              </option>
              <option value="Transferência de Turno (especifique turno)">
                Transferência de Turno (especifique turno) (anexos: a/j)
              </option>
              <option value="Lançamento de Nota">Lançamento de Nota</option>
              <option value="Revisão de Nota">Revisão de Nota</option>
              <option value="Revisão de faltas">Revisão de faltas</option>
              <option value="Outros (relatar abaixo em OBSERVAÇÕES)">
                Outros (relatar abaixo em OBSERVAÇÕES)
              </option>
            </select>
          </div>

          <div className="principal-form-group">
            <label htmlFor="fileUpload">Anexar PDFs:</label>
            <div className="input-anexo">
              <label htmlFor="fileUpload">
                <FaPaperclip />
                Clique para anexar arquivos
              </label>
              <input
                type="file"
                id="fileUpload"
                accept="application/pdf"
                onChange={handleFileChange}
                multiple
                required
              />
            </div>
          </div>

          {files.length > 0 && (
            <div className="principal-file-list">
              <h4>Arquivos adicionados:</h4>
              <ul>
                {files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="principal-form-group">
            <label htmlFor="observations">Observações:</label>
            <textarea
              id="observations"
              value={observations}
              onChange={handleObservationsChange}
              required
            />
          </div>
            <Link className="link-anexos"
              to="/anexos"
              >
              Veja a lista de anexos aqui
            </Link>
          <button type="submit" className="principal-submit-button">
            Enviar
          </button>
        </form>

        {message && <p className="principal-message">{message}</p>}
      </div>
    </div>
  );
};

export default PrincipalAluno;
