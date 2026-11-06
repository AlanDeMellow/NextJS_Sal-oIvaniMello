import Header from "./components/Header";

export default function Home() {
  return (
    <>
      <Header />

      <main
        style={{
          backgroundColor: "#f8eef2",
          minHeight: "100vh",
        }}
      >
        <section className="container py-5">
          <div className="row align-items-center py-5">
            <div className="col-md-6">
              <p
                className="text-uppercase mb-3"
                style={{
                  color: "#925b72",
                  fontSize: "0.8rem",
                  letterSpacing: "3px",
                }}
              >
                Beleza & cuidado • Nova Bassano, RS
              </p>

              <h1
                className="mb-4"
                style={{
                  fontSize: "4rem",
                  lineHeight: "1.05",
                  fontFamily: "Georgia, serif",
                  fontWeight: 400,
                  color: "#30252a",
                }}
              >
                Seu cabelo.
                <br />
                Seu estilo.
                <br />
                <span style={{ color: "#9d657b" }}>
                  Sua beleza.
                </span>
              </h1>

              <p
                className="mb-4"
                style={{
                  maxWidth: "500px",
                  color: "#6c5e64",
                  lineHeight: "1.8",
                }}
              >
                Um espaço para cuidar de você e facilitar seus
                agendamentos de forma simples e organizada.
              </p>

              <div className="d-flex gap-3 flex-wrap">
                <a
                  href="/login"
                  className="btn px-4 py-2"
                  style={{
                    backgroundColor: "#8f536b",
                    color: "#fff",
                    borderRadius: "999px",
                  }}
                >
                  Agendar horário
                </a>

                <a
                  href="/login"
                  className="btn px-4 py-2"
                  style={{
                    border: "1px solid #8f536b",
                    color: "#8f536b",
                    borderRadius: "999px",
                  }}
                >
                  Login
                </a>
              </div>
            </div>

            <div className="col-md-6 mt-5 mt-md-0">
              <div
                className="d-flex align-items-center justify-content-center text-center p-4"
                style={{
                  minHeight: "420px",
                  backgroundColor: "#efe0e5",
                  borderRadius: "24px",
                  border: "1px solid #e5d1d8",
                  color: "#8f536b",
                }}
              >
                <div>
                  <i
                    className="bi bi-camera"
                    style={{ fontSize: "2rem" }}
                  ></i>

                  <p className="mt-3 mb-0">
                    Aqui terá fotos de clientes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}