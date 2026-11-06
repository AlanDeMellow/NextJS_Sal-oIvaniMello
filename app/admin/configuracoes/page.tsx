"use client";

export default function ConfiguracoesPage() {
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <div className="mb-5">
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
          Administração
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
          Configurações
        </h1>

        <p
          style={{
            marginTop: "10px",
            marginBottom: 0,
            color: "#7a6c72",
          }}
        >
          Ajustes gerais do sistema e informações do salão.
        </p>
      </div>

      <div
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #ead7df",
          borderRadius: "22px",
          padding: "30px",
          boxShadow: "0 10px 30px rgba(83, 54, 67, 0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            marginBottom: "25px",
          }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "14px",
              backgroundColor: "#f7e9ef",
              color: "#8f536b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.3rem",
            }}
          >
            <i className="bi bi-gear"></i>
          </div>

          <div>
            <h2
              style={{
                margin: 0,
                fontFamily: "Georgia, serif",
                fontSize: "1.5rem",
                fontWeight: 400,
                color: "#30252a",
              }}
            >
              Configurações do sistema
            </h2>

            <small style={{ color: "#8a7c82" }}>
              Esta área poderá receber novas configurações futuramente.
            </small>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#fff8fa",
            border: "1px solid #ead7df",
            borderRadius: "16px",
            padding: "20px",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "#66585e",
            }}
          >
            No momento, não existem configurações adicionais disponíveis.
          </p>
        </div>
      </div>
    </div>
  );
}