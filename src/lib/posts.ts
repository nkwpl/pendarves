import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface Post {
  slug: string;
  title: string;
  date: string;
  topic: string;
  excerpt: string;
  content: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
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

  return {
    slug,
    title: data.title,
    date: data.date,
    topic: data.topic,
    excerpt: data.excerpt,
    content: processedContent.toString(),
  };
}

export function getAllTopics(): string[] {
  const posts = getAllPostsMeta();
  const topics = new Set(posts.map((p) => p.topic));
  return Array.from(topics).sort();
}

export function getPostsByTopic(topic: string): PostMeta[] {
  return getAllPostsMeta().filter((p) => p.topic === topic);
}

export function getPostsByMonth(): Record<string, PostMeta[]> {
  const posts = getAllPostsMeta();
  const grouped: Record<string, PostMeta[]> = {};

  for (const post of posts) {
    const date = new Date(post.date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(post);
  }

  return grouped;
}

export function getAllSlugs(): string[] {
  return getPostFiles().map((f) => f.replace(/\.md$/, ""));
}
