"use client";

import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { type PythagoreanTriangle } from "./PythagoreanCalculator";
import { findMissingElement, findElementByNumber } from "~/lib/elements";
import { useEffect, useMemo, useState } from "react";
import { api } from "~/trpc/react";
import Pill from "~/components/ui/pill";
import { type TRootNumber } from "~/types";

const HealthAnalysis = ({ triangle }: { triangle: PythagoreanTriangle }) => {
  const [healthAnalysis, setHealthAnalysis] = useState<Array<string | null>>(
    [],
  );

  const missingElement = useMemo(() => {
    const elements = findMissingElement([
      triangle.invertedTriangle.centerQuadrant.left as TRootNumber,
      triangle.invertedTriangle.centerQuadrant.right as TRootNumber,
      triangle.invertedTriangle.root as TRootNumber,
      triangle.bottomOutsideQuadrant.left as TRootNumber,
      triangle.bottomOutsideQuadrant.right as TRootNumber,
    ]);

    if (elements.length === 0) {
      return [
        findElementByNumber(
          triangle.invertedTriangle.topLeftQuadrant.left as TRootNumber,
        ),
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
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Health Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {healthAnalysis.map((sickness, index) => (
            <Pill key={index}>{sickness}</Pill>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthAnalysis;
