import type {
  TOutsideQuadrant,
  TPythagoreanTriangle,
  TQuadrant,
  TRootNumber,
} from "~/types";
import { format } from "date-fns";

const customSum = ({
  left,
  right,
}: {
  left: number;
  right: number;
}): TRootNumber => {
  if (left === 0 && right === 0) {
    return 5;
  }

  let sum_ab = left + right;

  if (sum_ab >= 10) {
    sum_ab = Math.floor(sum_ab / 10) + (sum_ab % 10);
  }

  return sum_ab === 0 ? 1 : sum_ab;
};

export function calculatePythagoreanTriangle(date: Date): TPythagoreanTriangle {
  const formattedDate = format(date, "ddMMyyyy");

  const numbers = formattedDate.split("").map((char) => parseInt(char, 10));
  if (
    numbers[0] === undefined ||
    numbers[1] === undefined ||
    numbers[2] === undefined ||
    numbers[3] === undefined ||
    numbers[4] === undefined ||
    numbers[5] === undefined ||
    numbers[6] === undefined ||
    numbers[7] === undefined
  ) {
    throw "";
  }
  const topLeftQuadrant: TQuadrant = {
    left: customSum({ left: numbers[0], right: numbers[1] }),
    right: customSum({ left: numbers[2], right: numbers[3] }),
  };

  const topRightQuadrant: TQuadrant = {
    left: customSum({ left: numbers[4], right: numbers[5] }),
    right: customSum({ left: numbers[6], right: numbers[7] }),
  };

  const centerQuadrant: TQuadrant = {
    left: customSum(topLeftQuadrant),
    right: customSum(topRightQuadrant),
  };

  const root = customSum(centerQuadrant);

  const leftOutsideQuadrant: TOutsideQuadrant = {
    left: customSum({ left: topLeftQuadrant.left, right: centerQuadrant.left }),
    right: customSum({
      left: topLeftQuadrant.right,
      right: centerQuadrant.left,
    }),
    sum: 0 as TRootNumber,
  };

  leftOutsideQuadrant.sum = customSum(leftOutsideQuadrant);

  const rightOutsideQuadrant: TOutsideQuadrant = {
    left: customSum({
      left: topRightQuadrant.left,
      right: centerQuadrant.right,
    }),
    right: customSum({
      left: topRightQuadrant.right,
      right: centerQuadrant.right,
    }),
    sum: 0 as TRootNumber,
  };

  rightOutsideQuadrant.sum = customSum(rightOutsideQuadrant);

  const bottomOutsideQuadrant: TOutsideQuadrant = {
    left: customSum({ left: centerQuadrant.right, right: root }),
    right: customSum({ left: centerQuadrant.left, right: root }),
    sum: 0 as TRootNumber,
  };

  bottomOutsideQuadrant.sum = customSum(bottomOutsideQuadrant);

  return {
    invertedTriangle: {
      topLeftQuadrant,
      topRightQuadrant,
      centerQuadrant,
      root,
    },
    leftOutsideQuadrant,
    rightOutsideQuadrant,
    bottomOutsideQuadrant,
  };
}
