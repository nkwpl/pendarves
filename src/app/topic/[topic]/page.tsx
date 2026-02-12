import Link from "next/link";
import { getAllTopics, getPostsByTopic } from "@/lib/posts";
import { format } from "date-fns";

export async function generateStaticParams() {
  return getAllTopics().map((topic) => ({ topic: topic.toLowerCase() }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const label = topic.charAt(0).toUpperCase() + topic.slice(1);
  return { title: `${label} — Pendarves` };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const posts = getPostsByTopic(
    topic.charAt(0).toUpperCase() + topic.slice(1)
  );

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
        {topic}
      </h1>

      {posts.length === 0 ? (
        <p style={{ color: "var(--fg-muted)" }}>No posts in this topic yet.</p>
      ) : (
        posts.map((post) => (
          <article key={post.slug} style={{ marginBottom: "1.5rem" }}>
            <div
              style={{
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
                {format(new Date(post.date), "dd MMM yyyy")}
              </time>
              <Link
                href={`/posts/${post.slug}`}
                style={{ color: "var(--fg-emphasis)" }}
              >
                {post.title}
              </Link>
            </div>
          </article>
        ))
      )}

      <div style={{ marginTop: "2rem" }}>
        <Link href="/" style={{ fontSize: "0.875rem" }}>
          &larr; All posts
        </Link>
      </div>
    </div>
  );
}
