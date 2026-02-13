import type { Metadata } from "next";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pendarves",
  description: "Essays on philosophy, power, AI, and making things.",
};

const themeScript = `
(function() {
  var t = localStorage.getItem('theme');
  if (!t) {
    t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.documentElement.setAttribute('data-theme', t);
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link
          href="https://fonts.cdnfonts.com/css/chicagoflf"
          rel="stylesheet"
        />
      </head>
      <body>
        <div
          style={{
            maxWidth: "640px",
            margin: "0 auto",
            padding: "2.5rem 1.5rem",
          }}
        >
          <header style={{ marginBottom: "2.5rem" }}>
            <nav
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
              }}
            >
              <Link
                href="/"
                style={{
                  fontSize: "1.4rem",
                  color: "var(--fg-emphasis)",
                }}
              >
                Pendarves
              </Link>
              <div
                style={{
                  display: "flex",
                  gap: "1.25rem",
                  alignItems: "baseline",
                  fontSize: "0.9rem",
                }}
              >
                <Link href="/archive" style={{ color: "var(--fg-muted)" }}>
                  Archive
                </Link>
                <ThemeToggle />
              </div>
            </nav>
          </header>

          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
