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

type Produto = {
  id: number;
};

type Agendamento = {
  id: number;
  dataHora: string;
  status: string;

  cliente: Cliente;
  procedimento: Procedimento;
};

export default function AdminPage() {
  const API = "http://localhost:3000/api";

  const [totalClientes, setTotalClientes] = useState(0);
  const [totalProcedimentos, setTotalProcedimentos] = useState(0);
  const [totalProdutos, setTotalProdutos] = useState(0);

  const [agendamentosHoje, setAgendamentosHoje] = useState<Agendamento[]>([]);
  const [proximosAgendamentos, setProximosAgendamentos] = useState<Agendamento[]>([]);

  const [erro, setErro] = useState("");

  async function carregarDashboard() {
    try {
      setErro("");

      const [
        responseClientes,
        responseProcedimentos,
        responseProdutos,
        responseAgendamentos,
      ] = await Promise.all([
        fetch(`${API}/clientes`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }),

        fetch(`${API}/procedimentos`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }),

        fetch(`${API}/produtos`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }),

        fetch(`${API}/agendamentos`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }),
      ]);

      if (
        !responseClientes.ok ||
        !responseProcedimentos.ok ||
        !responseProdutos.ok ||
        !responseAgendamentos.ok
      ) {
        throw new Error();
      }

      const clientes = await responseClientes.json();
      const procedimentos = await responseProcedimentos.json();
      const produtos = await responseProdutos.json();
      const agendamentos: Agendamento[] = await responseAgendamentos.json();

      setTotalClientes(clientes.length);
      setTotalProcedimentos(procedimentos.length);
      setTotalProdutos(produtos.length);

      const agora = new Date();

      const hoje = agendamentos.filter((agendamento) => {
        const dataAgendamento = new Date(agendamento.dataHora);

        return (
          dataAgendamento.getDate() === agora.getDate() &&
          dataAgendamento.getMonth() === agora.getMonth() &&
          dataAgendamento.getFullYear() === agora.getFullYear() &&
          agendamento.status !== "CANCELADO"
        );
      });

      setAgendamentosHoje(hoje);

      const proximos = agendamentos
        .filter((agendamento) => {
          const dataAgendamento = new Date(agendamento.dataHora);

          return (
            dataAgendamento >= agora &&
            agendamento.status !== "CANCELADO"
          );
        })
        .sort(
          (a, b) =>
            new Date(a.dataHora).getTime() -
            new Date(b.dataHora).getTime()
        )
        .slice(0, 5);

      setProximosAgendamentos(proximos);
    } catch {
      setErro("Não foi possível carregar as informações do dashboard.");
    }
  }

  function formatarData(dataHora: string) {
    return new Date(dataHora).toLocaleDateString("pt-BR");
  }

  function formatarHorario(dataHora: string) {
    return new Date(dataHora).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  useEffect(() => {
    void carregarDashboard();
  }, []);

  const cards = [
    {
      titulo: "Agendamentos hoje",
      valor: agendamentosHoje.length,
      icon: "bi-calendar",
    },
    {
      titulo: "Clientes",
      valor: totalClientes,
      icon: "bi-people",
    },
    {
      titulo: "Procedimentos",
      valor: totalProcedimentos,
      icon: "bi-scissors",
    },
    {
      titulo: "Produtos",
      valor: totalProdutos,
      icon: "bi-bag",
    },
  ];

  return (
    <div>
      <div className="mb-5">
        <p
          className="text-uppercase mb-2"
          style={{
            color: "#8f536b",
            fontSize: "0.75rem",
            letterSpacing: "3px",
          }}
        >
          Dashboard
        </p>

        <h1
          style={{
            fontFamily: "Georgia, serif",
            color: "#30252a",
            fontSize: "3rem",
            fontWeight: 400,
          }}
        >
          Dashboard
        </h1>

        <p style={{ color: "#7a6c72" }}>
          Acompanhe as principais informações do seu estúdio.
        </p>
      </div>

      {erro && (
        <div className="alert alert-danger">
          {erro}
        </div>
      )}

      <div className="row g-4 mb-5">
        {cards.map((card) => (
          <div
            className="col-md-6 col-xl-3"
            key={card.titulo}
          >
            <div
              className="h-100 p-4"
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "18px",
                border: "1px solid #ead7df",
              }}
            >
              <div
                className="d-flex align-items-center justify-content-center mb-3"
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: "#f1dfe6",
                  borderRadius: "50%",
                  color: "#8f536b",
                }}
              >
                <i
                  className={`bi ${card.icon}`}
                  style={{
                    fontSize: "1.3rem",
                  }}
                ></i>
              </div>

              <p
                className="mb-2"
                style={{
                  color: "#7a6c72",
                  fontSize: "0.9rem",
                }}
              >
                {card.titulo}
              </p>

              <h2
                className="mb-0"
                style={{
                  fontFamily: "Georgia, serif",
                  color: "#30252a",
                }}
              >
                {card.valor}
              </h2>
            </div>
          </div>
        ))}
      </div>

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
              fontSize: "1.7rem",
            }}
          >
            Próximos agendamentos
          </h2>

          <p
            className="mb-0"
            style={{
              color: "#7a6c72",
            }}
          >
            Confira os próximos atendimentos cadastrados.
          </p>
        </div>

        <div className="table-responsive">
          <table className="table mb-0 align-middle">
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
              </tr>
            </thead>

            <tbody>
              {proximosAgendamentos.map((agendamento) => (
                <tr key={agendamento.id}>
                  <td className="px-4 py-3">
                    {agendamento.cliente.nome}
                  </td>

                  <td>
                    {agendamento.procedimento.nome}
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
                        backgroundColor: "#f1dfe6",
                        color: "#8f536b",
                        padding: "8px 12px",
                      }}
                    >
                      {agendamento.status}
                    </span>
                  </td>
                </tr>
              ))}

              {proximosAgendamentos.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-5"
                    style={{
                      color: "#7a6c72",
                    }}
                  >
                    Nenhum próximo agendamento.
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