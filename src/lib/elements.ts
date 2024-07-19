import { Element, type TElement, type TRootNumber } from "~/types";

const ELEMENT_MAP: Record<TRootNumber, TElement> = {
  1: Element.Enum.METAL,
  2: Element.Enum.WATER,
  3: Element.Enum.FIRE,
  4: Element.Enum.WOOD,
  5: Element.Enum.EARTH,
  6: Element.Enum.METAL,
  7: Element.Enum.WATER,
  8: Element.Enum.FIRE,
  9: Element.Enum.WOOD,
};

export const findElementByNumber = (number: TRootNumber): TElement => {
  return ELEMENT_MAP[number] as TElement;
};

export const findMissingElement = (
  numbers: [TRootNumber, TRootNumber, TRootNumber, TRootNumber, TRootNumber],
): Array<TElement> => {
  if (numbers.some((n) => n < 1 || n > 9)) {
    throw new Error("All numbers must be between 1 and 9");
  }

  const presentElements = new Set(numbers.map((n) => ELEMENT_MAP[n]));

  if (presentElements.size === 5) {
    return []; // All elements are present
  }

  if (presentElements.size === 1) {
    // All numbers correspond to the same element
    return [ELEMENT_MAP[numbers[0]] as TElement];
  }

  return Object.values(Element.Enum).filter(
    (element) => !presentElements.has(element),
  );
};
