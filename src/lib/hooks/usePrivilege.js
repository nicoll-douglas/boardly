import refresh from "@/services/refresh";
import { PRIVILEGE_ENABLED } from "@/config/dataFetching";
import { useQuery } from "@tanstack/react-query";
import useNotif from "@/lib/hooks/useNotif";
import { useEffect } from "react";
import ACCESS_TIME from "@/config/accessTime";

export default function usePrivilege() {
  const notifs = useNotif();

  const { data, isLoading } = useQuery({
    queryKey: ["GET /refresh"],
    queryFn: async () => refresh(),
    staleTime: ACCESS_TIME,
    retry: false,
    enabled: PRIVILEGE_ENABLED,
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
      case 0:
        notifs.networkError();
    }
  }, [data]);

  if (!PRIVILEGE_ENABLED) return { elevated: false, isLoading: false };

  return { elevated: data?.ok, isLoading };
}
