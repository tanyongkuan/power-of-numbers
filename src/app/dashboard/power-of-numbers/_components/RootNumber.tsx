"use client";

import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { type TRootNumberAnalysis } from "~/types";

export default function RootNumber({ root }: { root: number }) {
  const [data, setData] = useState<TRootNumberAnalysis>();

  const rootNumberQuery = api.powerOfNumber.rootNumber.useQuery(
    { root },
    { enabled: false },
  );

  useEffect(() => {
    // Trigger the query when the 'root' prop changes
    void rootNumberQuery.refetch();
  }, [rootNumberQuery]);

  useEffect(() => {
    // Update local state when the query data changes
    if (rootNumberQuery.data) {
      setData(rootNumberQuery.data);
    }
  }, [rootNumberQuery.data]);

  if (rootNumberQuery.isLoading) return <div>Loading...</div>;
  if (rootNumberQuery.error)
    return <div>Error: {rootNumberQuery.error.message}</div>;

  return (
    <>
      {data && (
        <div className="flex flex-col gap-4">
          <p>{data.positive}</p>
          <div>
            <span className="font-bold">Negative Side:</span>
            <p>{data.negative}</p>
          </div>
          <p className="font-bold">{data.summary}</p>
        </div>
      )}
    </>
  );
}
