import { Navigate } from "react-router-dom";
import { TooMany, NotFound, ServerError } from "@/components/status-pages";
import { useQuery } from "@tanstack/react-query";
import { getProtectedData } from "@/services";
import { useNotif } from "@/hooks";

import Loader from "@/components/common/Loader";
import config from "@/config";
import { useQueryHandlers } from "@/hooks";
// import { useAuth } from "@/features/auth";
// import { useEffect } from "react";

export default function Protected({
  children,
  Context,
  endpoint,
  mockData,
  preventEarlyRender = true,
}) {
  const notifs = useNotif();
  // const { setCurrentUser } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: [`GET ${endpoint}`],
    queryFn: async () => getProtectedData(endpoint),
    staleTime: config.auth.accessTime,
    retry: false,
    enabled: config.fetch.queriesEnabled,
  });

  const onError = () => {
    switch (error.status) {
      case 0:
        notifs.networkError();
        break;
      // case 401:
      //   setCurrentUser(null);
    }
  };
  // useEffect(() => {
  //   if (!fetchEnabled) setCurrentUser(mockData.user);
  // }, []);

  // useQueryHandlers(error, data, onError, onData);
  useQueryHandlers(error, data, onError);

  let contextValue;
  const fetchEnabled = config.fetch.queriesEnabled;
  if (preventEarlyRender) {
    if (isLoading) return <Loader />;
    contextValue = fetchEnabled ? { data } : { data: mockData };
  } else {
    contextValue = fetchEnabled
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
