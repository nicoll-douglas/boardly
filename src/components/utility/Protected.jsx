import { Navigate } from "react-router-dom";
import { TooMany, NotFound, ServerError } from "@/components/status-pages";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProtectedData } from "@/services";
import { useNotif } from "@/hooks";

import Loader from "@/components/common/Loader";
import config from "@/config";

export default function Protected({
  children,
  Context,
  endpoint,
  mockData,
  preventEarlyRender = true,
}) {
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

  let contextValue;

  if (preventEarlyRender) {
    if (isLoading) return <Loader />;
    contextValue = config.fetch.queriesEnabled ? data : mockData;
  } else {
    contextValue = config.fetch.queriesEnabled
      ? { data, isLoading }
      : { data: mockData, isLoading: false };
  }

  switch (error?.status) {
    case 404:
      return <NotFound />;
    case 401:
      return <Navigate to={"/auth/login"} />;
    case 500:
      return <ServerError />;
    case 429:
      return <TooMany />;
    case 0:
      return;
    default:
      return (
        <Context.Provider value={contextValue}>{children}</Context.Provider>
      );
  }
}
