import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = "Swapnil Katuwal, Security Engineer & Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function toAB(buf: Buffer): ArrayBuffer {
  return buf.buffer.slice(
    buf.byteOffset,
    buf.byteOffset + buf.byteLength,
  ) as ArrayBuffer;
}

function font(
  name: "Geist-SemiBold" | "Geist-Medium" | "Geist-Regular",
): ArrayBuffer {
  return toAB(
    fs.readFileSync(
      path.join(
        process.cwd(),
        "node_modules/geist/dist/fonts/geist-sans",
        `${name}.ttf`,
      ),
    ),
  );
}

function monoFont(name: "GeistMono-Medium" | "GeistMono-Regular"): ArrayBuffer {
  return toAB(
    fs.readFileSync(
      path.join(
        process.cwd(),
        "node_modules/geist/dist/fonts/geist-mono",
        `${name}.ttf`,
      ),
    ),
  );
}

export default function OpengraphImage(): ImageResponse {
  const bg = "#16181f";
  const fg = "#eeece7";
  const muted = "#8b909c";
  const signal = "#7ea6d8";
  const hairline = "rgba(238,236,231,0.12)";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: bg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1200,
          height: 630,
          display: "flex",
          backgroundImage: `linear-gradient(to right, ${hairline} 1px, transparent 1px), linear-gradient(to bottom, ${hairline} 1px, transparent 1px)`,
          backgroundSize: "96px 96px",
          opacity: 0.5,
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          fontSize: 22,
          fontFamily: "Mono",
          color: muted,
          letterSpacing: 2,
          position: "relative",
        }}
      >
        <span>KATHMANDU, NP · UTC+05:45</span>
        <span style={{ color: signal }}>SEC / ENG</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 118,
            fontWeight: 600,
            color: fg,
            letterSpacing: -4,
            lineHeight: 1.02,
            fontFamily: "Sans",
          }}
        >
          Swapnil Katuwal
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 44,
            fontWeight: 500,
            color: muted,
            fontFamily: "Sans",
          }}
        >
          Security Engineer{" "}
          <span style={{ color: signal, marginLeft: 14 }}>& Builder</span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          borderTop: `1px solid ${hairline}`,
          paddingTop: 28,
          position: "relative",
        }}
      >
        <span style={{ fontSize: 22, fontFamily: "Mono", color: muted }}>
          {siteConfig.url.replace(/^https?:\/\//, "")}
        </span>
        <span style={{ fontSize: 22, fontFamily: "Mono", color: muted }}>
          01 / 06
        </span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Sans", data: font("Geist-SemiBold"), weight: 600 },
        { name: "Sans", data: font("Geist-Medium"), weight: 500 },
        { name: "Sans", data: font("Geist-Regular"), weight: 400 },
        { name: "Mono", data: monoFont("GeistMono-Medium"), weight: 500 },
        { name: "Mono", data: monoFont("GeistMono-Regular"), weight: 400 },
      ],
    },
  );
}
