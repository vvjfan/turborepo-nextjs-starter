import { router, procedure } from "../trpc";
import { requireAuth } from "../middlewares/auth";

export const authRouter = router({
  me: procedure.use(requireAuth).query(({ ctx }) => {
    return { user: ctx.user, session: ctx.session };
  }),
});
