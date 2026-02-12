import Link from "next/link";
import { getPostsByMonth } from "@/lib/posts";
import { format } from "date-fns";

export const metadata = {
  title: "Archive — Pendarves",
};

export default function ArchivePage() {
  const grouped = getPostsByMonth();
  const months = Object.keys(grouped).sort().reverse();

  return (
    <div>
      <h1
        style={{
          fontSize: "1.25rem",
          color: "var(--fg-emphasis)",
          marginBottom: "2rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        Archive
      </h1>

      {months.map((month) => {
        const [year, m] = month.split("-");
        const label = format(new Date(Number(year), Number(m) - 1), "MMMM yyyy");

        return (
          <section key={month} style={{ marginBottom: "2rem" }}>
            <h2
              style={{
                fontSize: "1rem",
                color: "var(--yellow)",
                marginBottom: "0.75rem",
              }}
            >
              {label}
            </h2>
            {grouped[month].map((post) => (
              <article
                key={post.slug}
                style={{
                  marginBottom: "0.5rem",
                  display: "flex",
                  alignItems: "baseline",
                  gap: "0.75rem",
                }}
              >
                <time
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--fg-muted)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {format(new Date(post.date), "dd")}
                </time>
                <Link
                  href={`/posts/${post.slug}`}
                  style={{ color: "var(--fg-emphasis)" }}
                >
                  {post.title}
                </Link>
                <Link
                  href={`/topic/${post.topic.toLowerCase()}`}
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--cyan)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {post.topic}
                </Link>
              </article>
            ))}
          </section>
        );
      })}

      <div style={{ marginTop: "2rem" }}>
        <Link href="/" style={{ fontSize: "0.875rem" }}>
          &larr; All posts
        </Link>
      </div>
    </div>
  );
}
