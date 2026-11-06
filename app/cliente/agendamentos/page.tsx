"use client";

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
    <div>
      <p
        className="text-uppercase mb-2"
        style={{
          color: "#8f536b",
          fontSize: "0.75rem",
          letterSpacing: "3px",
        }}
      >
        Área do cliente
      </p>

      <h1
        style={{
          fontFamily: "Georgia, serif",
          color: "#30252a",
          fontSize: "3rem",
          fontWeight: 400,
        }}
      >
        Meus agendamentos
      </h1>

      <p
        className="mb-5"
        style={{
          color: "#7a6c72",
        }}
      >
        Confira os horários que você já marcou.
      </p>

      {erro && (
        <div className="alert alert-danger">
          {erro}
        </div>
      )}

      {!erro && agendamentos.length === 0 && (
        <div
          className="p-4 text-center"
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "18px",
            border: "1px solid #ead7df",
          }}
        >
          <i
            className="bi bi-calendar-x"
            style={{
              fontSize: "2.5rem",
              color: "#8f536b",
            }}
          ></i>

          <h4 className="mt-3">
            Nenhum agendamento encontrado
          </h4>

          <p
            className="mb-0"
            style={{
              color: "#7a6c72",
            }}
          >
            Você ainda não possui horários agendados.
          </p>
        </div>
      )}

      <div className="row g-4">
        {agendamentos.map((agendamento) => (
          <div
            className="col-12"
            key={agendamento.id}
          >
            <div
              className="p-4"
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "18px",
                border: "1px solid #ead7df",
              }}
            >
              <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
                <div>
                  <h3
                    style={{
                      fontFamily: "Georgia, serif",
                      color: "#30252a",
                    }}
                  >
                    {agendamento.procedimento.nome}
                  </h3>

                  <p
                    className="mb-2"
                    style={{
                      color: "#7a6c72",
                    }}
                  >
                    <i className="bi bi-calendar me-2"></i>
                    {formatarData(agendamento.dataHora)}
                  </p>

                  <p
                    className="mb-2"
                    style={{
                      color: "#7a6c72",
                    }}
                  >
                    <i className="bi bi-clock me-2"></i>
                    {formatarHorario(agendamento.dataHora)}
                  </p>

                  <p
                    className="mb-2"
                    style={{
                      color: "#7a6c72",
                    }}
                  >
                    <i className="bi bi-hourglass-split me-2"></i>
                    {agendamento.procedimento.duracao} minutos
                  </p>

                  <p
                    className="mb-0"
                    style={{
                      color: "#7a6c72",
                    }}
                  >
                    R$ {Number(agendamento.procedimento.preco).toFixed(2)}
                  </p>
                </div>

                <span
                  className="px-3 py-2"
                  style={{
                    borderRadius: "20px",
                    backgroundColor:
                      agendamento.status === "AGENDADO"
                        ? "#f1dfe6"
                        : agendamento.status === "CONCLUIDO"
                          ? "#e3f3e7"
                          : "#f5dddd",
                    color:
                      agendamento.status === "AGENDADO"
                        ? "#8f536b"
                        : agendamento.status === "CONCLUIDO"
                          ? "#39734b"
                          : "#9d4444",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                  }}
                >
                  {formatarStatus(agendamento.status)}
                </span>
              </div>

              {agendamento.observacoes && (
                <>
                  <hr
                    style={{
                      borderColor: "#ead7df",
                    }}
                  />

                  <p className="mb-0">
                    <strong>Observações:</strong>{" "}
                    {agendamento.observacoes}
                  </p>
                </>
              )}

              {agendamento.status === "AGENDADO" && (
                <>
                  <hr
                    style={{
                      borderColor: "#ead7df",
                    }}
                  />

                  <button
                    type="button"
                    className="btn"
                    onClick={() =>
                      cancelarAgendamento(agendamento.id)
                    }
                    style={{
                      border: "1px solid #b65d67",
                      color: "#b65d67",
                      borderRadius: "10px",
                      padding: "10px 18px",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <i className="bi bi-x-circle me-2"></i>
                    Cancelar agendamento
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}