"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getToken } from "../../login/auth_service";

type Procedimento = {
  id: number;
  nome: string;
  descricao?: string;
  preco: number;
  duracao: number;
};

type Agendamento = {
  id: number;
  dataHora: string;
  status: string;
  observacoes?: string;
  procedimento: Procedimento;
};

export default function MeusAgendamentosPage() {
  const API = "http://localhost:3000/api";

  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  async function carregarAgendamentos() {
    try {
      setErro("");

      const response = await fetch(`${API}/agendamentos/me`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error("Não foi possível carregar os agendamentos.");
      }

      const dados = await response.json();

      setAgendamentos(dados);
    } catch (error) {
      if (error instanceof Error) {
        setErro(error.message);
      } else {
        setErro("Erro ao carregar os agendamentos.");
      }
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    void carregarAgendamentos();
  }, []);

  function formatarData(dataHora: string) {
    return new Date(dataHora).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  function formatarHorario(dataHora: string) {
    return new Date(dataHora).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function formatarStatus(status: string) {
    if (status === "AGENDADO") {
      return "Agendado";
    }

    if (status === "CONCLUIDO") {
      return "Concluído";
    }

    if (status === "CANCELADO") {
      return "Cancelado";
    }

    return status;
  }

  async function cancelarAgendamento(id: number) {
    const confirmar = window.confirm(
      "Tem certeza que deseja cancelar este agendamento?"
    );

    if (!confirmar) {
      return;
    }

    try {
      setErro("");

      const response = await fetch(
        `${API}/agendamentos/me/${id}/cancelar`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Não foi possível cancelar o agendamento.");
      }

      await carregarAgendamentos();
    } catch (error) {
      if (error instanceof Error) {
        setErro(error.message);
      } else {
        setErro("Erro ao cancelar o agendamento.");
      }
    }
  }

  if (carregando) {
    return <p>Carregando agendamentos...</p>;
  }

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      <div className="mb-5">
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
          Meus agendamentos
        </h1>

        <p
          style={{
            marginTop: "10px",
            marginBottom: 0,
            color: "#7a6c72",
            fontSize: "1rem",
          }}
        >
          Acompanhe seus horários e consulte os detalhes dos seus atendimentos.
        </p>
      </div>

      {erro && (
        <div
          className="alert"
          style={{
            backgroundColor: "#fff0f0",
            color: "#9b3a3a",
            border: "1px solid #f2caca",
            borderRadius: "14px",
            padding: "14px 18px",
          }}
        >
          <i className="bi bi-exclamation-circle me-2"></i>
          {erro}
        </div>
      )}

      {carregando ? (
        <div
          style={{
            minHeight: "300px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#8f536b",
          }}
        >
          <div className="spinner-border mb-3"></div>

          <span style={{ color: "#7a6c72" }}>
            Carregando seus agendamentos...
          </span>
        </div>
      ) : agendamentos.length === 0 ? (
        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #ead7df",
            borderRadius: "24px",
            padding: "60px 30px",
            textAlign: "center",
            boxShadow: "0 12px 35px rgba(83, 54, 67, 0.05)",
          }}
        >
          <div
            style={{
              width: "72px",
              height: "72px",
              margin: "0 auto 20px",
              borderRadius: "50%",
              backgroundColor: "#f7e9ef",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#8f536b",
              fontSize: "1.8rem",
            }}
          >
            <i className="bi bi-calendar2"></i>
          </div>

          <h2
            style={{
              fontFamily: "Georgia, serif",
              fontWeight: 400,
              color: "#30252a",
              marginBottom: "10px",
            }}
          >
            Nenhum agendamento encontrado
          </h2>

          <p
            style={{
              color: "#7a6c72",
              marginBottom: "25px",
            }}
          >
            Você ainda não possui horários agendados.
          </p>

          <Link
            href="/cliente/agendar"
            className="btn"
            style={{
              backgroundColor: "#8f536b",
              color: "#ffffff",
              borderRadius: "12px",
              padding: "12px 24px",
              textDecoration: "none",
              border: "none",
            }}
          >
            <i className="bi bi-calendar-plus me-2"></i>
            Fazer agendamento
          </Link>
        </div>
      ) : (
        <div className="d-flex flex-column gap-4">
          {agendamentos.map((agendamento) => {
            const dataAgendamento = new Date(agendamento.dataHora);

            const dataFormatada =
              dataAgendamento.toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              });

            const horarioFormatado =
              dataAgendamento.toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              });

            const cancelado = agendamento.status === "CANCELADO";

            return (
              <div
                key={agendamento.id}
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #ead7df",
                  borderRadius: "22px",
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(83, 54, 67, 0.05)",
                }}
              >
                <div
                  style={{
                    padding: "24px 28px",
                    backgroundColor: "#fffafb",
                    borderBottom: "1px solid #f0e2e8",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "20px",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <small
                      style={{
                        color: "#8f536b",
                        letterSpacing: "1.5px",
                        fontWeight: 600,
                      }}
                    >
                      PROCEDIMENTO
                    </small>

                    <h2
                      style={{
                        fontFamily: "Georgia, serif",
                        fontSize: "1.6rem",
                        fontWeight: 400,
                        color: "#30252a",
                        margin: "4px 0 0",
                      }}
                    >
                      {agendamento.procedimento.nome}
                    </h2>
                  </div>

                  <span
                    style={{
                      padding: "8px 14px",
                      borderRadius: "999px",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "1px",
                      backgroundColor: cancelado
                        ? "#f7e6e6"
                        : "#e9f4ec",
                      color: cancelado
                        ? "#a34f4f"
                        : "#4f7d5d",
                    }}
                  >
                    {agendamento.status}
                  </span>
                </div>

                <div style={{ padding: "28px" }}>
                  <div className="row g-4">
                    <div className="col-md-3 col-sm-6">
                      <div
                        style={{
                          display: "flex",
                          gap: "12px",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            width: "42px",
                            height: "42px",
                            minWidth: "42px",
                            borderRadius: "12px",
                            backgroundColor: "#f7e9ef",
                            color: "#8f536b",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <i className="bi bi-calendar3"></i>
                        </div>

                        <div>
                          <small style={{ color: "#8a7c82" }}>
                            Data
                          </small>

                          <div
                            style={{
                              color: "#40353a",
                              fontWeight: 500,
                            }}
                          >
                            {dataFormatada}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-3 col-sm-6">
                      <div
                        style={{
                          display: "flex",
                          gap: "12px",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            width: "42px",
                            height: "42px",
                            minWidth: "42px",
                            borderRadius: "12px",
                            backgroundColor: "#f7e9ef",
                            color: "#8f536b",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <i className="bi bi-clock"></i>
                        </div>

                        <div>
                          <small style={{ color: "#8a7c82" }}>
                            Horário
                          </small>

                          <div
                            style={{
                              color: "#40353a",
                              fontWeight: 500,
                            }}
                          >
                            {horarioFormatado}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-3 col-sm-6">
                      <div
                        style={{
                          display: "flex",
                          gap: "12px",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            width: "42px",
                            height: "42px",
                            minWidth: "42px",
                            borderRadius: "12px",
                            backgroundColor: "#f7e9ef",
                            color: "#8f536b",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <i className="bi bi-hourglass-split"></i>
                        </div>

                        <div>
                          <small style={{ color: "#8a7c82" }}>
                            Duração
                          </small>

                          <div
                            style={{
                              color: "#40353a",
                              fontWeight: 500,
                            }}
                          >
                            {agendamento.procedimento.duracao} min
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-3 col-sm-6">
                      <div
                        style={{
                          display: "flex",
                          gap: "12px",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            width: "42px",
                            height: "42px",
                            minWidth: "42px",
                            borderRadius: "12px",
                            backgroundColor: "#f7e9ef",
                            color: "#8f536b",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <i className="bi bi-cash"></i>
                        </div>

                        <div>
                          <small style={{ color: "#8a7c82" }}>
                            Valor
                          </small>

                          <div
                            style={{
                              color: "#40353a",
                              fontWeight: 600,
                            }}
                          >
                            R${" "}
                            {Number(
                              agendamento.procedimento.preco
                            ).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {agendamento.observacoes && (
                    <div
                      style={{
                        marginTop: "25px",
                        padding: "18px 20px",
                        borderRadius: "14px",
                        backgroundColor: "#faf6f8",
                        border: "1px solid #f0e2e8",
                      }}
                    >
                      <small
                        style={{
                          display: "block",
                          color: "#8f536b",
                          fontWeight: 600,
                          marginBottom: "5px",
                        }}
                      >
                        <i className="bi bi-chat-left-text me-2"></i>
                        Observações
                      </small>

                      <span style={{ color: "#66585e" }}>
                        {agendamento.observacoes}
                      </span>
                    </div>
                  )}

                  {!cancelado && (
                    <div
                      style={{
                        marginTop: "25px",
                        paddingTop: "22px",
                        borderTop: "1px solid #f0e2e8",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          cancelarAgendamento(agendamento.id)
                        }
                        className="btn"
                        style={{
                          border: "1px solid #d8aebd",
                          color: "#8f536b",
                          backgroundColor: "#ffffff",
                          borderRadius: "12px",
                          padding: "10px 18px",
                          fontWeight: 500,
                        }}
                      >
                        <i className="bi bi-x-circle me-2"></i>
                        Cancelar agendamento
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}