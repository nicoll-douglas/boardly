import refresh from "@/services/refresh";
import { useQuery } from "@tanstack/react-query";
import useNotif from "@/hooks/useNotif";
import { useEffect } from "react";
import config from "@/config";

export default function usePrivilege() {
  const notifs = useNotif();
  const privilegeEnabled = config.fetch.privilegeEnabled;

  const { data, isLoading, error } = useQuery({
    queryKey: ["GET /refresh"],
    queryFn: async () => refresh(),
    staleTime: config.auth.accessTime,
    retry: false,
    enabled: privilegeEnabled,
  });

  useEffect(() => {
    if (!data) return;
    switch (data.status) {
      case 500:
        notifs.serverError();
        break;
      case 429:
        notifs.tooMany();
        break;
    }
  }, [data]);

  useEffect(() => {
    if (!error) return;
    notifs.networkError();
  }, [error]);

  if (!privilegeEnabled) return { elevated: false, isLoading: false };

  return { elevated: data?.ok, isLoading };
}
