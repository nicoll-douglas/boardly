import { useEffect } from "react";
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

  const { data, isLoading, error } = useQuery({
    queryKey: [`GET ${endpoint}`],
    queryFn: async () => getProtectedData(endpoint, accessToken),
    staleTime: ACCESS_TIME,
    retry: false,
    enabled: FETCH_ENABLED,
  });
  const notFound = error?.status === 404;

  useEffect(() => {
    if (!error) return;
    switch (error.status) {
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
    const { accessToken: newAccessToken } = data;
    if (newAccessToken) setAccessToken(newAccessToken);
  }, [data]);

  if (!FETCH_ENABLED)
    return {
      isLoading: false,
      data: mockData,
      notFound: false,
    };

  return { isLoading, data, notFound };
}
