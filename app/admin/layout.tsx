"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isAuthenticated, isAdmin } from "../login/auth_service";

export default function AdminLayout({
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

    if (!isAdmin()) {
      router.replace("/agendar");
      return;
    }

    setAutenticado(true);
  }, [router]);
  const menu = [
    {
      nome: "Dashboard",
      href: "/admin",
      icon: "bi-grid",
    },
    {
      nome: "Agenda",
      href: "/admin/agenda",
      icon: "bi-calendar",
    },
    {
      nome: "Clientes",
      href: "/admin/clientes",
      icon: "bi-people",
    },
    {
      nome: "Procedimentos",
      href: "/admin/procedimentos",
      icon: "bi-scissors",
    },
    {
      nome: "Produtos",
      href: "/admin/produtos",
      icon: "bi-bag",
    },
    {
      nome: "Configurações",
      href: "/admin/configuracoes",
      icon: "bi-gear",
    },
  ];

  function estaAtivo(href: string) {
    if (href === "/admin") {
      return pathname === "/admin";
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
          width: "260px",
          minHeight: "100vh",
          backgroundColor: "#fff8fa",
          borderRight: "1px solid #ead7df",
          padding: "30px 20px",
        }}
      >
        <div className="text-center mb-4">
          <div
            style={{
              width: "90px",
              height: "90px",
              margin: "0 auto 15px",
              border: "1px solid #8f536b",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Georgia, serif",
              color: "#30252a",
              fontSize: "1.6rem",
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
              letterSpacing: "3px",
              color: "#8f536b",
            }}
          >
            STUDIO DE BELEZA
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
                <i
                  className={`bi ${item.icon}`}
                  style={{
                    fontSize: "1.2rem",
                  }}
                ></i>

                {item.nome}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-4">
          <hr style={{ borderColor: "#ead7df" }} />

          <Link
            href="/logout"
            className="d-flex align-items-center gap-3 px-3 py-2"
            style={{
              color: "#8f536b",
            }}
          >
            <i className="bi bi-box-arrow-right"></i>
            Sair
          </Link>
        </div>
      </aside>

      <div
        className="flex-grow-1"
        style={{
          minWidth: 0,
        }}
      >
        <header
          className="d-flex justify-content-between align-items-center px-5"
          style={{
            height: "90px",
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #ead7df",
          }}
        >
          <div>
            <strong
              style={{
                fontFamily: "Georgia, serif",
                letterSpacing: "2px",
              }}
            >
              IVANI MELLO
            </strong>

            <small
              className="d-block"
              style={{
                letterSpacing: "2px",
                color: "#8f536b",
              }}
            >
              STUDIO DE BELEZA
            </small>
          </div>

          <div
            className="d-flex align-items-center gap-2"
            style={{ color: "#5d5156" }}
          >
            <i className="bi bi-person-circle"></i>
            Ivani
          </div>
        </header>

        <main style={{ padding: "40px" }}>
          {children}
        </main>
      </div>
    </div>
  );
}