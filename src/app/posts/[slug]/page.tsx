import { getPostBySlug, getAllSlugs } from "@/lib/posts";
import Link from "next/link";
import { format } from "date-fns";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return { title: `${post.title} — Pendarves` };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return (
    <article>
      <header style={{ marginBottom: "2rem" }}>
        <h1
          style={{
            fontSize: "1.75rem",
            fontWeight: 700,
            color: "var(--base01)",
            lineHeight: 1.2,
            marginBottom: "0.5rem",
          }}
        >
          {post.title}
        </h1>
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            alignItems: "baseline",
            fontSize: "0.85rem",
          }}
        >
          <time style={{ color: "var(--base1)", fontFamily: "monospace" }}>
            {format(new Date(post.date), "dd MMMM yyyy")}
          </time>
          <Link
            href={`/topic/${post.topic.toLowerCase()}`}
            style={{
              color: "var(--cyan)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              fontSize: "0.75rem",
            }}
          >
            {post.topic}
          </Link>
        </div>
      </header>

      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div style={{ marginTop: "3rem" }}>
        <Link href="/" style={{ fontSize: "0.875rem" }}>
          &larr; All posts
        </Link>
      </div>
    </article>
  );
}
