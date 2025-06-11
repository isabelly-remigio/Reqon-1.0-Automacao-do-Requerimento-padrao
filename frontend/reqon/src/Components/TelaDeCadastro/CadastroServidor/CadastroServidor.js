import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CadastroServidor() {
    const [formData, setFormData] = useState({
        nomeCompleto: "",
        matricula: "",
        senha: "",
        confirmarSenha: "",
        email:"",
        confirmarEmail: ""
    });

    const [mensagem, setMensagem] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3000/servidor/cadastro", formData);
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
                <div className="content-cadastro">
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
                                    SIAPE:
                                    <input
                                        type="text"
                                        name="matricula"
                                        placeholder="Digite seu SIAPE"
                                        className="input-cadastro"
                                        value={formData.matricula}
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
                                        placeholder="Confirme a Senha"
                                        className="input-cadastro"
                                        value={formData.confirmarSenha}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>

                                <label className="label-cadastro">
                                    Email:
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder="Digite o email docente"
                                        className="input-cadastro"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                                <label className="label-cadastro">
                                Confirmar Email:
                                <input
                                    type="text"
                                    name="confirmarEmail"
                                    placeholder="Confirme o email docente"
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
            </div>
        </>
    );
}

export default CadastroServidor;
