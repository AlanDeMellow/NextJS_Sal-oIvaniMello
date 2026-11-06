"use client";

import { getToken } from "@/app/login/auth_service";
import { useParams, useRouter } from "next/navigation";
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

export default function DetalhesAgendamentoPage() {
  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const API = "http://localhost:3000/api/agendamentos";

  const [agendamento, setAgendamento] =
    useState<Agendamento | null>(null);

  const [erro, setErro] = useState("");

  async function carregarAgendamento() {
    try {
      setErro("");

      const response = await fetch(`${API}/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error();
      }

      const dados = await response.json();

      setAgendamento(dados);
    } catch {
      setErro("Não foi possível carregar o agendamento.");
    }
  }

  async function excluir() {
    const confirmar = window.confirm(
      "Deseja realmente excluir este agendamento?"
    );

    if (!confirmar) {
      return;
    }

    try {
      setErro("");

      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error();
      }

      router.push("/admin/agenda");
    } catch {
      setErro("Não foi possível excluir o agendamento.");
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
    void carregarAgendamento();
  }, [id]);

  if (!agendamento) {
    return (
      <div>
        {erro ? (
          <div className="alert alert-danger">
            {erro}
          </div>
        ) : (
          <p>Carregando agendamento...</p>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
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
          Detalhes do agendamento
        </h1>

        <p style={{ color: "#7a6c72" }}>
          Confira as informações do atendimento.
        </p>
      </div>

      {erro && (
        <div className="alert alert-danger">
          {erro}
        </div>
      )}

      <section
        className="p-4"
        style={{
          maxWidth: "900px",
          backgroundColor: "#ffffff",
          borderRadius: "18px",
          border: "1px solid #ead7df",
        }}
      >
        <div className="row g-4">
          <div className="col-md-6">
            <p
              className="mb-1"
              style={{ color: "#7a6c72" }}
            >
              Cliente
            </p>

            <strong>
              {agendamento.cliente?.nome ||
                `Cliente ${agendamento.clienteId}`}
            </strong>
          </div>

          <div className="col-md-6">
            <p
              className="mb-1"
              style={{ color: "#7a6c72" }}
            >
              Procedimento
            </p>

            <strong>
              {agendamento.procedimento?.nome ||
                `Procedimento ${agendamento.procedimentoId}`}
            </strong>
          </div>

          <div className="col-md-6">
            <p
              className="mb-1"
              style={{ color: "#7a6c72" }}
            >
              Data
            </p>

            <strong>
              {formatarData(agendamento.dataHora)}
            </strong>
          </div>

          <div className="col-md-6">
            <p
              className="mb-1"
              style={{ color: "#7a6c72" }}
            >
              Horário
            </p>

            <strong>
              {formatarHorario(agendamento.dataHora)}
            </strong>
          </div>

          <div className="col-md-6">
            <p
              className="mb-1"
              style={{ color: "#7a6c72" }}
            >
              Status
            </p>

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
          </div>

          <div className="col-12">
            <p
              className="mb-1"
              style={{ color: "#7a6c72" }}
            >
              Observações
            </p>

            <p className="mb-0">
              {agendamento.observacoes || "Nenhuma observação."}
            </p>
          </div>
        </div>

        <hr
          className="my-4"
          style={{ borderColor: "#ead7df" }}
        />

        <div className="d-flex gap-3 flex-wrap">
          <button
            type="button"
            className="btn px-4"
            style={{
              backgroundColor: "#8f536b",
              color: "#ffffff",
            }}
            onClick={() =>
              router.push(`/admin/agenda/${id}/editar`)
            }
          >
            <i className="bi bi-pencil me-2"></i>
            Editar
          </button>

          <button
            type="button"
            className="btn btn-outline-danger px-4"
            onClick={excluir}
          >
            <i className="bi bi-trash me-2"></i>
            Excluir
          </button>

          <button
            type="button"
            className="btn btn-outline-secondary px-4"
            onClick={() => router.push("/admin/agenda")}
          >
            Voltar
          </button>
        </div>
      </section>
    </div>
  );
}