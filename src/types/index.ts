import { z } from "zod";

export type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

export type IntRange<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

export type TRootNumber = IntRange<1, 10>;

export const Element = z.enum(["METAL", "WOOD", "WATER", "FIRE", "EARTH"]);
export type TElement = z.infer<typeof Element>;
