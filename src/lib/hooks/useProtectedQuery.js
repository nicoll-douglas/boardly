import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "@/lib/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import getProtectedData from "@/services/getProtectedData";
import ACCESS_TIME from "@/config/accessTime";
import useNotif from "@/lib/hooks/useNotif";
import FETCH_ENABLED from "@/config/dataFetching";

export default function useProtectedQuery(endpoint, mockData) {
  const notifs = useNotif();
  const navigate = useNavigate();
  const { setAccessToken, accessToken } = useAuth();
  const [protectedData, setProtectedData] = useState(null);

  const { data, isLoading, error } = useQuery({
    queryKey: [`GET ${endpoint}`],
    queryFn: async () => getProtectedData(endpoint, accessToken),
    staleTime: ACCESS_TIME,
    retry: false,
    enabled: FETCH_ENABLED,
  });

  useEffect(() => {
    if (!error) return;
    switch (error.status) {
      case 404:
        setTimeout(navigate, 1250, "/not-found");
        break;
      case 401:
        notifs.unauthorized();
        setTimeout(navigate, 250, "/");
        break;
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
    const { accessToken: newAccessToken, ...rest } = data;
    if (newAccessToken) setAccessToken(newAccessToken);
    setProtectedData(rest);
  }, [data]);

  if (!FETCH_ENABLED) return { isLoading: false, protectedData: mockData };

  return { isLoading, protectedData };
}
