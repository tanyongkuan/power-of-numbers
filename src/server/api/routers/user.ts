import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { calculatePythagoreanTriangle } from "~/lib/pythagoreanTriangle";
import { userInformation, users } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import type { TUserInfo, TPythagoreanTriangle } from "~/types";
import { format } from "date-fns";

export const userRouter = createTRPCRouter({
  //TODO: To fix zod to accept Date
  updateBirthday: protectedProcedure
    .input(z.object({ birthday: z.instanceof(Date) }))
    .mutation(async ({ input, ctx }) => {
      const { birthday } = input;
      const pythagoreanTriangle = calculatePythagoreanTriangle(birthday);

      await ctx.db.insert(userInformation).values({
        userId: ctx.session.user.id,
        birthday: format(birthday, "dd/MM/yyyy"),
        pythagoreanTriangle: JSON.stringify(pythagoreanTriangle),
      });

      return { success: true };
    }),
  getPythagoreanTriangle: protectedProcedure.query(async ({ ctx }) => {
    const userInfo = await ctx.db.query.userInformation.findFirst({
      where: eq(userInformation.userId, ctx.session.user.id),
    });

    if (userInfo) {
      return {
        pythagoreanTriangle:
          userInfo.pythagoreanTriangle as TPythagoreanTriangle,
      };
    }

    return {};
  }),
  getUserInfo: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    // try {
    //   const userInfoFromRedis = await redis.get(`user:${userId}`);
    //   if (userInfoFromRedis) {
    //     //TODO: Get type/interface
    //     return { data: JSON.parse(userInfoFromRedis) };
    //   }
    // } catch (error) {
    //   console.error("Error fetching from Redis:", error);
    // }

    const response = await ctx.db.query.users.findFirst({
      where: eq(users.id, userId),
      with: {
        userInformation: true,
      },
    });
    // try {
    //   await redis.set(`user:${userId}`, JSON.stringify(response), "EX", 86400);
    // } catch (error) {
    //   console.error("Error fetching from Redis:", error);
    // } finally {
    //   await redis.quit();
    // }

    return {
      data: response as TUserInfo,
    };
  }),
});
