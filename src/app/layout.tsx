import type { Metadata } from "next";
import Link from "next/link";
import { getAllTopics } from "@/lib/posts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pendarves",
  description: "Essays on philosophy, power, AI, and making things.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const topics = getAllTopics();

  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.cdnfonts.com/css/chicagoflf"
          rel="stylesheet"
        />
      </head>
      <body>
        <div
          style={{
            maxWidth: "720px",
            margin: "0 auto",
            padding: "2rem 1.5rem",
          }}
        >
          <header style={{ marginBottom: "3rem" }}>
            <nav
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "1.5rem",
                flexWrap: "wrap",
                borderBottom: "1px solid var(--bg-alt)",
                paddingBottom: "1rem",
              }}
            >
              <Link
                href="/"
                style={{
                  fontSize: "1.5rem",
                  color: "var(--fg-emphasis)",
                  letterSpacing: "0.05em",
                  fontFamily: "var(--font-chicago)",
                }}
              >
                Pendarves
              </Link>
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  fontSize: "0.875rem",
                }}
              >
                {topics.map((topic) => (
                  <Link
                    key={topic}
                    href={`/topic/${topic.toLowerCase()}`}
                    style={{ color: "var(--fg)" }}
                  >
                    {topic}
                  </Link>
                ))}
                <Link href="/archive" style={{ color: "var(--fg)" }}>
                  Archive
                </Link>
              </div>
            </nav>
          </header>

          <main>{children}</main>

          <footer
            style={{
              marginTop: "4rem",
              paddingTop: "1rem",
              borderTop: "1px solid var(--bg-alt)",
              fontSize: "0.8rem",
              color: "var(--fg-muted)",
            }}
          >
            Pendarves &middot; {new Date().getFullYear()}
          </footer>
        </div>
      </body>
    </html>
  );
}
