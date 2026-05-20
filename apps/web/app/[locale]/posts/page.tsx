import { loadTranslations } from "@repo/i18n/server";
import { db } from "@repo/db";
import Link from "next/link";
import { CreatePostForm } from "./create-post-form";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function PostsPage({ params }: Props) {
  const { locale } = await params;
  const t = await loadTranslations(locale, "common");
  const posts = await db.selectFrom("post").selectAll().execute();

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
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>{t.posts}</h1>
        <CreatePostForm t={{ create_post: t.create_post }} />
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
