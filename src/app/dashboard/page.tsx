"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">
        Welcome to Your Self-Discovery Dashboard
      </h2>
      <p>Select an analysis from the sidebar to get started.</p>

      <Card>
        <CardHeader>
          <CardTitle>Quick Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Here you can add a summary or quick stats of the user&apos;s
            analysis.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
