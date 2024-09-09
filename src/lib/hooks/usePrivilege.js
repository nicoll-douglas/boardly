import refresh from "@/services/refresh";
import FETCH_ENABLED from "@/config/dataFetching";
import { useQuery } from "@tanstack/react-query";
import useNotif from "@/lib/hooks/useNotif";
import { useEffect } from "react";
import useAuth from "@/lib/hooks/useAuth";

export default function usePrivilege() {
  const notifs = useNotif();
  const { setAccessToken } = useAuth();

  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ["GET /refresh"],
    queryFn: async () => refresh(),
    staleTime: 0,
    retry: false,
    enabled: FETCH_ENABLED,
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

  return { elevated: isSuccess, isLoading };
}
