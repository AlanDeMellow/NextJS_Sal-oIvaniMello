import Link from "next/link";

export default function ClientePage() {
  return (
    <div>
      <p
        className="text-uppercase mb-2"
        style={{
          color: "#8f536b",
          fontSize: "0.75rem",
          letterSpacing: "3px",
        }}
      >
        Área do cliente
      </p>

      <h1
        style={{
          fontFamily: "Georgia, serif",
          color: "#30252a",
          fontSize: "3rem",
          fontWeight: 400,
        }}
      >
        Bem-vindo
      </h1>

      <p
        className="mb-5"
        style={{
          color: "#7a6c72",
        }}
      >
        Gerencie seus horários e faça novos agendamentos.
      </p>

      <div className="row g-4">
        <div className="col-md-6">
          <Link
            href="/cliente/agendar"
            className="d-block p-4"
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "18px",
              border: "1px solid #ead7df",
              color: "#30252a",
            }}
          >
            <i
              className="bi bi-calendar-plus"
              style={{
                fontSize: "2rem",
                color: "#8f536b",
              }}
            ></i>

            <h2
              className="mt-3"
              style={{
                fontFamily: "Georgia, serif",
              }}
            >
              Novo agendamento
            </h2>

            <p
              className="mb-0"
              style={{
                color: "#7a6c72",
              }}
            >
              Escolha um procedimento, uma data e um horário.
            </p>
          </Link>
        </div>

        <div className="col-md-6">
          <Link
            href="/cliente/agendamentos"
            className="d-block p-4"
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "18px",
              border: "1px solid #ead7df",
              color: "#30252a",
            }}
          >
            <i
              className="bi bi-calendar-check"
              style={{
                fontSize: "2rem",
                color: "#8f536b",
              }}
            ></i>

            <h2
              className="mt-3"
              style={{
                fontFamily: "Georgia, serif",
              }}
            >
              Meus agendamentos
            </h2>

            <p
              className="mb-0"
              style={{
                color: "#7a6c72",
              }}
            >
              Consulte os horários que você já marcou.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}