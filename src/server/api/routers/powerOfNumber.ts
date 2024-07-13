import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { rootNumbers, lifePaths } from "~/server/db/schema";
import { eq, and } from "drizzle-orm";

export const powerOfNumberRouter = createTRPCRouter({
  rootNumber: publicProcedure
    .input(z.object({ root: z.number() }))
    .query(({ input, ctx }) => {
      return ctx.db.query.rootNumbers.findFirst({
        where: eq(rootNumbers.number, input.root),
      });
    }),
  lifePath: publicProcedure
    .input(z.object({ primary: z.number(), secondary: z.number() }))
    .query(({ input, ctx }) => {
      return ctx.db.query.lifePaths.findFirst({
        where: and(
          eq(lifePaths.mainCategory, input.primary),
          eq(lifePaths.secondaryCategory, input.secondary),
        ),
      });
    }),
});
