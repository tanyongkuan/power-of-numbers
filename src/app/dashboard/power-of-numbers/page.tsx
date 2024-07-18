"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useUser } from "./../_components/UserContext";
import RootNumber from "./_components/RootNumber";
import LifePath from "./_components/LifePath";
import HealthAnalysis from "./_components/HealthAnalysis";

export default function PowerOfNumbersDashboard() {
  const user = useUser();

  if (!user || !user.userInfo) {
    return "";
  }

  const { userInfo } = user;
  const { pythagoreanTriangle } = userInfo.userInformation;

  return (
    <Tabs defaultValue="root">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="root">Root Number</TabsTrigger>
        <TabsTrigger value="life-path">Life Path</TabsTrigger>
        {/* <TabsTrigger value="sickness">Sickness</TabsTrigger> */}
      </TabsList>
      <TabsContent value="root">
        <Card>
          <CardHeader>
            <CardTitle>
              Root Number: {pythagoreanTriangle.invertedTriangle.root}
            </CardTitle>
            {/* <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription> */}
          </CardHeader>
          <CardContent className="space-y-2">
            <RootNumber root={pythagoreanTriangle.invertedTriangle.root} />
          </CardContent>
          {/* <CardFooter>
            <Button>Save changes</Button>
          </CardFooter> */}
        </Card>
      </TabsContent>
      <TabsContent value="life-path">
        <Card>
          <CardHeader>
            <CardTitle>Life Path Analysis</CardTitle>
            {/* <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription> */}
          </CardHeader>
          <CardContent className="space-y-2">
            <LifePath triangle={pythagoreanTriangle} />
          </CardContent>
          {/* <CardFooter>
            <Button>Save password</Button>
          </CardFooter> */}
        </Card>
      </TabsContent>
      <TabsContent value="sickness">
        <Card>
          <CardHeader>
            <CardTitle>Sickness</CardTitle>
            {/* <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription> */}
          </CardHeader>
          <CardContent className="space-y-2">
            <HealthAnalysis triangle={pythagoreanTriangle} />
          </CardContent>
          {/* <CardFooter>
            <Button>Save password</Button>
          </CardFooter> */}
        </Card>
      </TabsContent>
    </Tabs>
  );
}
