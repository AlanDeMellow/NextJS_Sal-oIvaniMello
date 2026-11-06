"use client";

import Link from "next/link";

export default function ClientePage() {
  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          marginBottom: "40px",
        }}
      >
        <span
          style={{
            display: "inline-block",
            marginBottom: "10px",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#8f536b",
          }}
        >
          Área do cliente
        </span>

        <h1
          style={{
            margin: 0,
            fontFamily: "Georgia, serif",
            fontSize: "2.8rem",
            fontWeight: 400,
            color: "#30252a",
          }}
        >
          Bem-vindo
        </h1>

        <p
          style={{
            marginTop: "10px",
            marginBottom: 0,
            color: "#7a6c72",
            fontSize: "1rem",
          }}
        >
          Gerencie seus horários e acompanhe seus agendamentos de forma simples.
        </p>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <Link
            href="/cliente/agendar"
            style={{
              textDecoration: "none",
            }}
          >
            <div
              style={{
                minHeight: "280px",
                background:
                  "linear-gradient(135deg, #fff8fa 0%, #f3e2e9 100%)",
                border: "1px solid #ead7df",
                borderRadius: "24px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 12px 35px rgba(83, 54, 67, 0.05)",
              }}
            >
              <div>
                <div
                  style={{
                    width: "58px",
                    height: "58px",
                    borderRadius: "16px",
                    backgroundColor: "#ffffff",
                    border: "1px solid #e4cad4",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#8f536b",
                    fontSize: "1.5rem",
                    marginBottom: "24px",
                  }}
                >
                  <i className="bi bi-calendar-plus"></i>
                </div>

                <small
                  style={{
                    color: "#8f536b",
                    letterSpacing: "2px",
                    fontWeight: 600,
                  }}
                >
                  AGENDAMENTO
                </small>

                <h2
                  style={{
                    marginTop: "8px",
                    marginBottom: "12px",
                    fontFamily: "Georgia, serif",
                    fontSize: "2rem",
                    fontWeight: 400,
                    color: "#30252a",
                  }}
                >
                  Novo agendamento
                </h2>

                <p
                  style={{
                    color: "#786a70",
                    lineHeight: 1.7,
                    marginBottom: 0,
                  }}
                >
                  Escolha um procedimento, selecione a data e reserve o melhor
                  horário para você.
                </p>
              </div>

              <div
                style={{
                  marginTop: "30px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "#8f536b",
                  fontWeight: 600,
                }}
              >
                Agendar horário
                <i className="bi bi-arrow-right"></i>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-6">
          <Link
            href="/cliente/agendamentos"
            style={{
              textDecoration: "none",
            }}
          >
            <div
              style={{
                minHeight: "280px",
                backgroundColor: "#ffffff",
                border: "1px solid #ead7df",
                borderRadius: "24px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 12px 35px rgba(83, 54, 67, 0.05)",
              }}
            >
              <div>
                <div
                  style={{
                    width: "58px",
                    height: "58px",
                    borderRadius: "16px",
                    backgroundColor: "#f7e9ef",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#8f536b",
                    fontSize: "1.5rem",
                    marginBottom: "24px",
                  }}
                >
                  <i className="bi bi-calendar-check"></i>
                </div>

                <small
                  style={{
                    color: "#8f536b",
                    letterSpacing: "2px",
                    fontWeight: 600,
                  }}
                >
                  MEUS HORÁRIOS
                </small>

                <h2
                  style={{
                    marginTop: "8px",
                    marginBottom: "12px",
                    fontFamily: "Georgia, serif",
                    fontSize: "2rem",
                    fontWeight: 400,
                    color: "#30252a",
                  }}
                >
                  Meus agendamentos
                </h2>

                <p
                  style={{
                    color: "#786a70",
                    lineHeight: 1.7,
                    marginBottom: 0,
                  }}
                >
                  Consulte seus próximos atendimentos, veja os detalhes e
                  cancele um horário quando necessário.
                </p>
              </div>

              <div
                style={{
                  marginTop: "30px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "#8f536b",
                  fontWeight: 600,
                }}
              >
                Ver agendamentos
                <i className="bi bi-arrow-right"></i>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div
        style={{
          marginTop: "32px",
          backgroundColor: "#fff8fa",
          border: "1px solid #ead7df",
          borderRadius: "20px",
          padding: "24px 28px",
          display: "flex",
          alignItems: "center",
          gap: "18px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            minWidth: "50px",
            borderRadius: "50%",
            backgroundColor: "#f1dfe6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#8f536b",
            fontSize: "1.2rem",
          }}
        >
          <i className="bi bi-info-circle"></i>
        </div>

        <div>
          <strong
            style={{
              display: "block",
              color: "#40353a",
              marginBottom: "3px",
            }}
          >
            Precisa alterar um horário?
          </strong>

          <span
            style={{
              color: "#7a6c72",
              fontSize: "0.95rem",
            }}
          >
            Você pode cancelar o agendamento atual e fazer uma nova reserva.
          </span>
        </div>
      </div>
    </div>
  );
}