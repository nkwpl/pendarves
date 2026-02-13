import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/posts");

export type PostType = "essay" | "post";

export interface Heading {
  id: string;
  text: string;
}

export interface Post {
  slug: string;
  title: string;
  date: string;
  type: PostType;
  topic: string;
  excerpt: string;
  content: string;
  headings: Heading[];
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  type: PostType;
  topic: string;
  excerpt: string;
}

function getPostFiles(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));
}

export function getAllPostsMeta(): PostMeta[] {
  const files = getPostFiles();

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title,
      date: data.date,
      type: (data.type as PostType) || "post",
      topic: data.topic,
      excerpt: data.excerpt,
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  let htmlContent = processedContent.toString();

  // Extract headings and add IDs
  const headings: Heading[] = [];
  htmlContent = htmlContent.replace(
    /<h2>(.*?)<\/h2>/g,
    (_match, text: string) => {
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      headings.push({ id, text });
      return `<h2 id="${id}">${text}</h2>`;
    }
  );

  return {
    slug,
    title: data.title,
    date: data.date,
    type: (data.type as PostType) || "post",
    topic: data.topic,
    excerpt: data.excerpt,
    content: htmlContent,
    headings,
  };
}

export function getPostsByType(type: PostType): PostMeta[] {
  return getAllPostsMeta().filter((p) => p.type === type);
}

export function getAllSlugs(): string[] {
  return getPostFiles().map((f) => f.replace(/\.md$/, ""));
}
