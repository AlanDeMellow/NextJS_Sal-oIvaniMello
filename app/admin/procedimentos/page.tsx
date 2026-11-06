"use client";

import { getToken } from "@/app/login/auth_service";
import { useEffect, useState } from "react";

type Procedimento = {
  id: number;
  nome: string;
  descricao?: string;
  preco: number;
  duracao: number;
};

export default function ProcedimentosPage() {
  const API = "http://localhost:3000/api/procedimentos";

  const [id, setId] = useState<number | null>(null);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [duracao, setDuracao] = useState("");

  const [procedimentos, setProcedimentos] = useState<Procedimento[]>([]);
  const [erro, setErro] = useState("");

  async function carregarProcedimentos() {
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
      setProcedimentos(dados);
    } catch {
      setErro("Não foi possível carregar os procedimentos.");
    }
  }

  function editar(procedimento: Procedimento) {
    setId(procedimento.id);
    setNome(procedimento.nome);
    setDescricao(procedimento.descricao || "");
    setPreco(String(procedimento.preco));
    setDuracao(String(procedimento.duracao));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function limparFormulario() {
    setId(null);
    setNome("");
    setDescricao("");
    setPreco("");
    setDuracao("");
  }

  async function salvar(event: React.FormEvent) {
    event.preventDefault();

    try {
      setErro("");

      const response = await fetch(
        id === null ? API : `${API}/${id}`,
        {
          method: id === null ? "POST" : "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({
            nome,
            descricao: descricao || undefined,
            preco: Number(preco),
            duracao: Number(duracao),
          }),
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      limparFormulario();
      await carregarProcedimentos();
    } catch {
      setErro("Não foi possível salvar o procedimento.");
    }
  }

  async function excluir(procedimentoId: number) {
    const confirmar = window.confirm(
      "Deseja realmente excluir este procedimento?"
    );

    if (!confirmar) {
      return;
    }

    try {
      setErro("");

      const response = await fetch(`${API}/${procedimentoId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error();
      }

      await carregarProcedimentos();
    } catch {
      setErro("Não foi possível excluir o procedimento.");
    }
  }

  useEffect(() => {
    void carregarProcedimentos();
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
          Procedimentos
        </p>

        <h1
          style={{
            fontFamily: "Georgia, serif",
            color: "#30252a",
            fontSize: "3rem",
            fontWeight: 400,
          }}
        >
          Procedimentos
        </h1>

        <p style={{ color: "#7a6c72" }}>
          Cadastre e gerencie os procedimentos oferecidos pelo salão.
        </p>
      </div>

      {erro && (
        <div className="alert alert-danger">
          {erro}
        </div>
      )}

      <section
        className="p-4 mb-5"
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "18px",
          border: "1px solid #ead7df",
        }}
      >
        <h2
          className="mb-4"
          style={{
            fontFamily: "Georgia, serif",
            color: "#30252a",
            fontSize: "1.6rem",
          }}
        >
          {id === null
            ? "Novo procedimento"
            : "Editar procedimento"}
        </h2>

        <form onSubmit={salvar}>
          <div className="row g-4">
            <div className="col-md-6">
              <label className="form-label">
                Nome
              </label>

              <input
                type="text"
                className="form-control"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Descrição
              </label>

              <input
                type="text"
                className="form-control"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Preço
              </label>

              <input
                type="number"
                step="0.01"
                className="form-control"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Duração em minutos
              </label>

              <input
                type="number"
                className="form-control"
                value={duracao}
                onChange={(e) => setDuracao(e.target.value)}
                required
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
              {id === null
                ? "Cadastrar procedimento"
                : "Salvar alterações"}
            </button>

            {id !== null && (
              <button
                type="button"
                className="btn btn-outline-secondary px-4"
                onClick={limparFormulario}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </section>

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
            className="mb-0"
            style={{
              fontFamily: "Georgia, serif",
              color: "#30252a",
              fontSize: "1.6rem",
            }}
          >
            Procedimentos cadastrados
          </h2>
        </div>

        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th className="px-4 py-3">Nome</th>
                <th className="py-3">Preço</th>
                <th className="py-3">Duração</th>
                <th className="py-3 text-end px-4">Ações</th>
              </tr>
            </thead>

            <tbody>
              {procedimentos.map((procedimento) => (
                <tr key={procedimento.id}>
                  <td className="px-4 py-3">
                    {procedimento.nome}
                  </td>

                  <td>
                    R$ {Number(procedimento.preco).toFixed(2)}
                  </td>

                  <td>
                    {procedimento.duracao} min
                  </td>

                  <td className="text-end px-4">
                    <button
                      type="button"
                      className="btn btn-sm me-2"
                      style={{
                        color: "#8f536b",
                        border: "1px solid #d9bfc9",
                      }}
                      onClick={() => editar(procedimento)}
                    >
                      <i className="bi bi-pencil me-1"></i>
                      Editar
                    </button>

                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => excluir(procedimento.id)}
                    >
                      <i className="bi bi-trash me-1"></i>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}

              {procedimentos.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-5"
                    style={{ color: "#7a6c72" }}
                  >
                    Nenhum procedimento cadastrado.
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