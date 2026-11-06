"use client";

import { getToken } from "@/app/login/auth_service";
import { useEffect, useState } from "react";

type Cliente = {
  id: number;
  nome: string;
  telefone: string;
  email?: string;
  observacoes?: string;
};

export default function ClientesPage() {
  const API = "http://localhost:3000/api/clientes";

  const [id, setId] = useState<number | null>(null);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [erro, setErro] = useState("");

  async function carregarClientes() {
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

      setClientes(dados);
    } catch {
      setErro("Não foi possível carregar os clientes.");
    }
  }

  function editar(cliente: Cliente) {
    setId(cliente.id);
    setNome(cliente.nome);
    setTelefone(cliente.telefone);
    setEmail(cliente.email || "");
    setObservacoes(cliente.observacoes || "");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function limparFormulario() {
    setId(null);
    setNome("");
    setTelefone("");
    setEmail("");
    setObservacoes("");
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
            telefone,
            email: email || undefined,
            observacoes: observacoes || undefined,
          }),
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      limparFormulario();

      await carregarClientes();
    } catch {
      setErro("Não foi possível salvar o cliente.");
    }
  }

  async function excluir(clienteId: number) {
    const confirmar = window.confirm(
      "Deseja realmente excluir este cliente?"
    );

    if (!confirmar) {
      return;
    }

    try {
      setErro("");

      const response = await fetch(`${API}/${clienteId}`, {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error();
      }

      await carregarClientes();
    } catch {
      setErro("Não foi possível excluir o cliente.");
    }
  }

  useEffect(() => {
    void carregarClientes();
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
          Clientes
        </p>

        <h1
          style={{
            fontFamily: "Georgia, serif",
            color: "#30252a",
            fontSize: "3rem",
            fontWeight: 400,
          }}
        >
          Clientes
        </h1>

        <p style={{ color: "#7a6c72" }}>
          Cadastre e gerencie os clientes do salão.
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
            ? "Novo cliente"
            : "Editar cliente"}
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
                onChange={(e) =>
                  setNome(e.target.value)
                }
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Telefone
              </label>

              <input
                type="text"
                className="form-control"
                value={telefone}
                onChange={(e) =>
                  setTelefone(e.target.value)
                }
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                E-mail
              </label>

              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Observações
              </label>

              <input
                type="text"
                className="form-control"
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
              {id === null
                ? "Cadastrar cliente"
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
            Clientes cadastrados
          </h2>
        </div>

        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th className="px-4 py-3">
                  Nome
                </th>

                <th className="py-3">
                  Telefone
                </th>

                <th className="py-3">
                  E-mail
                </th>

                <th className="py-3 text-end px-4">
                  Ações
                </th>
              </tr>
            </thead>

            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td className="px-4 py-3">
                    {cliente.nome}
                  </td>

                  <td>
                    {cliente.telefone}
                  </td>

                  <td>
                    {cliente.email || "-"}
                  </td>

                  <td className="text-end px-4">
                    <button
                      type="button"
                      className="btn btn-sm me-2"
                      style={{
                        color: "#8f536b",
                        border: "1px solid #d9bfc9",
                      }}
                      onClick={() =>
                        editar(cliente)
                      }
                    >
                      <i className="bi bi-pencil me-1"></i>
                      Editar
                    </button>

                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() =>
                        excluir(cliente.id)
                      }
                    >
                      <i className="bi bi-trash me-1"></i>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}

              {clientes.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-5"
                    style={{ color: "#7a6c72" }}
                  >
                    Nenhum cliente cadastrado.
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