import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { rootNumbers, userInformation, users } from "~/server/db/schema";

// export type Enumerate<
//   N extends number,
//   Acc extends number[] = [],
// > = Acc["length"] extends N
//   ? Acc[number]
//   : Enumerate<N, [...Acc, Acc["length"]]>;

// export type IntRange<F extends number, T extends number> = Exclude<
//   Enumerate<T>,
//   Enumerate<F>
// >;

// export type TRootNumber = IntRange<1, 10>;

export const Element = z.enum(["METAL", "WOOD", "WATER", "FIRE", "EARTH"]);
export type TElement = z.infer<typeof Element>;

// export type Quadrant = {
//   left: TRootNumber;
//   right: TRootNumber;
// };

// export type OutsideQuadrant = Quadrant & {
//   sum: TRootNumber;
// };

// export type InvertedTriangle = {
//   topLeftQuadrant: Quadrant;
//   topRightQuadrant: Quadrant;
//   centerQuadrant: Quadrant;
//   root: TRootNumber;
// };

// export type PythagoreanTriangle = {
//   invertedTriangle: InvertedTriangle;
//   leftOutsideQuadrant: OutsideQuadrant;
//   rightOutsideQuadrant: OutsideQuadrant;
//   bottomOutsideQuadrant: OutsideQuadrant;
// };

// Define TRootNumber as a Zod schema
const RootNumber = z.number().int().min(1).max(10);

// Define Quadrant as a Zod schema
const Quadrant = z.object({
  left: RootNumber,
  right: RootNumber,
});

// Define OutsideQuadrant as a Zod schema
const OutsideQuadrant = Quadrant.extend({
  sum: RootNumber,
});

// Define InvertedTriangle as a Zod schema
const InvertedTriangle = z.object({
  topLeftQuadrant: Quadrant,
  topRightQuadrant: Quadrant,
  centerQuadrant: Quadrant,
  root: RootNumber,
});

// Define PythagoreanTriangle as a Zod schema
export const PythagoreanTriangle = z.object({
  invertedTriangle: InvertedTriangle,
  leftOutsideQuadrant: OutsideQuadrant,
  rightOutsideQuadrant: OutsideQuadrant,
  bottomOutsideQuadrant: OutsideQuadrant,
});

export type TRootNumber = z.infer<typeof RootNumber>;
export type TQuadrant = z.infer<typeof Quadrant>;
export type TOutsideQuadrant = z.infer<typeof OutsideQuadrant>;
export type TInvertedTriangle = z.infer<typeof InvertedTriangle>;
export type TPythagoreanTriangle = z.infer<typeof PythagoreanTriangle>;

const userSchema = createSelectSchema(users);
const userInfoSchema = createSelectSchema(userInformation).extend({
  pythagoreanTriangle: PythagoreanTriangle,
});

export type TUser = z.infer<typeof userSchema>;
export type TUserInfo = TUser & {
  userInformation: z.infer<typeof userInfoSchema>;
};

export const RootNumberAnalysis = createInsertSchema(rootNumbers);
export type TRootNumberAnalysis = z.infer<typeof RootNumberAnalysis>;
