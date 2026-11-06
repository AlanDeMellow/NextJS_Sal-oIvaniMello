"use client";

import { getToken } from "@/app/login/auth_service";
import { useEffect, useState } from "react";

type Cliente = {
  id: number;
  nome: string;
};

type Procedimento = {
  id: number;
  nome: string;
};

type Agendamento = {
  id: number;
  dataHora: string;
  status: string;
  observacoes?: string;
  clienteId: number;
  procedimentoId: number;
  cliente?: Cliente;
  procedimento?: Procedimento;
};

export default function AgendaPage() {
  const API = "http://localhost:3000/api/agendamentos";

  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [erro, setErro] = useState("");

  async function carregarAgendamentos() {
    try {
      setErro("");

      const response = await fetch(API, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error();
      }

      const dados = await response.json();

      setAgendamentos(dados);
    } catch {
      setErro("Não foi possível carregar os agendamentos.");
    }
  }

  function formatarData(dataHora: string) {
    const data = new Date(dataHora);

    return data.toLocaleDateString("pt-BR");
  }

  function formatarHorario(dataHora: string) {
    const data = new Date(dataHora);

    return data.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  useEffect(() => {
    void carregarAgendamentos();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <p
            className="text-uppercase mb-2"
            style={{
              color: "#8f536b",
              fontSize: "0.75rem",
              letterSpacing: "3px",
            }}
          >
            Agenda
          </p>

          <h1
            style={{
              fontFamily: "Georgia, serif",
              color: "#30252a",
              fontSize: "3rem",
              fontWeight: 400,
            }}
          >
            Agenda
          </h1>

          <p style={{ color: "#7a6c72" }}>
            Visualize e gerencie os agendamentos do salão.
          </p>
        </div>

        <a
          href="/admin/agenda/novo"
          className="btn px-4 py-2"
          style={{
            backgroundColor: "#8f536b",
            color: "#ffffff",
            borderRadius: "10px",
          }}
        >
          <i className="bi bi-plus-lg me-2"></i>
          Novo agendamento
        </a>
      </div>

      {erro && (
        <div className="alert alert-danger">
          {erro}
        </div>
      )}

      <section
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "18px",
          border: "1px solid #ead7df",
          overflow: "hidden",
        }}
      >
        <div className="p-4 border-bottom">
          <h2
            className="mb-1"
            style={{
              fontFamily: "Georgia, serif",
              color: "#30252a",
              fontSize: "1.6rem",
            }}
          >
            Agendamentos
          </h2>

          <p
            className="mb-0"
            style={{
              color: "#7a6c72",
            }}
          >
            Confira os horários cadastrados.
          </p>
        </div>

        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th className="px-4 py-3">
                  Cliente
                </th>

                <th className="py-3">
                  Procedimento
                </th>

                <th className="py-3">
                  Data
                </th>

                <th className="py-3">
                  Horário
                </th>

                <th className="py-3">
                  Status
                </th>

                <th className="py-3 text-end px-4">
                  Ações
                </th>
              </tr>
            </thead>

            <tbody>
              {agendamentos.map((agendamento) => (
                <tr key={agendamento.id}>
                  <td className="px-4 py-3">
                    {agendamento.cliente?.nome ||
                      `Cliente ${agendamento.clienteId}`}
                  </td>

                  <td>
                    {agendamento.procedimento?.nome ||
                      `Procedimento ${agendamento.procedimentoId}`}
                  </td>

                  <td>
                    {formatarData(agendamento.dataHora)}
                  </td>

                  <td>
                    {formatarHorario(agendamento.dataHora)}
                  </td>

                  <td>
                    <span
                      className="badge"
                      style={{
                        backgroundColor:
                          agendamento.status === "AGENDADO"
                            ? "#f1dfe6"
                            : "#eeeeee",
                        color: "#8f536b",
                        padding: "8px 12px",
                      }}
                    >
                      {agendamento.status}
                    </span>
                  </td>

                  <td className="text-end px-4">
                    <a
                      href={`/admin/agenda/${agendamento.id}`}
                      className="btn btn-sm"
                      style={{
                        color: "#8f536b",
                        border: "1px solid #d9bfc9",
                      }}
                    >
                      <i className="bi bi-eye me-1"></i>
                      Detalhes
                    </a>
                  </td>
                </tr>
              ))}

              {agendamentos.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-5"
                    style={{
                      color: "#7a6c72",
                    }}
                  >
                    Nenhum agendamento cadastrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}