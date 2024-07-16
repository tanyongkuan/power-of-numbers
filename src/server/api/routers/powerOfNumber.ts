import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import {
  rootNumbers,
  lifePaths,
  sideRootNumbers,
  healthAnalysis,
} from "~/server/db/schema";
import { eq, and, inArray } from "drizzle-orm";
import { Element } from "~/types";

export const powerOfNumberRouter = createTRPCRouter({
  rootNumber: publicProcedure
    .input(z.object({ root: z.number() }))
    .query(({ input, ctx }) => {
      return ctx.db.query.rootNumbers.findFirst({
        where: eq(rootNumbers.number, input.root),
      });
    }),
  sideRootNumber: publicProcedure
    .input(z.object({ primary: z.number() }))
    .query(({ input, ctx }) => {
      return ctx.db.query.sideRootNumbers.findFirst({
        where: eq(sideRootNumbers.number, input.primary),
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
        with: {
          mainCategoryRelation: {
            columns: {
              name: true,
            },
          },
          secondaryCategoryRelation: {
            columns: {
              name: true,
            },
          },
        },
      });
    }),
  healthAnalysis: publicProcedure
    .input(z.object({ elementArr: z.array(Element) }))
    .query(async ({ input, ctx }) => {
      const elements = input.elementArr;

      const results = await ctx.db
        .select({
          description: healthAnalysis.description,
        })
        .from(healthAnalysis)
        .where(inArray(healthAnalysis.element, elements));

      return results
        .map((item) => item.description)
        .join(";")
        .split(";");
    }),
});
