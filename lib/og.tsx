import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

// Social preview images, rendered at build time by the opengraph-image files. The assets don't
// depend on the request, so they're read once at module scope.

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

// Literal paths, so the build traces only these three files.
const [medium, extraBold, logo] = await Promise.all([
  readFile(join(process.cwd(), "assets/fonts/PlusJakartaSans-Medium.ttf")),
  readFile(join(process.cwd(), "assets/fonts/PlusJakartaSans-ExtraBold.ttf")),
  readFile(join(process.cwd(), "public/brand/logo.png")),
]);
const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

const colors = { ink: "#0a0a0b", titanium: "#f5f6f7", muted: "#9a9fa6", copper: "#e29a5f", copperDeep: "#c8783f" };

export function renderOgImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: colors.ink,
          backgroundImage: "radial-gradient(ellipse 60% 70% at 92% 45%, rgba(200,120,63,0.38), rgba(10,10,11,0) 70%)",
          fontFamily: "Jakarta",
        }}
      >
        {/* The orbit motif from the hero, drawn as a tilted ellipse clear of the title. */}
        <svg width="620" height="420" viewBox="0 0 620 420" style={{ position: "absolute", right: -200, top: 120 }}>
          <ellipse cx="310" cy="210" rx="290" ry="120" fill="none" stroke={colors.copperDeep} strokeOpacity="0.5" strokeWidth="2" transform="rotate(-18 310 210)" />
          <circle cx="347" cy="324" r="7" fill={colors.copper} />
        </svg>

        {/* eslint-disable-next-line @next/next/no-img-element -- rendered to a PNG by next/og, not the browser */}
        <img src={logoSrc} height={64} width={221} alt="" />

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 900 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, color: colors.copper, fontSize: 24, fontWeight: 500, letterSpacing: 5, textTransform: "uppercase" }}>
            <div style={{ width: 48, height: 2, backgroundColor: colors.copperDeep }} />
            {eyebrow}
          </div>
          <div
            style={{
              marginTop: 24,
              color: colors.titanium,
              fontSize: title.length > 60 ? 58 : 72,
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: -1.5,
            }}
          >
            {title}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 18, color: colors.muted, fontSize: 22, fontWeight: 500, letterSpacing: 4, textTransform: "uppercase" }}>
          <div style={{ width: 48, height: 2, backgroundColor: colors.copperDeep }} />
          {site.footerTagline}
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Jakarta", data: medium, weight: 500, style: "normal" },
        { name: "Jakarta", data: extraBold, weight: 800, style: "normal" },
      ],
    },
  );
}
