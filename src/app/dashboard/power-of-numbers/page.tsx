"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useUser } from "./../_components/UserContext";
import RootNumber from "./_components/RootNumber";
import LifePath from "./_components/LifePath";
import HealthAnalysis from "./_components/HealthAnalysis";
import { redirect } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useState } from "react";

export default function PowerOfNumbersDashboard() {
  const user = useUser();
  const [selectedAnalysis, setSelectedAnalysis] = useState("root");

  if (!user || !user.userInfo) {
    return "";
  }

  const { userInfo } = user;

  if (userInfo.userInformation === null) {
    redirect("/onboarding");
  }
  const { pythagoreanTriangle } = userInfo.userInformation;

  return (
    <>
      <div className="flex flex-col gap-4">
        <Select
          defaultValue={selectedAnalysis}
          onValueChange={(value) => setSelectedAnalysis(value)}
        >
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Analysis</SelectLabel>
              <SelectItem value="root">Root Number Analysis</SelectItem>
              <SelectItem value="lifePath">Life Path Analysis</SelectItem>
              <SelectItem value="health">Potential Area of Sickness</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedAnalysis === "root" && (
                <span>
                  Root Number: {pythagoreanTriangle.invertedTriangle.root}
                </span>
              )}
              {selectedAnalysis === "lifePath" && (
                <span>Life Path Analysis</span>
              )}
              {selectedAnalysis === "health" && (
                <span>Potential Area of Sickness</span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {selectedAnalysis === "root" && (
              <RootNumber root={pythagoreanTriangle.invertedTriangle.root} />
            )}
            {selectedAnalysis === "lifePath" && (
              <LifePath triangle={pythagoreanTriangle} />
            )}
            {selectedAnalysis === "health" && (
              <HealthAnalysis triangle={pythagoreanTriangle} />
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
