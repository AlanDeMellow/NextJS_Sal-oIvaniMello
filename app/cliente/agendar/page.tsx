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
    <div
      style={{
        maxWidth: "1050px",
        margin: "0 auto",
      }}
    >
      <div
        className="mb-5"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div>
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
            Novo agendamento
          </h1>

          <p
            style={{
              marginTop: "10px",
              marginBottom: 0,
              color: "#7a6c72",
              fontSize: "1rem",
            }}
          >
            Escolha o procedimento, a data e o melhor horário para o seu
            atendimento.
          </p>
        </div>
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

      {sucesso && (
        <div
          className="alert"
          style={{
            backgroundColor: "#eef8f1",
            color: "#39744c",
            border: "1px solid #cde7d5",
            borderRadius: "14px",
            padding: "14px 18px",
          }}
        >
          <i className="bi bi-check-circle me-2"></i>
          {sucesso}
        </div>
      )}

      {cliente && (
        <div
          className="mb-4"
          style={{
            background:
              "linear-gradient(135deg, #fff8fa 0%, #f7e9ef 100%)",
            border: "1px solid #ead7df",
            borderRadius: "20px",
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              minWidth: "52px",
              borderRadius: "50%",
              backgroundColor: "#ffffff",
              border: "1px solid #e5cbd5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#8f536b",
              fontSize: "1.3rem",
            }}
          >
            <i className="bi bi-person"></i>
          </div>

          <div>
            <small
              style={{
                display: "block",
                marginBottom: "3px",
                color: "#8f536b",
                fontWeight: 600,
                letterSpacing: "1.5px",
                fontSize: "0.7rem",
              }}
            >
              AGENDAMENTO PARA
            </small>

            <strong
              style={{
                display: "block",
                fontFamily: "Georgia, serif",
                fontSize: "1.35rem",
                fontWeight: 400,
                color: "#30252a",
              }}
            >
              {cliente.nome}
            </strong>
          </div>
        </div>
      )}

      <div
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #ead7df",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 12px 35px rgba(83, 54, 67, 0.06)",
        }}
      >
        <div
          style={{
            padding: "24px 30px",
            borderBottom: "1px solid #f0e2e8",
            backgroundColor: "#fffafb",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontFamily: "Georgia, serif",
              fontSize: "1.5rem",
              fontWeight: 400,
              color: "#30252a",
            }}
          >
            Dados do agendamento
          </h2>

          <small style={{ color: "#8a7c82" }}>
            Preencha as informações abaixo para reservar seu horário.
          </small>
        </div>

        <div style={{ padding: "32px 30px" }}>
          <form onSubmit={enviarAgendamento}>
            <div className="row g-4">
              <div className="col-12">
                <label
                  className="form-label"
                  style={{
                    fontWeight: 600,
                    color: "#4d4046",
                    marginBottom: "8px",
                  }}
                >
                  <i
                    className="bi bi-scissors me-2"
                    style={{ color: "#8f536b" }}
                  ></i>
                  Procedimento
                </label>

                <select
                  className="form-select"
                  value={procedimentoId}
                  onChange={(e) => setProcedimentoId(e.target.value)}
                  required
                  style={{
                    minHeight: "54px",
                    borderRadius: "12px",
                    borderColor: "#e5d2da",
                    boxShadow: "none",
                    color: "#4d4046",
                  }}
                >
                  <option value="">Selecione um procedimento</option>

                  {procedimentos.map((procedimento) => (
                    <option
                      key={procedimento.id}
                      value={procedimento.id}
                    >
                      {procedimento.nome} — R${" "}
                      {Number(procedimento.preco).toFixed(2)} —{" "}
                      {procedimento.duracao} min
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label
                  className="form-label"
                  style={{
                    fontWeight: 600,
                    color: "#4d4046",
                    marginBottom: "8px",
                  }}
                >
                  <i
                    className="bi bi-calendar3 me-2"
                    style={{ color: "#8f536b" }}
                  ></i>
                  Data
                </label>

                <input
                  type="date"
                  className="form-control"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  required
                  style={{
                    minHeight: "54px",
                    borderRadius: "12px",
                    borderColor: "#e5d2da",
                    boxShadow: "none",
                  }}
                />
              </div>

              <div className="col-md-6">
                <label
                  className="form-label"
                  style={{
                    fontWeight: 600,
                    color: "#4d4046",
                    marginBottom: "8px",
                  }}
                >
                  <i
                    className="bi bi-clock me-2"
                    style={{ color: "#8f536b" }}
                  ></i>
                  Horário
                </label>

                <input
                  type="time"
                  className="form-control"
                  value={horario}
                  onChange={(e) => setHorario(e.target.value)}
                  required
                  style={{
                    minHeight: "54px",
                    borderRadius: "12px",
                    borderColor: "#e5d2da",
                    boxShadow: "none",
                  }}
                />
              </div>

              <div className="col-12">
                <label
                  className="form-label"
                  style={{
                    fontWeight: 600,
                    color: "#4d4046",
                    marginBottom: "8px",
                  }}
                >
                  <i
                    className="bi bi-chat-left-text me-2"
                    style={{ color: "#8f536b" }}
                  ></i>
                  Observações
                </label>

                <textarea
                  className="form-control"
                  rows={4}
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  placeholder="Ex.: preferência de horário, alguma observação sobre o atendimento..."
                  style={{
                    borderRadius: "12px",
                    borderColor: "#e5d2da",
                    boxShadow: "none",
                    resize: "none",
                    padding: "14px",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                marginTop: "30px",
                paddingTop: "25px",
                borderTop: "1px solid #f0e2e8",
              }}
            >
              <button
                type="submit"
                disabled={carregando || !cliente}
                className="btn w-100"
                style={{
                  minHeight: "56px",
                  borderRadius: "14px",
                  backgroundColor: "#8f536b",
                  color: "#ffffff",
                  border: "none",
                  fontWeight: 600,
                  fontSize: "1rem",
                  letterSpacing: "0.3px",
                  boxShadow: "0 8px 18px rgba(143, 83, 107, 0.18)",
                }}
              >
                {carregando ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      aria-hidden="true"
                    ></span>
                    Agendando...
                  </>
                ) : (
                  <>
                    <i className="bi bi-calendar-check me-2"></i>
                    Confirmar agendamento
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}