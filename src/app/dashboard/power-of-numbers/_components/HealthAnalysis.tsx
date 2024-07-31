"use client";

import { findMissingElement, findElementByNumber } from "~/lib/elements";
import { useEffect, useMemo, useState } from "react";
import { api } from "~/trpc/react";
import Pill from "~/components/ui/pill";
import type { TPythagoreanTriangle } from "~/types";

const HealthAnalysis = ({ triangle }: { triangle: TPythagoreanTriangle }) => {
  const [healthAnalysis, setHealthAnalysis] = useState<Array<string | null>>(
    [],
  );

  const missingElement = useMemo(() => {
    const elements = findMissingElement([
      triangle.invertedTriangle.centerQuadrant.left,
      triangle.invertedTriangle.centerQuadrant.right,
      triangle.invertedTriangle.root,
      triangle.bottomOutsideQuadrant.left,
      triangle.bottomOutsideQuadrant.right,
    ]);

    if (elements.length === 0) {
      return [
        findElementByNumber(triangle.invertedTriangle.topLeftQuadrant.left),
      ];
    }

    return elements;
  }, [triangle]);

  const healthAnalysisQuery = api.powerOfNumber.healthAnalysis.useQuery(
    {
      elementArr: missingElement,
    },
    { enabled: false },
  );

  useEffect(() => {
    // Trigger the query when the 'root' prop changes
    void healthAnalysisQuery.refetch();
  }, [healthAnalysisQuery]);

  useEffect(() => {
    // Update local state when the query data changes
    if (healthAnalysisQuery.data) {
      setHealthAnalysis(healthAnalysisQuery.data);
    }
  }, [healthAnalysisQuery.data]);

  return (
    <div className="flex flex-wrap gap-2">
      {healthAnalysis.map((sickness, index) => (
        <Pill key={index}>{sickness}</Pill>
      ))}
    </div>
  );
};

export default HealthAnalysis;
