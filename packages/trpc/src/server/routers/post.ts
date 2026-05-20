import { z } from "zod";
import { db } from "@repo/db";
import { router, procedure } from "../trpc";
import { requireAuth } from "../middlewares/auth";

export const postRouter = router({
  list: procedure.query(async () => {
    return db.selectFrom("post").selectAll().execute();
  }),

  byId: procedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ input }) => {
      return db
        .selectFrom("post")
        .selectAll()
        .where("id", "=", input.id)
        .executeTakeFirst();
    }),

  create: procedure
    .use(requireAuth)
    .input(z.object({ title: z.string().min(1), content: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return db
        .insertInto("post")
        .values({
          title: input.title,
          content: input.content,
          author_id: ctx.user.id,
        })
        .returningAll()
        .executeTakeFirst();
    }),
});
