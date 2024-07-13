"use client";

import React from "react";
import { type PythagoreanTriangle } from "./PythagoreanCalculator";
import { useBatchTrpcQuery } from "~/hooks/lifePathHooks";

type QuadrantPair = {
  primary: number;
  secondary: number;
  label: string;
};

const LifePath = ({ triangle }: { triangle: PythagoreanTriangle }) => {
  const {
    invertedTriangle,
    leftOutsideQuadrant,
    rightOutsideQuadrant,
    bottomOutsideQuadrant,
  } = triangle;

  const quadrantPairs: QuadrantPair[] = React.useMemo(() => {
    console.log(triangle);
    return [
      {
        primary: invertedTriangle.topLeftQuadrant.left,
        secondary: invertedTriangle.topLeftQuadrant.right,
        label: "Top Left",
      },
      {
        primary: invertedTriangle.topRightQuadrant.left,
        secondary: invertedTriangle.topRightQuadrant.right,
        label: "Top Right",
      },
      {
        primary: invertedTriangle.centerQuadrant.left,
        secondary: invertedTriangle.centerQuadrant.right,
        label: "Center",
      },
      {
        primary: leftOutsideQuadrant.left,
        secondary: leftOutsideQuadrant.right,
        label: "Left Outside",
      },
      {
        primary: rightOutsideQuadrant.left,
        secondary: rightOutsideQuadrant.right,
        label: "Right Outside",
      },
      {
        primary: bottomOutsideQuadrant.left,
        secondary: bottomOutsideQuadrant.right,
        label: "Bottom Outside",
      },
      {
        primary: invertedTriangle.topRightQuadrant.right,
        secondary: invertedTriangle.centerQuadrant.right,
        label: "Mother Quadrant",
      },
      {
        primary: invertedTriangle.centerQuadrant.right,
        secondary: invertedTriangle.root,
        label: "TODO: Read Chapter 11",
      },
      {
        primary: invertedTriangle.root,
        secondary: bottomOutsideQuadrant.left,
        label: "Root to Bottom Left",
      },
    ];
  }, [triangle]);

  // const { data, loading, error } = useBatchTrpcQuery(quadrantPairs);
  const data = [],
    loading = false,
    error = "";

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data.map((result, index) => (
        <div key={index}>
          <h3>{quadrantPairs[index].label}</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
};

export default LifePath;
