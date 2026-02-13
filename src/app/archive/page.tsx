import Link from "next/link";
import { getAllPostsMeta } from "@/lib/posts";
import { format } from "date-fns";

export const metadata = {
  title: "Pendarves — Archive",
};

export default function ArchivePage() {
  const posts = getAllPostsMeta();

  // Group by year
  const grouped: Record<string, typeof posts> = {};
  for (const post of posts) {
    const year = new Date(post.date).getFullYear().toString();
    if (!grouped[year]) grouped[year] = [];
    grouped[year].push(post);
  }

  const years = Object.keys(grouped).sort().reverse();

  return (
    <div>
      {years.map((year) => (
        <section key={year} className="archive-section">
          <h2 className="archive-year">{year}</h2>
          {grouped[year].map((post) => (
            <div key={post.slug} className="archive-entry">
              <time>{format(new Date(post.date), "MMM dd")}</time>
              <Link
                href={`/posts/${post.slug}`}
                style={{ color: "var(--fg-emphasis)" }}
              >
                {post.title}
              </Link>
            </div>
          ))}
        </section>
      ))}

      {posts.length === 0 && (
        <p style={{ color: "var(--fg-muted)" }}>Nothing here yet.</p>
      )}
    </div>
  );
}
