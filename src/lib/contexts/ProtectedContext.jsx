import useProtectedQuery from "@/lib/hooks/useProtectedQuery";
import NotFound from "@/pages/404";
import { Navigate } from "react-router-dom";
import ServerError from "@/pages/500";
import TooMany from "@/pages/429";

export default function ProtectedProvider({
  children,
  Context,
  endpoint,
  mockData,
}) {
  const { data, isLoading, error } = useProtectedQuery(endpoint, mockData);

  switch (error?.status) {
    case 404:
      return <NotFound />;
    case 401:
      return <Navigate to={"/"} />;
    case 500:
      return <ServerError />;
    case 429:
      return <TooMany />;
    default:
      return (
        <Context.Provider value={{ data, isLoading }}>
          {children}
        </Context.Provider>
      );
  }
}
export { ProtectedProvider };
