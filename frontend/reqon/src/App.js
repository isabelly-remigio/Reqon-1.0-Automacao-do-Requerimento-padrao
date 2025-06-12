import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/TelaDeLogin/Login";
import CadastroAluno from "./Components/TelaDeCadastro/CadastroAluno/CadastroAluno";
import CadastroServidor from "./Components/TelaDeCadastro/CadastroServidor/CadastroServidor";
import PrincipalAluno from "./Components/TelaPrincipal/PrincipalAluno/PrincipalAluno";
import PrincipalServidor from "./Components/TelaPrincipal/PrincipalServidor/PrincipalServidor";
import SolicitacaoAluno from "./Components/TelaDeSolicitacoes/SolicitacaoAlunos/SolicitacaoAlunos";
import DetalhesSolicitacao from "./Components/Servidor/Detalhes";
import Perfil from "./Components/TelaPrincipal/PrincipalAluno/Perfil/Perfil";
import EditarPerfil from "./Components/TelaPrincipal/PrincipalAluno/Perfil/EditarPerfi";
import RecuperarSenha from "./Components/RecuperarSenha/RecuperarSenha";
import RedefinirSenha from "./Components/RecuperarSenha/RedefinirSenha";
import Finalizados from "./Components/TelaPrincipal/PrincipalServidor/FInalizados";
import PerfilServidor from "./Components/TelaPrincipal/PrincipalServidor/Perfil/PerfilS";
import EditarPerfilServidor from "./Components/TelaPrincipal/PrincipalServidor/Perfil/Editar";
import Anexos from "./Components/Anexos/Anexo";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/TelaDeCadastro/CadastroAluno" element={<CadastroAluno />} />
      <Route path="/TelaDeCadastro/CadastroServidor" element={<CadastroServidor />} />
      <Route path="/TelaPrincipal/PrincipalAluno" element={<PrincipalAluno />} />
      <Route path="/TelaPrincipal/PrincipalServidor" element={<PrincipalServidor />} />
      <Route path="/TelaPrincipal/PrincipalServidor/Finalizados" element={<Finalizados />} />
      <Route path="/TelaDeSolicitacoes/SolicitacaoAluno" element={<SolicitacaoAluno />} />
      <Route path="/TelaPrincipal/Servidor/:id" element={<DetalhesSolicitacao />} />
      <Route path="/TelaPrincipal/PrincipalServidor/PerfilS" element={<PerfilServidor />} />
      <Route path="/TelaPrincipal/PrincipalServidor/PerfilS/Editar" element={<EditarPerfilServidor />} />
      <Route path="/anexos" element={<Anexos />} />
      <Route path="/perfil/:id" element={<Perfil />} />
        <Route path="/editar-perfil/:id" element={<EditarPerfil />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/redefinir-senha" element={<RedefinirSenha />} />
    </Routes>
  );
};

export default App;
