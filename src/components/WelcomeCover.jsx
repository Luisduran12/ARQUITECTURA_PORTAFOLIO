import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const WelcomeCover = ({ onEnter }) => {
  const { t } = useTranslation();
  const [exiting, setExiting] = useState(false);
  const curtainRef = useRef(null);

  const handleEnter = () => {
    setExiting(true);
    setTimeout(() => {
      onEnter();
    }, 900);
  };

  return (
    <>
      <style>{`
        /* Fonts are loaded globally via index.html — no @import needed here */

        .welcome-cover {
          position: fixed;
          inset: 0;
          z-index: 9999;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
          will-change: opacity;
        }

        .welcome-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }

        .welcome-overlay {
          position: absolute;
          inset: 0;
          background: transparent;
          z-index: 1;
        }

        /* === CORTINA === */
        .curtain {
          position: absolute;
          inset: 0;
          background: #080808;
          z-index: 20;
          transform: scaleY(0);
          transform-origin: top;
          transition: transform 0.85s cubic-bezier(0.77, 0, 0.18, 1);
          will-change: transform;
        }
        .curtain.active {
          transform: scaleY(1);
        }

        /* === LOGO superior izquierdo === */
        .welcome-logo {
          position: absolute;
          top: 36px;
          left: 44px;
          z-index: 10;
          opacity: 0;
          animation: fadeUp 1s ease 0.3s forwards;
        }
        .welcome-logo img {
          width: 130px;
          filter: brightness(0) invert(1);
        }

        /* === CONTENIDO CENTRAL === */
        .welcome-center {
          position: absolute;
          inset: 0;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0;
          text-align: center;
          padding: 20px;
        }

        /* Iniciales grandes - serif fina */
        .welcome-initials {
          font-family: 'Playfair Display', 'Georgia', serif;
          font-weight: 300;
          font-size: clamp(72px, 14vw, 160px);
          color: #fff;
          letter-spacing: 0.12em;
          line-height: 1;
          opacity: 0;
          animation: fadeUp 1.1s ease 0.5s forwards;
          text-shadow: 0 4px 40px rgba(0,0,0,0.4);
        }

        /* Divisor elegante */
        .welcome-divider {
          width: 40px;
          height: 1px;
          background: rgba(255,255,255,0.35);
          margin: 22px auto;
          opacity: 0;
          animation: fadeUp 1s ease 0.75s forwards;
        }

        /* Nombre completo */
        .welcome-name {
          font-family: 'Inter', sans-serif;
          font-weight: 200;
          font-size: clamp(11px, 1.4vw, 14px);
          color: rgba(255,255,255,0.75);
          letter-spacing: 0.45em;
          text-transform: uppercase;
          opacity: 0;
          animation: fadeUp 1s ease 0.9s forwards;
        }

        /* Ciudad */
        .welcome-city {
          font-family: 'Inter', sans-serif;
          font-weight: 300;
          font-size: clamp(9px, 1vw, 11px);
          color: rgba(255,255,255,0.38);
          letter-spacing: 0.35em;
          text-transform: uppercase;
          margin-top: 10px;
          opacity: 0;
          animation: fadeUp 1s ease 1.1s forwards;
        }

        /* Botón píldora */
        .welcome-btn-wrapper {
          margin-top: 52px;
          opacity: 0;
          animation: fadeUp 1s ease 1.3s forwards;
        }

        .welcome-btn {
          font-family: 'Inter', sans-serif;
          font-weight: 300;
          font-size: 11px;
          letter-spacing: 0.45em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.88);
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.32);
          border-radius: 999px;
          padding: 14px 52px;
          cursor: pointer;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          transition: background 0.4s ease, border-color 0.4s ease, transform 0.3s ease;
          outline: none;
        }
        .welcome-btn:hover {
          background: rgba(255,255,255,0.13);
          border-color: rgba(255,255,255,0.65);
          transform: scale(1.03);
        }
        .welcome-btn:active {
          transform: scale(0.97);
        }

        /* Línea inferior de decoración */
        .welcome-footer-line {
          position: absolute;
          bottom: 36px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          font-size: 9px;
          letter-spacing: 0.3em;
          color: rgba(255,255,255,0.18);
          text-transform: uppercase;
          opacity: 0;
          animation: fadeUp 1s ease 1.5s forwards;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="welcome-cover">
        {/* Video de fondo */}
        <video
          className="welcome-video"
          src="/videos/mi_portada.mp4"
          poster="/RENDERS/EDIFICIO/e2.webp"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
        />

        {/* Overlay oscuro */}
        <div className="welcome-overlay" />

        {/* Cortina de salida */}
        <div className={`curtain ${exiting ? "active" : ""}`} ref={curtainRef} />

        {/* Logo superior izquierdo */}
        <div className="welcome-logo">
          <img fetchpriority="high" src="/publico/HOR_WHITE.webp" alt="Logo SWAG Arquitectos" />
        </div>

        {/* Centro */}
        <div className="welcome-center">
          <div className="welcome-initials">SWAG</div>
          <div className="welcome-divider" />
          <div className="welcome-name">Arquitectos</div>
          <div className="welcome-city">{t('welcome.ciudad')}</div>
          <div className="welcome-btn-wrapper">
            <button className="welcome-btn" onClick={handleEnter}>
              Entrar
            </button>
          </div>
        </div>

        {/* Footer decorativo */}
        <div className="welcome-footer-line">Visualización Arquitectónica</div>
      </div>
    </>
  );
};

export default React.memo(WelcomeCover);
