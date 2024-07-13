import { useEffect, useState } from "react";
import { api } from "~/trpc/react";

export const fetchDataForPair = async (primary: number, secondary: number) => {
  // Replace `queryKey` with your actual trpc query
  return api.powerOfNumber.lifePath.useQuery({
    primary,
    secondary,
  });
};

export const useBatchTrpcQuery = (quadrantPairs: QuadrantPair[]) => {
  const [data, setData] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log("calling promises");
        const results = await Promise.all(
          quadrantPairs.map((pair) =>
            fetchDataForPair(pair.primary, pair.secondary),
          ),
        );
        setData(results);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [quadrantPairs]);

  return { data, loading, error };
};
