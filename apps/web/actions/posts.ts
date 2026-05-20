"use server";

import { auth } from "@repo/auth/server";
import { db } from "@repo/db";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function createPost(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { error: "Not authenticated" };
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!title) {
    return { error: "Title is required" };
  }

  await db
    .insertInto("post")
    .values({
      title,
      content: content ?? "",
      author_id: session.user.id,
    })
    .returningAll()
    .executeTakeFirst();

  revalidatePath("/[locale]/posts");
}
