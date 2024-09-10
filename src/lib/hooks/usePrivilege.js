import refresh from "@/services/refresh";
import { PRIVILEGE_ENABLED } from "@/config/dataFetching";
import { useQuery } from "@tanstack/react-query";
import useNotif from "@/lib/hooks/useNotif";
import { useEffect } from "react";
import useAuth from "@/lib/hooks/useAuth";
import ACCESS_TIME from "@/config/accessTime";

export default function usePrivilege() {
  const notifs = useNotif();
  const { setAccessToken } = useAuth();

  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ["GET /refresh"],
    queryFn: async () => refresh(),
    staleTime: ACCESS_TIME,
    retry: false,
    enabled: PRIVILEGE_ENABLED,
  });

  useEffect(() => {
    if (!error) return;
    switch (error.status) {
      case 500:
        notifs.serverError();
        break;
      case 429:
        notifs.tooMany();
        break;
      case 0:
        notifs.networkError();
    }
  }, [error]);

  useEffect(() => {
    if (!data) return;
    setAccessToken(data.accessToken);
  }, [data]);

  if (!PRIVILEGE_ENABLED) return { elevated: false, isLoading: false };

  return { elevated: isSuccess, isLoading };
}
