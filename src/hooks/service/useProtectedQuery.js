import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProtectedData } from "@/services";
import useNotif from "../ui/useNotif";
import config from "@/config";

export default function useProtectedQuery(endpoint) {
  const notifs = useNotif();

  const { data, isLoading, error } = useQuery({
    queryKey: [`GET ${endpoint}`],
    queryFn: async () => getProtectedData(endpoint),
    staleTime: config.auth.accessTime,
    retry: false,
    enabled: config.fetch.queriesEnabled,
  });

  useEffect(() => {
    if (!error) return;
    if (error.status === 0) notifs.networkError();
  }, [error]);

  return { isLoading, data, error };
}
