// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import RootNumber from "./power-of-numbers/_components/RootNumber";

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
            Here you can add a summary or quick stats of the user`&apos;`s
            analyses.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
