import { getPostBySlug, getAllSlugs } from "@/lib/posts";
import Link from "next/link";
import { format } from "date-fns";
import TableOfContents from "@/components/TableOfContents";

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
  return { title: `Pendarves — ${post.title}` };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const isEssay = post.type === "essay" && post.headings.length > 0;

  return (
    <div className={isEssay ? "essay-layout" : ""}>
      {isEssay && (
        <aside className="toc-sidebar">
          <TableOfContents headings={post.headings} />
        </aside>
      )}

      <article className="essay-content">
        <Link
          href="/"
          style={{
            fontSize: "0.85rem",
            color: "var(--fg-muted)",
            display: "inline-block",
            marginBottom: "1.5rem",
          }}
        >
          ← Back
        </Link>
        <header style={{ marginBottom: "2.5rem" }}>
          <h1
            style={{
              fontSize: "2.5rem",
              color: "var(--fg-emphasis)",
              lineHeight: 1.3,
              marginBottom: "0.5rem",
              textWrap: "balance",
            }}
          >
            {post.title}
          </h1>
          <time
            style={{
              fontSize: "0.75rem",
              color: "var(--fg-muted)",
            }}
          >
            {format(new Date(post.date), "MMMM yyyy")}
          </time>
        </header>

        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <footer
          style={{
            marginTop: "3rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid var(--bg-alt)",
          }}
        >
          <Link
            href="/"
            style={{ fontSize: "0.9rem", color: "var(--fg-muted)" }}
          >
            Pendarves
          </Link>
        </footer>
      </article>
    </div>
  );
}
