import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  networkError,
  serverError,
  tooMany,
  unauthorized,
  genericError,
} from "@/lib/constants/toasts";
import { useNavigate } from "react-router-dom";
import useAuth from "@/lib/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import getProtectedData from "@/services/getProtectedData";
import ACCESS_TIME from "@/config/accessTime";

export default function useProtectedQuery(endpoint) {
  const toast = useToast();
  const navigate = useNavigate();
  const { setAccessToken, accessToken } = useAuth();
  const [protectedData, setProtectedData] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: [`GET ${endpoint}`],
    queryFn: async () => getProtectedData(endpoint, accessToken),
    staleTime: ACCESS_TIME,
    retry: false,
  });

  useEffect(() => {
    if (isError) toast(networkError);
  }, [isError]);

  useEffect(() => {
    if (!data) return;
    switch (data.status) {
      case 401:
        toast(unauthorized);
        setTimeout(navigate, 250, "/");
        break;
      case 500:
        toast(serverError);
        break;
      case 429:
        toast(tooMany);
        break;
      case 200:
        data
          .json()
          .then(({ accessToken: newAccessToken, ...rest }) => {
            if (newAccessToken) setAccessToken(newAccessToken);
            setProtectedData(rest);
          })
          .catch(() => toast(genericError));
    }
  }, [data]);

  return { isLoading, protectedData };
}
