"use client";

import { useState } from "react";
import { saveRole, saveToken } from "./auth_service";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");

  async function submitForm(event: any) {
    event.preventDefault();
    setErro("");

    try {
      const resp = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const dados = await resp.json();

      if (!resp.ok) {
        setErro(dados.message || "E-mail ou senha incorretos.");
        return;
      }

      saveToken(dados.access_token);
      saveRole(dados.role);

      if (dados.role === "ADMIN") {
        router.replace("/admin");
      } else {
        router.replace("/cliente");
      }
    } catch (error) {
      console.error(error);
      setErro("Não foi possível conectar com o backend.");
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
          maxWidth: "520px",
          backgroundColor: "#ffffff",
          borderRadius: "24px",
          border: "1px solid #ead7df",
          boxShadow: "0 15px 40px rgba(143, 83, 107, 0.08)",
        }}
      >
        <div className="text-center mb-5">
          <div
            className="mb-3"
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
        ></div>

        <h1
          className="mb-2"
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "3rem",
            color: "#30252a",
            fontWeight: 400,
          }}
        >
          Login
        </h1>

        <p
          className="mb-4"
          style={{
            color: "#7a6c72",
          }}
        >
          Acesse sua área administrativa.
        </p>

        {erro && (
          <div className="alert alert-danger">
            {erro}
          </div>
        )}

        <form onSubmit={submitForm}>
          <div className="mb-4">
            <label className="form-label">
              E-mail
            </label>

            <div className="input-group">
              <span
                className="input-group-text bg-white"
                style={{
                  borderColor: "#e5ccd6",
                  color: "#8f536b",
                }}
              >
                <i className="bi bi-envelope"></i>
              </span>

              <input
                type="email"
                className="form-control"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  borderColor: "#e5ccd6",
                  padding: "14px",
                }}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label">
              Senha
            </label>

            <div className="input-group">
              <span
                className="input-group-text bg-white"
                style={{
                  borderColor: "#e5ccd6",
                  color: "#8f536b",
                }}
              >
                <i className="bi bi-lock"></i>
              </span>

              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  borderColor: "#e5ccd6",
                  padding: "14px",
                }}
                required
              />

              <button
                type="button"
                className="btn bg-white"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  border: "1px solid #e5ccd6",
                  color: "#8f536b",
                }}
              >
                <i
                  className={
                    showPassword
                      ? "bi bi-eye"
                      : "bi bi-eye-slash"
                  }
                ></i>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn w-100 py-3 mt-2"
            style={{
              backgroundColor: "#8f536b",
              color: "#fff",
              borderRadius: "14px",
              fontSize: "1rem",
            }}
          >
            Entrar
          </button>
        </form>

        <div className="text-center mt-4">
          <Link
            href="/"
            style={{
              color: "#8f536b",
            }}
          >
            Voltar para o site
          </Link>
        </div>
      </div>
    </main>
  );
}