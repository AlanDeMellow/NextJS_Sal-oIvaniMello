"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  getRole,
  isAuthenticated,
} from "./login/auth_service";

type FotoPortfolio = {
  src: string;
  titulo: string;
};

export default function HomePage() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [logado, setLogado] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setLogado(isAuthenticated());
    setRole(getRole());
  }, []);

  const fotos: FotoPortfolio[] = useMemo(
    () => [
      {
        src: "/assets/752534927_18171424330430262_5543001693331474773_n.jpg",
        titulo: "Mechas e movimento",
      },
      {
        src: "/assets/615966344_18151381567430262_6267030661621764771_n.jpg",
        titulo: "Iluminação suave",
      },
      {
        src: "/assets/587617288_18146882269430262_1277573133450342923_n.jpg",
        titulo: "Comprimento e acabamento",
      },
      {
        src: "/assets/563846767_18550606690032567_5804634841354299510_n.jpg",
        titulo: "Penteado para ocasiões especiais",
      },
      {
        src: "/assets/751871194_18171424285430262_7258357288072055415_n.jpg",
        titulo: "Mechas com naturalidade",
      },
      {
        src: "/assets/749259466_18171424321430262_2379557403750448744_n.jpg",
        titulo: "Cabelos lisos e alinhados",
      },
      {
        src: "/assets/584921139_18146882245430262_273189746048816802_n.jpg",
        titulo: "Ondas e iluminação",
      },
      {
        src: "/assets/568571305_18064689296116019_6086747098349070173_n.jpg",
        titulo: "Penteado semipreso",
      },
    ],
    []
  );

  function rotaAgendamento() {
    if (!logado) {
      return "/login";
    }

    if (role === "ADMIN") {
      return "/admin";
    }

    return "/cliente/agendar";
  }

  function rotaArea() {
    if (role === "ADMIN") {
      return "/admin";
    }

    return "/cliente";
  }

  return (
    <>
      <div className="portfolio-announcement">
        Seu momento de cuidado, em Nova Bassano
        <span>Atendimento com agendamento</span>
      </div>

      <header className="portfolio-header">
        <a
          className="portfolio-brand"
          href="#inicio"
          aria-label="Ivani Mello, início"
        >
          <Image
            src="/assets/logo.png"
            alt="Logo Ivani Mello Studio de Beleza"
            width={62}
            height={62}
            priority
          />

          <span>
            IVANI MELLO
            <small>STUDIO DE BELEZA</small>
          </span>
        </a>

        <button
          type="button"
          className="portfolio-menu-toggle"
          aria-label="Abrir menu"
          aria-expanded={menuAberto}
          onClick={() => setMenuAberto(!menuAberto)}
        >
          <span></span>
          <span></span>
        </button>

        <nav
          className={`portfolio-nav ${
            menuAberto ? "portfolio-nav-open" : ""
          }`}
        >
          <a href="#trabalhos" onClick={() => setMenuAberto(false)}>
            Trabalhos
          </a>

          <a href="#servicos" onClick={() => setMenuAberto(false)}>
            Serviços
          </a>

          <a href="#sobre" onClick={() => setMenuAberto(false)}>
            O studio
          </a>

          <a href="#contato" onClick={() => setMenuAberto(false)}>
            Contato
          </a>
        </nav>

        <div className="portfolio-header-actions">
          <Link
            className="portfolio-button portfolio-button-small"
            href={rotaAgendamento()}
          >
            Agendar horário
          </Link>

          {!logado ? (
            <Link
              className="portfolio-login-button"
              href="/login"
            >
              Login
            </Link>
          ) : (
            <Link
              className="portfolio-login-button"
              href={rotaArea()}
            >
              {role === "ADMIN"
                ? "Painel"
                : "Área do cliente"}
            </Link>
          )}
        </div>
      </header>

      <main>
        <section
          className="portfolio-hero"
          id="inicio"
        >
          <div className="portfolio-hero-copy">
            <div className="portfolio-eyebrow">
              BELEZA & CUIDADO · NOVA BASSANO, RS
            </div>

            <h1>
              Seu cabelo.
              <br />
              Seu estilo.
              <br />
              <em>Sua beleza.</em>
            </h1>

            <p>
              Um espaço para cuidar de você e dar vida ao visual
              que combina com a sua personalidade.
            </p>

            <div className="portfolio-hero-actions">
              <Link
                className="portfolio-button"
                href={rotaAgendamento()}
              >
                Agendar horário
              </Link>

              <a
                className="portfolio-text-link"
                href="#trabalhos"
              >
                Conheça os trabalhos
              </a>
            </div>

            <div className="portfolio-signature">
              Ivani Mello
              <span>Studio de Beleza</span>
            </div>
          </div>

          <div className="portfolio-hero-photo">
            <span className="portfolio-image-label">
              IVANI MELLO · HAIR STUDIO
            </span>

            <Image
              src="/assets/752534927_18171424330430262_5543001693331474773_n.jpg"
              alt="Trabalho realizado no Ivani Mello Studio de Beleza"
              fill
              sizes="(max-width: 700px) 100vw, 50vw"
              style={{
                objectFit: "cover",
                objectPosition: "center 42%",
              }}
              priority
            />

            <div className="portfolio-photo-note">
              Beleza nos detalhes.
              <small>
                TRABALHOS REAIS DO NOSSO STUDIO
              </small>
            </div>
          </div>
        </section>

        <div className="portfolio-chapter-strip">
          <span>Cortes</span>
          <i>✦</i>
          <span>Mechas</span>
          <i>✦</i>
          <span>Mega Hair</span>
          <i>✦</i>
          <span>Cuidados capilares</span>
          <i>✦</i>
          <span>Penteados</span>
        </div>

        <section
          id="trabalhos"
          className="portfolio-section"
        >
          <div className="portfolio-section-heading">
            <div>
              <div className="portfolio-eyebrow">
                NOSSO PORTFÓLIO
              </div>

              <h2>
                Resultados que <em>inspiram.</em>
              </h2>
            </div>

            <p>
              Mechas, finalizações e penteados feitos no studio.
              <br />
              Alguns dos trabalhos realizados pela Ivani.
            </p>
          </div>

          <div className="portfolio-gallery">
            {fotos.map((foto) => (
              <article
                className="portfolio-work"
                key={foto.src}
              >
                <div className="portfolio-work-image">
                  <Image
                    src={foto.src}
                    alt={`${foto.titulo} — trabalho de Ivani Mello`}
                    fill
                    sizes="(max-width: 700px) 50vw, 25vw"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </div>

                <span>
                  {foto.titulo}
                  <b>＋</b>
                </span>
              </article>
            ))}
          </div>

          <a
            className="portfolio-text-link portfolio-instagram-link"
            href="https://www.instagram.com/salao_ivanimellostudiodebeleza/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mais trabalhos no Instagram
          </a>
        </section>

        <section
          id="servicos"
          className="portfolio-section portfolio-services"
        >
          <div className="portfolio-section-heading">
            <div>
              <div className="portfolio-eyebrow">
                CUIDADOS PARA OS SEUS CABELOS
              </div>

              <h2>
                Um visual com a <em>sua essência.</em>
              </h2>
            </div>

            <p>
              Converse com a Ivani para encontrar o cuidado
              <br />
              mais adequado aos seus fios.
            </p>
          </div>

          <div className="portfolio-service-grid">
            <article className="portfolio-service">
              <span>01</span>
              <h3>Cortes de cabelo</h3>
              <p>
                Um novo corte para valorizar o seu estilo e
                renovar o visual.
              </p>
            </article>

            <article className="portfolio-service">
              <span>02</span>
              <h3>Mechas e coloração</h3>
              <p>
                Luzes, tons e dimensões para iluminar os cabelos.
              </p>
            </article>

            <article className="portfolio-service">
              <span>03</span>
              <h3>Alisamento</h3>
              <p>
                Alinhamento dos fios e cuidado com o acabamento.
              </p>
            </article>

            <article className="portfolio-service">
              <span>04</span>
              <h3>Alongamento e Mega Hair</h3>
              <p>
                Mais comprimento e volume, com avaliação
                personalizada.
              </p>
            </article>

            <article className="portfolio-service">
              <span>05</span>
              <h3>Tratamentos capilares</h3>
              <p>
                Hidratação, nutrição e cuidados para os fios.
              </p>
            </article>

            <article className="portfolio-service">
              <span>06</span>
              <h3>Escovas e penteados</h3>
              <p>
                Finalizações para o dia a dia e ocasiões especiais.
              </p>
            </article>
          </div>

          <div className="portfolio-service-footer">
            <p>Quer saber mais sobre um procedimento?</p>

            <Link
              className="portfolio-text-link"
              href={rotaAgendamento()}
            >
              Agendar um horário
            </Link>
          </div>
        </section>

        <section
          className="portfolio-about portfolio-section"
          id="sobre"
        >
          <div className="portfolio-about-photo">
            <Image
              src="/assets/ivani-mello.jpg"
              alt="Ivani Mello em seu studio de beleza"
              fill
              sizes="(max-width: 700px) 100vw, 50vw"
              style={{
                objectFit: "cover",
                objectPosition: "50% 72%",
              }}
            />
          </div>

          <div className="portfolio-about-copy">
            <div className="portfolio-eyebrow">
              CONHEÇA O STUDIO
            </div>

            <h2>
              Um momento
              <br />
              para <em>você.</em>
            </h2>

            <p>
              Em Nova Bassano, o Ivani Mello Studio de Beleza é
              o espaço de Ivani Inês Rubert De Mello para cuidar
              dos cabelos e criar novos visuais.
            </p>

            <p>
              Do corte à transformação, cada atendimento começa
              com uma conversa sobre o que você deseja para seus
              fios.
            </p>

            <span className="portfolio-signature">
              Ivani Mello
            </span>

            <Link
              className="portfolio-text-link"
              href={rotaAgendamento()}
            >
              Vamos conversar sobre o seu próximo visual
            </Link>
          </div>
        </section>

        <section
          className="portfolio-contact portfolio-section"
          id="contato"
        >
          <div>
            <div className="portfolio-eyebrow">
              SEU PRÓXIMO MOMENTO DE CUIDADO
            </div>

            <h2>
              Vamos marcar
              <br />
              um <em>horário?</em>
            </h2>

            <p>
              Faça seu agendamento pelo nosso sistema ou entre
              em contato para tirar dúvidas.
            </p>

            <div className="portfolio-contact-actions">
              <Link
                className="portfolio-button"
                href={rotaAgendamento()}
              >
                Agendar pelo sistema
              </Link>

              <a
                className="portfolio-button portfolio-whatsapp-button"
                href="https://wa.me/5554996619663?text=Ol%C3%A1%2C%20Ivani!%20Gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os."
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>

              <a
                className="portfolio-button portfolio-instagram-button"
                href="https://www.instagram.com/salao_ivanimellostudiodebeleza/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </div>
          </div>

          <div className="portfolio-contact-details">
            <div>
              <span>WHATSAPP</span>

              <a
                href="https://wa.me/5554996619663"
                target="_blank"
                rel="noopener noreferrer"
              >
                (54) 99661-9663
              </a>
            </div>

            <div>
              <span>ONDE ESTAMOS</span>

              <p>
                R. Prof. Pellizari, 15
                <br />
                Nova Bassano — RS
                <br />
                CEP 95340-000
              </p>

              <div className="portfolio-location-map">
                <iframe
                  title="Localização do Ivani Mello Studio de Beleza"
                  src="https://www.google.com/maps?q=R.%20Prof.%20Pellizari%2C%2015%2C%20Nova%20Bassano%20-%20RS%2C%2095340-000&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            <div>
              <span>ACOMPANHE NO INSTAGRAM</span>

              <a
                href="https://www.instagram.com/salao_ivanimellostudiodebeleza/"
                target="_blank"
                rel="noopener noreferrer"
              >
                @salao_ivanimellostudiodebeleza
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="portfolio-footer">
        <span>IVANI MELLO · STUDIO DE BELEZA</span>
        <span>Nova Bassano, RS</span>
        <a href="#inicio">Voltar ao início</a>
      </footer>
    </>
  );
}