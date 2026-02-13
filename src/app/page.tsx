import Link from "next/link";
import { getPostsByType } from "@/lib/posts";
import { format } from "date-fns";

export default function Home() {
  const essays = getPostsByType("essay");
  const posts = getPostsByType("post");

  return (
    <div>
      {/* Bio */}
      <section style={{ marginBottom: "2.5rem", lineHeight: 1.7 }}>
        <p style={{ color: "var(--fg)" }}>
          Writing about philosophy, power, AI, and making things.
        </p>
      </section>

      {/* Essays */}
      {essays.length > 0 && (
        <section style={{ marginBottom: "2rem" }}>
          <h2 className="section-heading">Essays</h2>
          {essays.map((entry) => (
            <div key={entry.slug} className="entry">
              <Link href={`/posts/${entry.slug}`}>{entry.title}</Link>
              <time className="meta">
                {" "}
                ({format(new Date(entry.date), "MMMM yyyy")})
              </time>
            </div>
          ))}
        </section>
      )}

      {/* Short posts */}
      {posts.length > 0 && (
        <section style={{ marginBottom: "2rem" }}>
          <h2 className="section-heading">Short posts</h2>
          {posts.map((entry) => (
            <div key={entry.slug} className="entry">
              <Link href={`/posts/${entry.slug}`}>{entry.title}</Link>
              <time className="meta">
                {" "}
                ({format(new Date(entry.date), "MMMM yyyy")})
              </time>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
