"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@repo/ui/components/button";

export function CreatePostForm({
  t,
}: {
  t: { create_post: string };
}) {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const router = useRouter();
  const locale = (params.locale as string) ?? "en";

  if (!open) {
    return <Button onClick={() => setOpen(true)}>{t.create_post}</Button>;
  }

  return (
    <form
      action={async (formData) => {
        const { createPost } = await import("../../../actions/posts");
        await createPost(formData);
        setOpen(false);
        router.refresh();
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        width: "300px",
        padding: "1rem",
        border: "1px solid hsl(var(--border))",
        borderRadius: "var(--radius)",
      }}
    >
      <input
        name="title"
        placeholder="Title"
        required
        style={{
          padding: "0.5rem",
          border: "1px solid hsl(var(--border))",
          borderRadius: "var(--radius)",
        }}
      />
      <textarea
        name="content"
        placeholder="Content"
        rows={3}
        style={{
          padding: "0.5rem",
          border: "1px solid hsl(var(--border))",
          borderRadius: "var(--radius)",
        }}
      />
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <Button type="submit">Save</Button>
        <Button variant="outline" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
