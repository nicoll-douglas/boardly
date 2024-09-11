import { useProtectedQuery } from "@/hooks/service";
import { Navigate } from "react-router-dom";
import { TooMany, NotFound, ServerError } from "@/components/status-pages";

import Loader from "@/components/common/Loader";
import config from "@/config";

export default function ProtectedProvider({
  children,
  Context,
  endpoint,
  mockData,
}) {
  const { data, isLoading, error } = useProtectedQuery(endpoint);
  let contextValue = config.fetch.queriesEnabled ? data : mockData;

  if (isLoading) return <Loader />;
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
export { ProtectedProvider };
