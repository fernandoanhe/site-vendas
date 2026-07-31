import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Clinvex — Gestão Comercial WhatsApp-First para Clínicas de Alto Ticket";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0A0A0B",
          padding: "60px 80px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(245, 183, 49, 0.12) 0%, transparent 70%)",
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: "28px",
            fontWeight: 600,
            color: "#F5B731",
            marginBottom: "32px",
            letterSpacing: "-0.02em",
          }}
        >
          Clinvex
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "56px",
            fontWeight: 700,
            color: "#F5F5F3",
            textAlign: "center",
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            maxWidth: "900px",
          }}
        >
          Gestão Comercial é Ciência de Dados
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "22px",
            color: "#A0A0A0",
            marginTop: "24px",
            textAlign: "center",
            maxWidth: "700px",
            lineHeight: 1.5,
          }}
        >
          Plataforma WhatsApp-first para clínicas de alto ticket
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "40px",
            backgroundColor: "#F5B731",
            color: "#0A0A0B",
            padding: "14px 32px",
            borderRadius: "12px",
            fontSize: "18px",
            fontWeight: 600,
          }}
        >
          Teste grátis por 14 dias
        </div>
      </div>
    ),
    { ...size }
  );
}
