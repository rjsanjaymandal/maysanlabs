import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Maysan Labs";
  const description = searchParams.get("description") || "Enterprise SaaS Development Company";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #0a0f1a 0%, #0f1923 50%, #1a2a3a 100%)",
          fontFamily: '"Outfit", "Inter", "Segoe UI", "Helvetica Neue", sans-serif',
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-50%",
            right: "-20%",
            width: "60%",
            height: "100%",
            background: "radial-gradient(circle, rgba(26,109,214,0.15) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-30%",
            left: "-10%",
            width: "50%",
            height: "60%",
            background: "radial-gradient(circle, rgba(0,210,255,0.08) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "10%",
            width: "2px",
            height: "60%",
            background: "linear-gradient(to bottom, transparent, rgba(26,109,214,0.3), transparent)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "15%",
            right: "8%",
            width: "2px",
            height: "40%",
            background: "linear-gradient(to top, transparent, rgba(0,210,255,0.2), transparent)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            padding: "60px 70px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "24px",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#1A6DD6" />
              <path d="M8 12L16 8L24 12V20L16 24L8 20V12Z" fill="white" fillOpacity="0.2" />
              <path d="M12 14L16 12L20 14V18L16 20L12 18V14Z" fill="white" />
            </svg>
            <span
              style={{
                fontSize: "18px",
                color: "#1A6DD6",
                fontWeight: 600,
                letterSpacing: "0.1em",
              }}
            >
              MAYSAN LABS
            </span>
          </div>

          <h1
            style={{
              fontSize: "48px",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.2,
              margin: 0,
              maxWidth: "90%",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </h1>

          <p
            style={{
              fontSize: "22px",
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.4,
              margin: "16px 0 0 0",
              maxWidth: "85%",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {description}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 70px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <span
            style={{
              fontSize: "14px",
              color: "rgba(255,255,255,0.3)",
              fontWeight: 400,
            }}
          >
            maysanlabs.com
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#1A6DD6",
              }}
            />
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#00d2ff",
              }}
            />
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#10b981",
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
