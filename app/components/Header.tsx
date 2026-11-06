"use client";

import Link from "next/link";
import { isAuthenticated } from "../login/auth_service";
import { useEffect, useState } from "react";

export default function Header() {
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    setAutenticado(isAuthenticated());
  }, []);

  return (
    <>
      <div
        className="text-center py-2"
        style={{
          backgroundColor: "#8f536b",
          color: "#fff",
          fontSize: "0.8rem",
          letterSpacing: "1px",
        }}
      >
        Seu momento de cuidado, em Nova Bassano
      </div>

      <nav className="navbar navbar-expand-lg bg-white border-bottom">
        <div className="container py-3">
          <Link
            href="/"
            className="navbar-brand"
            style={{
              fontFamily: "Georgia, serif",
              letterSpacing: "3px",
              color: "#2f2529",
            }}
          >
            <div>
              IVANI MELLO
            </div>

            <small
              style={{
                display: "block",
                fontFamily: "Arial, sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "4px",
              }}
            >
              STUDIO DE BELEZA
            </small>
          </Link>

          <div className="d-flex align-items-center gap-3">
            <Link
              href="/"
              className="d-none d-md-block"
              style={{ color: "#4f4348" }}
            >
              Início
            </Link>

            <Link
              href="/"
              className="d-none d-md-block"
              style={{ color: "#4f4348" }}
            >
              Serviços
            </Link>

            {!autenticado ? (
              <>
                <Link
                  href="/login"
                  className="btn px-4"
                  style={{
                    backgroundColor: "#8f536b",
                    color: "#fff",
                    borderRadius: "999px",
                  }}
                >
                  Agendar horário
                </Link>

                <Link
                  href="/login"
                  className="btn px-4"
                  style={{
                    border: "1px solid #d9bfc9",
                    color: "#8f536b",
                    borderRadius: "999px",
                  }}
                >
                  <i className="bi bi-person me-2"></i>
                  Login
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/admin"
                  className="btn px-4"
                  style={{
                    backgroundColor: "#8f536b",
                    color: "#fff",
                    borderRadius: "999px",
                  }}
                >
                  Painel
                </Link>

                <Link
                  href="/logout"
                  className="btn px-4"
                  style={{
                    border: "1px solid #d9bfc9",
                    color: "#8f536b",
                    borderRadius: "999px",
                  }}
                >
                  Sair
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}