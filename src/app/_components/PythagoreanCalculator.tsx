"use client";

import { useState } from "react";
import RootNumber from "./RootNumber";
import LifePath from "./LifePath";

type Quadrant = {
  left: number;
  right: number;
};

type OutsideQuadrant = Quadrant & {
  sum: number;
};

type InvertedTriangle = {
  topLeftQuadrant: Quadrant;
  topRightQuadrant: Quadrant;
  centerQuadrant: Quadrant;
  root: number;
};

export type PythagoreanTriangle = {
  invertedTriangle: InvertedTriangle;
  leftOutsideQuadrant: OutsideQuadrant;
  rightOutsideQuadrant: OutsideQuadrant;
  bottomOutsideQuadrant: OutsideQuadrant;
};

const customSum = ({ left, right }: Quadrant): number => {
  if (left === 0 && right === 0) {
    return 5;
  }

  let sum_ab = left + right;

  if (sum_ab >= 10) {
    sum_ab = Math.floor(sum_ab / 10) + (sum_ab % 10);
  }

  return sum_ab === 0 ? 1 : sum_ab;
};

function calculatePythagoreanTriangle(date: string): PythagoreanTriangle {
  if (date.length !== 8) {
    throw new Error("Date must be 8 characters long");
  }

  const numbers = date.split("").map(Number);
  const topLeftQuadrant: Quadrant = {
    left: customSum({ left: numbers[0], right: numbers[1] }),
    right: customSum({ left: numbers[2], right: numbers[3] }),
  };

  const topRightQuadrant: Quadrant = {
    left: customSum({ left: numbers[4], right: numbers[5] }),
    right: customSum({ left: numbers[6], right: numbers[7] }),
  };

  const centerQuadrant: Quadrant = {
    left: customSum(topLeftQuadrant),
    right: customSum(topRightQuadrant),
  };

  const root = customSum(centerQuadrant);

  const leftOutsideQuadrant: OutsideQuadrant = {
    left: customSum({ left: topLeftQuadrant.left, right: centerQuadrant.left }),
    right: customSum({
      left: topLeftQuadrant.right,
      right: centerQuadrant.left,
    }),
    sum: 0,
  };

  leftOutsideQuadrant.sum = customSum(leftOutsideQuadrant);

  const rightOutsideQuadrant: OutsideQuadrant = {
    left: customSum({
      left: topRightQuadrant.left,
      right: centerQuadrant.right,
    }),
    right: customSum({
      left: topRightQuadrant.right,
      right: centerQuadrant.right,
    }),
    sum: 0,
  };

  rightOutsideQuadrant.sum = customSum(rightOutsideQuadrant);

  const bottomOutsideQuadrant: OutsideQuadrant = {
    left: customSum({ left: centerQuadrant.right, right: root }),
    right: customSum({ left: centerQuadrant.left, right: root }),
    sum: 0,
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

export default function PythagoreanCalculator() {
  const [date, setDate] = useState("");
  const [triangle, setTriangle] = useState<PythagoreanTriangle | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const calculatedTriangle = calculatePythagoreanTriangle(date);
    setTriangle(calculatedTriangle);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Enter date (DDMMYYYY)"
            pattern="\d{8}"
            required
            className="flex-grow rounded border px-4 py-2"
          />
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Calculate
          </button>
        </div>
      </form>

      {triangle && (
        <div className="flex flex-col">
          <div className="relative flex flex-col items-center">
            <div className="mb-2 flex justify-center">
              <div className="m-1 flex h-8 w-12 items-center justify-center border">
                {date.slice(0, 2)}
              </div>
              <div className="m-1 flex h-8 w-12 items-center justify-center border">
                {date.slice(2, 4)}
              </div>
              <div className="m-1 flex h-8 w-12 items-center justify-center border">
                {date.slice(4, 8)}
              </div>
            </div>
            <div className="mb-2 flex justify-center">
              <div className="m-1 flex h-8 w-8 items-center justify-center border">
                {triangle.invertedTriangle.topLeftQuadrant.left}
              </div>
              <div className="m-1 flex h-8 w-8 items-center justify-center border">
                {triangle.invertedTriangle.topLeftQuadrant.right}
              </div>
              <div className="m-1 flex h-8 w-8 items-center justify-center border">
                {triangle.invertedTriangle.topRightQuadrant.left}
              </div>
              <div className="m-1 flex h-8 w-8 items-center justify-center border">
                {triangle.invertedTriangle.topRightQuadrant.right}
              </div>
            </div>
            <div className="mb-2 flex justify-center">
              <div className="m-1 flex h-8 w-8 items-center justify-center border">
                {triangle.invertedTriangle.centerQuadrant.left}
              </div>
              <div className="m-1 flex h-8 w-8 items-center justify-center border">
                {triangle.invertedTriangle.centerQuadrant.right}
              </div>
            </div>
            <div>
              <div className="mb-4 flex items-center justify-center gap-4">
                <div className="flex items-center justify-center">
                  <div className="m-1 flex h-8 w-8 items-center justify-center border">
                    {triangle.leftOutsideQuadrant.sum}
                  </div>
                  =
                  <div className="m-1 flex h-8 w-8 items-center justify-center border">
                    {triangle.leftOutsideQuadrant.left}
                  </div>
                  <div className="m-1 flex h-8 w-8 items-center justify-center border">
                    {triangle.leftOutsideQuadrant.right}
                  </div>
                </div>
                <div className="m-1 flex h-8 w-8 items-center justify-center border">
                  {triangle.invertedTriangle.root}
                </div>
                <div className="flex items-center justify-center">
                  <div className="m-1 flex h-8 w-8 items-center justify-center border">
                    {triangle.rightOutsideQuadrant.left}
                  </div>
                  <div className="m-1 flex h-8 w-8 items-center justify-center border">
                    {triangle.rightOutsideQuadrant.right}
                  </div>
                  =
                  <div className="m-1 flex h-8 w-8 items-center justify-center border">
                    {triangle.rightOutsideQuadrant.sum}
                  </div>
                </div>
              </div>
            </div>
            {/* Draw a line across the bottom of the triangle */}
            <div className="w- border-b-2 border-b-gray-400"></div>
            <div className="flex flex-col items-center justify-center">
              <div className="flex justify-center">
                <div className="m-1 flex h-8 w-8 items-center justify-center border">
                  {triangle.bottomOutsideQuadrant.left}
                </div>
                <div className="m-1 flex h-8 w-8 items-center justify-center border">
                  {triangle.bottomOutsideQuadrant.right}
                </div>
              </div>

              <div className="m-1 flex h-8 w-8 items-center justify-center border">
                {triangle.bottomOutsideQuadrant.sum}
              </div>
            </div>
          </div>
          <RootNumber root={triangle.invertedTriangle.root} />
          <LifePath triangle={triangle} />
        </div>
      )}
    </>
  );
}
