import { getDictionary, hasLocale } from "../_dictionaries";
import { db } from "@repo/db";
import { CreatePostForm } from "./create-post-form";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function PostsPage({ params }: Props) {
  const { locale } = await params;

  if (!hasLocale(locale)) notFound();

  const [dict, posts] = await Promise.all([
    getDictionary(locale),
    db.selectFrom("post").selectAll().execute(),
  ]);

  return (
    <div style={{ padding: "2rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>{dict.posts}</h1>
        <CreatePostForm t={{ create_post: dict.create_post }} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {posts.map((post) => (
          <article
            key={post.id}
            style={{
              padding: "1rem",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
          >
            <h2 style={{ fontSize: "1.25rem", fontWeight: "600" }}>
              {post.title}
            </h2>
            <p>{post.content}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
