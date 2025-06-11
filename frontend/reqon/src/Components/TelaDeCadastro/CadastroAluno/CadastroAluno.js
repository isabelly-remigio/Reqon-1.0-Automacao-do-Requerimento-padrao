import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './CadastroAluno.css';

function CadastroAluno() {
    const [formData, setFormData] = useState({
        nomeCompleto: "",
        matricula: "",
        dataNascimento: "",
        cpf: "",
        rg: "",
        telefone: "",
        senha: "",
        confirmarSenha: "",
        curso: "",
        periodo: "",
        turno: "",
        orgaoExpedidor: "",
        email: "",
        confirmarEmail: ""
    });

    const [mensagem, setMensagem] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.senha !== formData.confirmarSenha) {
            setMensagem("As senhas não coincidem.");
            return;
        }

        const { confirmarSenha, ...dataToSend } = formData;

        try {
            const response = await axios.post("http://localhost:3000/aluno/cadastro", dataToSend);
            setMensagem("Cadastro realizado com sucesso!");
            console.log(response.data);
            navigate('/');
        } catch (error) {
            setMensagem(error.response?.data?.message || "Erro ao realizar o cadastro.");
            console.error("Erro:", error);
        }
    };

    useEffect(() => {
        document.body.classList.add('cadastro');
        return () => {
            document.body.classList.remove('cadastro');
        };
    }, []);

    return (
        <>
            <div className="navbar">
                <div className="logo">
                    <img src='/logo-branca.png' alt="Logo da aplicação" />
                </div>
            </div>

            <div className="container-cadastro">
                <div className="card-cadastro">
                    <header className="header-cadastro">Cadastro</header>
                    <form className="form-cadastro" onSubmit={handleSubmit}>
                        <div className="grid-cadastro">
                            <label className="label-cadastro">
                                Nome Completo:
                                <input
                                    type="text"
                                    name="nomeCompleto"
                                    placeholder="Digite seu nome completo"
                                    className="input-cadastro"
                                    value={formData.nomeCompleto}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label className="label-cadastro">
                                Matrícula:
                                <input
                                    type="text"
                                    name="matricula"
                                    placeholder="Digite sua matrícula"
                                    className="input-cadastro"
                                    value={formData.matricula}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label className="label-cadastro">
                                Data de Nascimento:
                                <input
                                    type="date"
                                    name="dataNascimento"
                                    className="input-cadastro"
                                    value={formData.dataNascimento}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label className="label-cadastro">
                                CPF:
                                <input
                                    type="text"
                                    name="cpf"
                                    placeholder="Digite seu CPF"
                                    maxLength="11"
                                    className="input-cadastro"
                                    value={formData.cpf}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label className="label-cadastro">
                                RG:
                                <input
                                    type="text"
                                    name="rg"
                                    maxLength="9"
                                    placeholder="Digite seu RG"
                                    className="input-cadastro"
                                    value={formData.rg}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="label-cadastro">
                                Telefone:
                                <input
                                    type="tel"
                                    name="telefone"
                                    placeholder="Digite seu telefone"
                                    className="input-cadastro"
                                    value={formData.telefone}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label className="label-cadastro">
                                Senha:
                                <input
                                    type="password"
                                    name="senha"
                                    placeholder="Digite sua senha"
                                    className="input-cadastro"
                                    value={formData.senha}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label className="label-cadastro">
                                Confirmar Senha:
                                <input
                                    type="password"
                                    name="confirmarSenha"
                                    placeholder="Confirme sua senha"
                                    className="input-cadastro"
                                    value={formData.confirmarSenha}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label className="label-cadastro">
                                Curso:
                                <select
                                    name="curso"
                                    className="input-cadastro"
                                    value={formData.curso}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Selecione o curso</option>
                                    <option value="Análise e Desenvolvimento de Sistemas">Análise e Desenvolvimento de Sistemas</option>
                                    <option value="Informática para Internet">Informática para Internet</option>
                                    <option value="Qualidade">Qualidade</option>
                                    <option value="Comércio e Gestão de Negócios">Comércio e Gestão de Negócios</option>
                                    <option value="Administração">Administração</option>
                                    <option value="Técnico Integrado em Desenvolvimento de Sistemas">Técnico Integrado em Desenvolvimento de Sistemas</option>
                                </select>
                            </label>

                            <label className="label-cadastro">
                                Período:
                                <input
                                    type="text"
                                    name="periodo"
                                    placeholder="Digite seu período"
                                    className="input-cadastro"
                                    value={formData.periodo}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label className="label-cadastro">
                                Turno:
                                <select
                                    name="turno"
                                    className="input-cadastro"
                                    value={formData.turno}
                                    onChange={handleChange}
                                >
                                    <option value="">Selecione o turno</option>
                                    <option value="manhã">Manhã</option>
                                    <option value="tarde">Tarde</option>
                                    <option value="noite">Noite</option>
                                </select>
                            </label>

                            <label className="label-cadastro">
                                Órgão Expedidor:
                                <input
                                    type="text"
                                    name="orgaoExpedidor"
                                    placeholder="Digite o órgão expedidor"
                                    className="input-cadastro"
                                    value={formData.orgaoExpedidor}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="label-cadastro">
                                Email:
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Digite o email discente"
                                    className="input-cadastro"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="label-cadastro">
                                Confirmar Email:
                                <input
                                    type="text"
                                    name="confirmarEmail"
                                    placeholder="Confirme o email discente"
                                    className="input-cadastro"
                                    value={formData.confirmarEmail}
                                    onChange={handleChange}
                                />
                            </label>

                        </div>
                        <div className="checkbox-cadastro">
                            <label>
                                <input type="checkbox" required />
                                Concordo com os Termos de Uso e a Política de Privacidade
                            </label>
                        </div>
                        <div className="footer-cadastro">
                            <button type="submit" className="button-cadastro">Cadastrar</button>
                        </div>
                        
                        <p className="link-cadastro">
                            Já tem cadastro?{" "}
                            <span onClick={() => navigate('/')} className="link-login">
                                Faça login
                            </span>
                        </p>
                        {mensagem && <p className="mensagem-cadastro">{mensagem}</p>}
                    </form>
                </div>
            </div>
        </>
    );
}

export default CadastroAluno;
