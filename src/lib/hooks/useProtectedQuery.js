import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "@/lib/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import getProtectedData from "@/services/getProtectedData";
import ACCESS_TIME from "@/config/accessTime";
import useNotif from "@/lib/hooks/useNotif";

export default function useProtectedQuery(endpoint, enabled = true, mockData) {
  const notifs = useNotif();
  const navigate = useNavigate();
  const { setAccessToken, accessToken } = useAuth();
  const [protectedData, setProtectedData] = useState(null);

  const { data, isLoading, error } = useQuery({
    queryKey: [`GET ${endpoint}`],
    queryFn: async () => getProtectedData(endpoint, accessToken),
    staleTime: ACCESS_TIME,
    retry: false,
    enabled,
  });

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
    const { accessToken: newAccessToken, ...rest } = data;
    if (newAccessToken) setAccessToken(newAccessToken);
    setProtectedData(rest);
  }, [data]);

  if (enabled === false && mockData)
    return { isLoading: false, protectedData: mockData };

  return { isLoading, protectedData };
}
