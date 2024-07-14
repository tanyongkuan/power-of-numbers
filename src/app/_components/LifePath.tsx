"use client";

import React, { useCallback, useMemo } from "react";
import { type PythagoreanTriangle } from "./PythagoreanCalculator";
import { api } from "~/trpc/react";

import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
// import { Badge } from "@/components/ui/badge";
// import { ScrollArea } from "@/components/ui/scroll-area";

type QuadrantPair = {
  primary: number;
  secondary: number;
};

const calculateQuadrantPairs = (
  triangle: PythagoreanTriangle,
): QuadrantPair[] => {
  const {
    invertedTriangle,
    leftOutsideQuadrant,
    rightOutsideQuadrant,
    bottomOutsideQuadrant,
  } = triangle;

  return [
    {
      primary: invertedTriangle.topLeftQuadrant.left,
      secondary: invertedTriangle.topLeftQuadrant.right,
    },
    {
      primary: invertedTriangle.topRightQuadrant.left,
      secondary: invertedTriangle.topRightQuadrant.right,
    },
    {
      primary: invertedTriangle.centerQuadrant.left,
      secondary: invertedTriangle.centerQuadrant.right,
    },
    {
      primary: leftOutsideQuadrant.left,
      secondary: leftOutsideQuadrant.right,
    },
    {
      primary: rightOutsideQuadrant.left,
      secondary: rightOutsideQuadrant.right,
    },
    {
      primary: bottomOutsideQuadrant.left,
      secondary: bottomOutsideQuadrant.right,
    },
    {
      primary: invertedTriangle.topRightQuadrant.right,
      secondary: invertedTriangle.centerQuadrant.right,
    },
    //TODO: Side number
    // {
    //   primary: invertedTriangle.centerQuadrant.right,
    //   secondary: 0,
    // },
    {
      primary: invertedTriangle.centerQuadrant.right,
      secondary: invertedTriangle.root,
    },
    {
      primary: invertedTriangle.root,
      secondary: bottomOutsideQuadrant.left,
    },
  ];
};

const LifePath = ({ triangle }: { triangle: PythagoreanTriangle }) => {
  const quadrantPairs = useMemo(
    () => calculateQuadrantPairs(triangle),
    [triangle],
  );

  const lifePathAnalysis = api.useQueries((t) =>
    quadrantPairs.map(({ primary, secondary }) => {
      return t.powerOfNumber.lifePath({ primary, secondary });
      // if (secondary !== 0)
      //   return t.powerOfNumber.lifePath({ primary, secondary });
      // else return t.powerOfNumber.sideRootNumber({ primary });
    }),
  );

  useCallback(() => {
    // Trigger the query when the 'root' prop changes
    lifePathAnalysis.forEach((result) => result.refetch());
  }, [lifePathAnalysis]);

  if (lifePathAnalysis.some((result) => result.isLoading)) {
    return <div>Loading...</div>;
  }

  if (lifePathAnalysis.some((result) => result.isError)) {
    return (
      <div>
        Error:{" "}
        {lifePathAnalysis.find((result) => result.isError)?.error?.message}
      </div>
    );
  }

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Life Path Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        {/* <ScrollArea className="h-[300px]"> */}
        <ul>
          {lifePathAnalysis.map((results, index) => (
            <li key={index} className="mb-2">
              {results.data?.mainCategoryRelation ? (
                <strong>{`${results.data?.mainCategoryRelation?.name} - ${results.data?.secondaryCategoryRelation?.name}`}</strong>
              ) : (
                <strong>Character</strong>
              )}
              : {results.data?.description}
              {index < lifePathAnalysis.length - 1 && (
                <Separator className="my-2" />
              )}
            </li>
          ))}
        </ul>
        {/* </ScrollArea> */}
      </CardContent>
    </Card>
  );
};

export default LifePath;
