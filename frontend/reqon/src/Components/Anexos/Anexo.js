import React from "react";
import "./Anexo.css";

const Anexos = () => {
    const handleVoltar = () => {
    window.history.back();
  };
  return (
    <div className="anexos-container">
        <nav className="navbar">
                <div className="navbar-logo">
                  <img src="/logo-branca.png" alt="Logo" />
                </div>
              </nav>
              <div className="anexos-header">
       <button className="btn-voltar" onClick={handleVoltar}>
        ← Voltar
      </button>  
      <h1>Anexos</h1>
      </div>
      <table className="solicitacoes-table">
        <thead>
          <tr>
            <th>Anexo</th>
            <th>Documento</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>a</td>
            <td>Atestado Médico</td>
            <td>Comprova aptidão física ou condição especial</td>
          </tr>
          <tr>
            <td>b</td>
            <td>CTPS (Identificação e Contrato)</td>
            <td>Cópia das páginas da Carteira de Trabalho com identificação e vínculo empregatício</td>
          </tr>
          <tr>
            <td>c</td>
            <td>Declaração de Transferência</td>
            <td>Documento da instituição de origem informando a transferência</td>
          </tr>
          <tr>
            <td>d</td>
            <td>Declaração da Empresa</td>
            <td>Deve conter o horário de trabalho atualizado</td>
          </tr>
          <tr>
            <td>e</td>
            <td>Guia de Transferência</td>
            <td>Emitida pela escola de origem</td>
          </tr>
          <tr>
            <td>f</td>
            <td>Histórico Escolar - Ensino Fundamental</td>
            <td>Documento original do histórico do Ensino Fundamental</td>
          </tr>
          <tr>
            <td>g</td>
            <td>Histórico Escolar - Ensino Médio</td>
            <td>Documento original do histórico do Ensino Médio</td>
          </tr>
          <tr>
            <td>h</td>
            <td>Histórico Escolar - Ensino Superior</td>
            <td>Documento original do histórico do Ensino Superior</td>
          </tr>
          <tr>
            <td>i</td>
            <td>Ementas</td>
            <td>Ementas das disciplinas cursadas com aprovação</td>
          </tr>
          <tr>
            <td>j</td>
            <td>Declaração de Unidade Militar</td>
            <td>Documento para comprovação de vínculo com unidade militar</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Anexos;
