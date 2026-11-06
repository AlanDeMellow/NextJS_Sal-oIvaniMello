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
};

export default function EditarAgendamentoPage() {
  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const API_AGENDAMENTOS = "http://localhost:3000/api/agendamentos";
  const API_CLIENTES = "http://localhost:3000/api/clientes";
  const API_PROCEDIMENTOS = "http://localhost:3000/api/procedimentos";

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [procedimentos, setProcedimentos] = useState<Procedimento[]>([]);

  const [clienteId, setClienteId] = useState("");
  const [procedimentoId, setProcedimentoId] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [status, setStatus] = useState("AGENDADO");
  const [observacoes, setObservacoes] = useState("");

  const [erro, setErro] = useState("");

  async function carregarDados() {
    try {
      setErro("");

      const [
        responseAgendamento,
        responseClientes,
        responseProcedimentos,
      ] = await Promise.all([
        fetch(`${API_AGENDAMENTOS}/${id}`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }),

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

      if (
        !responseAgendamento.ok ||
        !responseClientes.ok ||
        !responseProcedimentos.ok
      ) {
        throw new Error();
      }

      const agendamento: Agendamento =
        await responseAgendamento.json();

      const dadosClientes =
        await responseClientes.json();

      const dadosProcedimentos =
        await responseProcedimentos.json();

      setClientes(dadosClientes);
      setProcedimentos(dadosProcedimentos);

      setClienteId(String(agendamento.clienteId));
      setProcedimentoId(
        String(agendamento.procedimentoId)
      );

      const dataHora = new Date(agendamento.dataHora);

      const ano = dataHora.getFullYear();

      const mes = String(
        dataHora.getMonth() + 1
      ).padStart(2, "0");

      const dia = String(
        dataHora.getDate()
      ).padStart(2, "0");

      const hora = String(
        dataHora.getHours()
      ).padStart(2, "0");

      const minuto = String(
        dataHora.getMinutes()
      ).padStart(2, "0");

      setData(`${ano}-${mes}-${dia}`);
      setHorario(`${hora}:${minuto}`);

      setStatus(agendamento.status);
      setObservacoes(
        agendamento.observacoes || ""
      );
    } catch {
      setErro(
        "Não foi possível carregar os dados do agendamento."
      );
    }
  }

  async function salvar(event: React.FormEvent) {
    event.preventDefault();

    try {
      setErro("");

      const dataHora = `${data}T${horario}:00`;

      const response = await fetch(
        `${API_AGENDAMENTOS}/${id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },

          body: JSON.stringify({
            clienteId: Number(clienteId),
            procedimentoId: Number(procedimentoId),
            dataHora,
            status,
            observacoes: observacoes || undefined,
          }),
        }
      );

      if (!response.ok) {
        const erroBackend = await response.json();

        console.log(
          "Erro do backend:",
          erroBackend
        );

        throw new Error(
          erroBackend.message ||
            "Não foi possível atualizar o agendamento."
        );
      }

      router.push(`/admin/agenda/${id}`);
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        setErro(error.message);
      } else {
        setErro(
          "Não foi possível atualizar o agendamento."
        );
      }
    }
  }

  useEffect(() => {
    void carregarDados();
  }, [id]);

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
          Editar agendamento
        </h1>

        <p style={{ color: "#7a6c72" }}>
          Altere as informações do atendimento.
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
                onChange={(e) =>
                  setClienteId(e.target.value)
                }
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
                onChange={(e) =>
                  setProcedimentoId(e.target.value)
                }
                required
              >
                <option value="">
                  Selecione um procedimento
                </option>

                {procedimentos.map(
                  (procedimento) => (
                    <option
                      key={procedimento.id}
                      value={procedimento.id}
                    >
                      {procedimento.nome}
                    </option>
                  )
                )}
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
                onChange={(e) =>
                  setData(e.target.value)
                }
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
                onChange={(e) =>
                  setHorario(e.target.value)
                }
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Status
              </label>

              <select
                className="form-select"
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
              >
                <option value="AGENDADO">
                  Agendado
                </option>

                <option value="CONCLUIDO">
                  Concluído
                </option>

                <option value="CANCELADO">
                  Cancelado
                </option>
              </select>
            </div>

            <div className="col-12">
              <label className="form-label">
                Observações
              </label>

              <textarea
                className="form-control"
                rows={4}
                value={observacoes}
                onChange={(e) =>
                  setObservacoes(e.target.value)
                }
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
              Salvar alterações
            </button>

            <button
              type="button"
              className="btn btn-outline-secondary px-4"
              onClick={() =>
                router.push(`/admin/agenda/${id}`)
              }
            >
              Cancelar
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}