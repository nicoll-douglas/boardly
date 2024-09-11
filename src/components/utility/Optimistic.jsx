import { usePrivilege } from "@/hooks/service";
import { Navigate } from "react-router-dom";
import Loader from "../common/Loader";

export default function Optimistic({ redirect = "/home", children }) {
  const { elevated, isLoading } = usePrivilege();

  if (isLoading) return <Loader />;
  if (elevated) return <Navigate to={redirect} />;

  return children;
}
