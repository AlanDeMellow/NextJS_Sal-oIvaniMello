"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [telefone, setTelefone] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function registrar(event: React.FormEvent) {
        event.preventDefault();

        setErro("");

        if (password !== confirmPassword) {
            setErro("As senhas não coincidem.");
            return;
        }

        try {
            setCarregando(true);

            const response = await fetch(
                "http://localhost:3000/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        passwordHash: password,
                        telefone,
                    }),
                }
            );

            const dados = await response.json();

            if (!response.ok) {
                throw new Error(
                    dados.message || "Não foi possível realizar o cadastro."
                );
            }

            alert("Cadastro realizado com sucesso!");

            router.push("/login");
        } catch (error) {
            console.error(error);

            if (error instanceof Error) {
                setErro(error.message);
            } else {
                setErro("Não foi possível realizar o cadastro.");
            }
        } finally {
            setCarregando(false);
        }
    }
    return (
        <main
            className="d-flex align-items-center justify-content-center"
            style={{
                minHeight: "100vh",
                backgroundColor: "#f8eef2",
                padding: "30px",
            }}
        >
            <div
                className="p-5"
                style={{
                    width: "100%",
                    maxWidth: "550px",
                    backgroundColor: "#ffffff",
                    borderRadius: "24px",
                    border: "1px solid #ead7df",
                    boxShadow: "0 15px 40px rgba(143, 83, 107, 0.08)",
                }}
            >
                <div className="text-center mb-4">
                    <div
                        style={{
                            fontFamily: "Georgia, serif",
                            fontSize: "1.7rem",
                            letterSpacing: "4px",
                            color: "#30252a",
                        }}
                    >
                        IVANI MELLO
                    </div>

                    <p
                        style={{
                            fontSize: "0.7rem",
                            letterSpacing: "4px",
                            color: "#8f536b",
                        }}
                    >
                        STUDIO DE BELEZA
                    </p>
                </div>

                <div
                    style={{
                        width: "40px",
                        height: "2px",
                        backgroundColor: "#8f536b",
                        marginBottom: "20px",
                    }}
                />

                <h1
                    className="mb-2"
                    style={{
                        fontFamily: "Georgia, serif",
                        color: "#30252a",
                        fontSize: "2.7rem",
                        fontWeight: 400,
                    }}
                >
                    Criar conta
                </h1>

                <p
                    className="mb-4"
                    style={{
                        color: "#7a6c72",
                    }}
                >
                    Crie sua conta para realizar agendamentos.
                </p>

                {erro && (
                    <div className="alert alert-danger">
                        {erro}
                    </div>
                )}

                <form onSubmit={registrar}>
                    <div className="mb-3">
                        <label className="form-label">
                            Nome
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Telefone
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            E-mail
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Senha
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">
                            Confirmar senha
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={carregando}
                        className="btn w-100 py-3"
                        style={{
                            backgroundColor: "#8f536b",
                            color: "#ffffff",
                            borderRadius: "12px",
                        }}
                    >
                        {carregando
                            ? "Criando conta..."
                            : "Criar conta"}
                    </button>
                </form>

                <div className="text-center mt-4">
                    <span style={{ color: "#7a6c72" }}>
                        Já possui uma conta?{" "}
                    </span>

                    <Link
                        href="/login"
                        style={{
                            color: "#8f536b",
                            fontWeight: 600,
                        }}
                    >
                        Fazer login
                    </Link>
                </div>

                <div className="text-center mt-3">
                    <Link
                        href="/"
                        style={{
                            color: "#8f536b",
                        }}
                    >
                        Voltar para o início
                    </Link>
                </div>
            </div>
        </main>
    );
}