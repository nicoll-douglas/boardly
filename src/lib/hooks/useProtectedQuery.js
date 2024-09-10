import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import getProtectedData from "@/services/getProtectedData";
import ACCESS_TIME from "@/config/accessTime";
import useNotif from "@/lib/hooks/useNotif";
import FETCH_ENABLED from "@/config/dataFetching";

export default function useProtectedQuery(endpoint) {
  const notifs = useNotif();

  const { data, isLoading, error } = useQuery({
    queryKey: [`GET ${endpoint}`],
    queryFn: async () => getProtectedData(endpoint),
    staleTime: ACCESS_TIME,
    retry: false,
    enabled: FETCH_ENABLED,
  });

  useEffect(() => {
    if (!error) return;
    if (error.status === 0) notifs.networkError();
  }, [error]);

  return { isLoading, data, error };
}
