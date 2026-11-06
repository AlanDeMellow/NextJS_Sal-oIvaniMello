"use client";

import { getToken } from "@/app/login/auth_service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Cliente = {
  id: number;
  nome: string;
};

type Procedimento = {
  id: number;
  nome: string;
};

export default function NovoAgendamentoPage() {
  const router = useRouter();

  const API_CLIENTES = "http://localhost:3000/api/clientes";
  const API_PROCEDIMENTOS = "http://localhost:3000/api/procedimentos";
  const API_AGENDAMENTOS = "http://localhost:3000/api/agendamentos";

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [procedimentos, setProcedimentos] = useState<Procedimento[]>([]);

  const [clienteId, setClienteId] = useState("");
  const [procedimentoId, setProcedimentoId] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const [erro, setErro] = useState("");

  async function carregarDados() {
    try {
      const [responseClientes, responseProcedimentos] = await Promise.all([
        fetch(API_CLIENTES, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }),

        fetch(API_PROCEDIMENTOS, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }),
      ]);

      if (!responseClientes.ok || !responseProcedimentos.ok) {
        throw new Error();
      }

      const dadosClientes = await responseClientes.json();
      const dadosProcedimentos = await responseProcedimentos.json();

      setClientes(dadosClientes);
      setProcedimentos(dadosProcedimentos);
    } catch {
      setErro("Não foi possível carregar clientes e procedimentos.");
    }
  }

  async function salvar(event: React.FormEvent) {
    event.preventDefault();

    try {
      setErro("");

      const dataHora = `${data}T${horario}:00`;

      const response = await fetch(API_AGENDAMENTOS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          dataHora,
          clienteId: Number(clienteId),
          procedimentoId: Number(procedimentoId),
          observacoes: observacoes || undefined,
        }),
      });

      if (!response.ok) {
        const erroBackend = await response.json();

        console.log("Erro do backend:", erroBackend);

        throw new Error(
          erroBackend.message || "Não foi possível salvar o agendamento."
        );
      }

      router.push("/admin/agenda");
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        setErro(error.message);
      } else {
        setErro("Não foi possível salvar o agendamento.");
      }
    }
  }

  useEffect(() => {
    void carregarDados();
  }, []);

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
          Novo agendamento
        </h1>

        <p style={{ color: "#7a6c72" }}>
          Cadastre um novo horário para um cliente.
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
          backgroundColor: "#ffffff",
          borderRadius: "18px",
          border: "1px solid #ead7df",
          maxWidth: "900px",
        }}
      >
        <form onSubmit={salvar}>
          <div className="row g-4">
            <div className="col-md-6">
              <label className="form-label">
                Cliente
              </label>

              <select
                className="form-select"
                value={clienteId}
                onChange={(e) => setClienteId(e.target.value)}
                required
              >
                <option value="">
                  Selecione um cliente
                </option>

                {clientes.map((cliente) => (
                  <option
                    key={cliente.id}
                    value={cliente.id}
                  >
                    {cliente.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
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
                placeholder="Observações sobre o atendimento..."
              />
            </div>
          </div>

          <div className="d-flex gap-3 mt-4">
            <button
              type="submit"
              className="btn px-4"
              style={{
                backgroundColor: "#8f536b",
                color: "#ffffff",
                borderRadius: "10px",
              }}
            >
              Salvar agendamento
            </button>

            <button
              type="button"
              className="btn btn-outline-secondary px-4"
              onClick={() => router.push("/admin/agenda")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}