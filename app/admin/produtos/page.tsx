"use client";

import { getToken } from "@/app/login/auth_service";
import { useEffect, useState } from "react";

type Produto = {
  id: number;
  nome: string;
  descricao?: string;
  preco: number;
  quantidade: number;
};

export default function ProdutosPage() {
  const API = "http://localhost:3000/api/produtos";

  const [id, setId] = useState<number | null>(null);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [erro, setErro] = useState("");

  async function carregarProdutos() {
    try {
      setErro("");

      const response = await fetch(API, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error("Não foi possível carregar os produtos.");
      }

      const dados = await response.json();
      setProdutos(dados);
    } catch (error) {
      console.error(error);
      setErro("Não foi possível carregar os produtos.");
    }
  }

  function editar(produto: Produto) {
    setId(produto.id);
    setNome(produto.nome);
    setDescricao(produto.descricao || "");
    setPreco(String(produto.preco));
    setQuantidade(String(produto.quantidade));

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
    setQuantidade("");
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
            quantidade: Number(quantidade),
          }),
        }
      );

      if (!response.ok) {
        const erroBackend = await response.json();

        console.log("Erro do backend:", erroBackend);

        throw new Error(
          erroBackend.message || "Não foi possível salvar o produto."
        );
      }

      limparFormulario();
      await carregarProdutos();
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        setErro(error.message);
      } else {
        setErro("Não foi possível salvar o produto.");
      }
    }
  }

  async function excluir(produtoId: number) {
    const confirmar = window.confirm(
      "Deseja realmente excluir este produto?"
    );

    if (!confirmar) {
      return;
    }

    try {
      setErro("");

      const response = await fetch(`${API}/${produtoId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!response.ok) {
        const erroBackend = await response.json();

        console.log("Erro do backend:", erroBackend);

        throw new Error(
          erroBackend.message || "Não foi possível excluir o produto."
        );
      }

      await carregarProdutos();
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        setErro(error.message);
      } else {
        setErro("Não foi possível excluir o produto.");
      }
    }
  }

  useEffect(() => {
    void carregarProdutos();
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
          Produtos
        </p>

        <h1
          style={{
            fontFamily: "Georgia, serif",
            color: "#30252a",
            fontSize: "3rem",
            fontWeight: 400,
          }}
        >
          Produtos
        </h1>

        <p style={{ color: "#7a6c72" }}>
          Cadastre e gerencie os produtos utilizados no salão.
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
            ? "Novo produto"
            : "Editar produto"}
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
                Quantidade
              </label>

              <input
                type="number"
                className="form-control"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
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
                ? "Cadastrar produto"
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
            Produtos cadastrados
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
                  Preço
                </th>

                <th className="py-3">
                  Quantidade
                </th>

                <th className="py-3 text-end px-4">
                  Ações
                </th>
              </tr>
            </thead>

            <tbody>
              {produtos.map((produto) => (
                <tr key={produto.id}>
                  <td className="px-4 py-3">
                    {produto.nome}
                  </td>

                  <td>
                    R$ {Number(produto.preco).toFixed(2)}
                  </td>

                  <td>
                    {produto.quantidade}
                  </td>

                  <td className="text-end px-4">
                    <button
                      type="button"
                      className="btn btn-sm me-2"
                      style={{
                        color: "#8f536b",
                        border: "1px solid #d9bfc9",
                      }}
                      onClick={() => editar(produto)}
                    >
                      <i className="bi bi-pencil me-1"></i>
                      Editar
                    </button>

                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => excluir(produto.id)}
                    >
                      <i className="bi bi-trash me-1"></i>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}

              {produtos.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-5"
                    style={{ color: "#7a6c72" }}
                  >
                    Nenhum produto cadastrado.
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