"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getRole,
  isAuthenticated,
} from "../login/auth_service";

export default function ClienteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/login");
      return;
    }

    if (getRole() !== "CLIENTE") {
      router.replace("/admin");
      return;
    }

    setAutenticado(true);
  }, [router]);

  if (!autenticado) {
    return null;
  }

  const menu = [
    {
      nome: "Início",
      href: "/cliente",
      icon: "bi-house",
    },
    {
      nome: "Novo agendamento",
      href: "/cliente/agendar",
      icon: "bi-calendar-plus",
    },
    {
      nome: "Meus agendamentos",
      href: "/cliente/agendamentos",
      icon: "bi-calendar-check",
    },
  ];

  function estaAtivo(href: string) {
    if (href === "/cliente") {
      return pathname === "/cliente";
    }

    return pathname.startsWith(href);
  }

  return (
    <div
      className="d-flex"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8eef2",
      }}
    >
      <aside
        className="d-flex flex-column"
        style={{
          width: "250px",
          minHeight: "100vh",
          backgroundColor: "#fff8fa",
          borderRight: "1px solid #ead7df",
          padding: "30px 20px",
        }}
      >
        <div className="text-center mb-4">
          <div
            style={{
              width: "80px",
              height: "80px",
              margin: "0 auto 15px",
              border: "1px solid #8f536b",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Georgia, serif",
              color: "#30252a",
              fontSize: "1.5rem",
            }}
          >
            IM
          </div>

          <p
            className="mb-1"
            style={{
              fontFamily: "Georgia, serif",
              letterSpacing: "2px",
              color: "#30252a",
            }}
          >
            IVANI MELLO
          </p>

          <small
            style={{
              letterSpacing: "2px",
              color: "#8f536b",
            }}
          >
            ÁREA DO CLIENTE
          </small>
        </div>

        <hr style={{ borderColor: "#ead7df" }} />

        <nav className="d-flex flex-column gap-2 mt-3">
          {menu.map((item) => {
            const ativo = estaAtivo(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className="d-flex align-items-center gap-3 px-3 py-3"
                style={{
                  borderRadius: "14px",
                  backgroundColor: ativo ? "#f1dfe6" : "transparent",
                  color: ativo ? "#8f536b" : "#5d5156",
                  fontWeight: ativo ? 600 : 400,
                }}
              >
                <i className={`bi ${item.icon}`}></i>

                {item.nome}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto">
          <hr style={{ borderColor: "#ead7df" }} />

          <Link
            href="/logout"
            className="d-flex align-items-center gap-3 px-3 py-3"
            style={{
              color: "#8f536b",
            }}
          >
            <i className="bi bi-box-arrow-right"></i>
            Sair
          </Link>
        </div>
      </aside>

      <div className="flex-grow-1">
        <header
          className="d-flex align-items-center px-5"
          style={{
            height: "90px",
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #ead7df",
          }}
        >
          <strong
            style={{
              fontFamily: "Georgia, serif",
              letterSpacing: "2px",
            }}
          >
            IVANI MELLO STUDIO DE BELEZA
          </strong>
        </header>

        <main style={{ padding: "40px" }}>
          {children}
        </main>
      </div>
    </div>
  );
}