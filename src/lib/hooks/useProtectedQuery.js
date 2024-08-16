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

export default function useProtectedQuery(query) {
  const { data, isLoading, isError } = query;
  const toast = useToast();
  const navigate = useNavigate();
  const { setAccessToken } = useAuth();
  const [protectedData, setProtectedData] = useState(null);

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
          .then(({ accessToken, ...rest }) => {
            if (accessToken) setAccessToken();
            setProtectedData(rest);
          })
          .catch(() => toast(genericError));
    }
  }, [data]);

  return { isLoading, protectedData };
}
