import Link from "next/link";
import { getAllPostsMeta } from "@/lib/posts";
import { format } from "date-fns";

export default function Home() {
  const posts = getAllPostsMeta();

  return (
    <div>
      {posts.map((post) => (
        <article
          key={post.slug}
          style={{
            marginBottom: "2.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "0.75rem",
              marginBottom: "0.25rem",
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
              href={`/topic/${post.topic.toLowerCase()}`}
              style={{
                fontSize: "0.75rem",
                color: "var(--cyan)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {post.topic}
            </Link>
          </div>
          <Link
            href={`/posts/${post.slug}`}
            style={{
              fontSize: "1.25rem",
              color: "var(--fg-emphasis)",
            }}
          >
            {post.title}
          </Link>
          <p
            style={{
              marginTop: "0.375rem",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "var(--fg)",
            }}
          >
            {post.excerpt}
          </p>
        </article>
      ))}
    </div>
  );
}
