"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { type TPythagoreanTriangle } from "~/types";
import { api } from "~/trpc/react";

import { Separator } from "~/components/ui/separator";
import { type TSideRootNumber } from "~/server/db/schema";

type QuadrantPair = {
  primary: number;
  secondary: number;
};

const calculateQuadrantPairs = (
  triangle: TPythagoreanTriangle,
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

const LifePath = ({ triangle }: { triangle: TPythagoreanTriangle }) => {
  const [lifePathAnalysis, setLifePathAnalysis] = useState<TSideRootNumber>();

  const quadrantPairs = useMemo(
    () => calculateQuadrantPairs(triangle),
    [triangle],
  );

  const lifePathQuery = api.useQueries((t) =>
    quadrantPairs.map(({ primary, secondary }) =>
      t.powerOfNumber.lifePath({ primary, secondary }),
    ),
  );

  const sideNumberAnalysis = api.powerOfNumber.sideRootNumber.useQuery(
    {
      primary: triangle.invertedTriangle.centerQuadrant.right,
    },
    { enabled: false },
  );

  useCallback(() => {
    // Trigger the query when the 'root' prop changes
    lifePathQuery.forEach((result) => {
      try {
        void result.refetch();
      } catch (err) {}
    });
  }, [lifePathQuery]);

  useEffect(() => {
    // Trigger the query when the 'root' prop changes
    void sideNumberAnalysis.refetch();
  }, [sideNumberAnalysis]);

  useEffect(() => {
    // Update local state when the query data changes
    if (sideNumberAnalysis.data) {
      setLifePathAnalysis(sideNumberAnalysis.data);
    }
  }, [sideNumberAnalysis.data]);

  if (lifePathQuery.some((result) => result.isLoading)) {
    return <div>Loading...</div>;
  }

  if (lifePathQuery.some((result) => result.isError)) {
    return (
      <div>
        Error: {lifePathQuery.find((result) => result.isError)?.error?.message}
      </div>
    );
  }

  return (
    <ul>
      {lifePathQuery.map((results, index) => (
        <li key={index} className="mb-2">
          {results.data?.mainCategoryRelation ? (
            <strong>{`${results.data?.mainCategoryRelation?.name} - ${results.data?.secondaryCategoryRelation?.name}`}</strong>
          ) : (
            <strong>Character</strong>
          )}
          : {results.data?.description}
          {index === 6 && (
            <>
              <Separator className="my-2" />
              <strong>Character : </strong>
              <span>{lifePathAnalysis?.description}</span>
            </>
          )}
          {index < lifePathQuery.length - 1 && <Separator className="my-2" />}
        </li>
      ))}
    </ul>
  );
};

export default LifePath;
