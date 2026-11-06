"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getToken } from "../../login/auth_service";

type Cliente = {
  id: number;
  nome: string;
  telefone: string;
  email?: string;
};

type Procedimento = {
  id: number;
  nome: string;
  preco: number;
  duracao: number;
};

export default function AgendarPage() {
  const API = "http://localhost:3000/api";

  const [cliente, setCliente] = useState<Cliente | null>(null);

  const [procedimentoId, setProcedimentoId] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const [procedimentos, setProcedimentos] = useState<Procedimento[]>([]);

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function carregarDados() {
    try {
      setErro("");

      const [responseCliente, responseProcedimentos] = await Promise.all([
        fetch(`${API}/clientes/me`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }),

        fetch(`${API}/procedimentos`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }),
      ]);

      if (!responseCliente.ok || !responseProcedimentos.ok) {
        throw new Error();
      }

      const dadosCliente = await responseCliente.json();
      const dadosProcedimentos = await responseProcedimentos.json();

      setCliente(dadosCliente);
      setProcedimentos(dadosProcedimentos);
    } catch {
      setErro("Não foi possível carregar os dados para o agendamento.");
    }
  }

  async function enviarAgendamento(event: React.FormEvent) {
    event.preventDefault();

    if (!cliente) {
      setErro("Cliente não identificado.");
      return;
    }

    setErro("");
    setSucesso("");
    setCarregando(true);

    try {
      const dataHora = `${data}T${horario}:00`;

      const response = await fetch(`${API}/agendamentos`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },

        body: JSON.stringify({
          clienteId: cliente.id,
          procedimentoId: Number(procedimentoId),
          dataHora,
          observacoes: observacoes || undefined,
        }),
      });

      if (!response.ok) {
        const erroBackend = await response.json();

        console.log("Erro do backend:", erroBackend);

        throw new Error(
          erroBackend.message || "Não foi possível criar o agendamento."
        );
      }

      setSucesso("Agendamento realizado com sucesso!");

      setProcedimentoId("");
      setData("");
      setHorario("");
      setObservacoes("");
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        setErro(error.message);
      } else {
        setErro("Não foi possível realizar o agendamento.");
      }
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    void carregarDados();
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8eef2",
        padding: "40px 20px",
      }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: "850px",
        }}
      >
        <div className="text-center mb-5">
          <Link
            href="/"
            style={{
              color: "#8f536b",
              textDecoration: "none",
            }}
          >
            ← Voltar para o início
          </Link>

          <h1
            className="mt-4"
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "3rem",
              color: "#30252a",
              fontWeight: 400,
            }}
          >
            Agendar horário
          </h1>

          <p style={{ color: "#7a6c72" }}>
            Escolha o procedimento, a data e o horário desejado.
          </p>
        </div>

        {erro && (
          <div className="alert alert-danger">
            {erro}
          </div>
        )}

        {sucesso && (
          <div className="alert alert-success">
            {sucesso}
          </div>
        )}

        {cliente && (
          <div
            className="mb-4 p-3"
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "14px",
              border: "1px solid #ead7df",
            }}
          >
            <p
              className="mb-1"
              style={{
                color: "#7a6c72",
                fontSize: "0.85rem",
              }}
            >
              Agendamento para
            </p>

            <strong style={{ color: "#30252a" }}>
              {cliente.nome}
            </strong>
          </div>
        )}

        <section
          className="p-4 p-md-5"
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "22px",
            border: "1px solid #ead7df",
          }}
        >
          <form onSubmit={enviarAgendamento}>
            <div className="row g-4">
              <div className="col-12">
                <label className="form-label">
                  Procedimento
                </label>

                <select
                  className="form-select"
                  value={procedimentoId}
                  onChange={(e) => setProcedimentoId(e.target.value)}
                  required
                >
                  <option value="">
                    Selecione um procedimento
                  </option>

                  {procedimentos.map((procedimento) => (
                    <option
                      key={procedimento.id}
                      value={procedimento.id}
                    >
                      {procedimento.nome}
                      {" - "}
                      R$ {Number(procedimento.preco).toFixed(2)}
                      {" - "}
                      {procedimento.duracao} min
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Data
                </label>

                <input
                  type="date"
                  className="form-control"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Horário
                </label>

                <input
                  type="time"
                  className="form-control"
                  value={horario}
                  onChange={(e) => setHorario(e.target.value)}
                  required
                />
              </div>

              <div className="col-12">
                <label className="form-label">
                  Observações
                </label>

                <textarea
                  className="form-control"
                  rows={4}
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  placeholder="Alguma observação sobre o atendimento?"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={carregando || !cliente}
              className="btn w-100 mt-5 py-3"
              style={{
                backgroundColor: "#8f536b",
                color: "#ffffff",
                borderRadius: "12px",
              }}
            >
              {carregando
                ? "Agendando..."
                : "Confirmar agendamento"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}