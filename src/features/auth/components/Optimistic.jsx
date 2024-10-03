import usePrivilege from "../hooks/usePrivilege";
import { Navigate } from "react-router-dom";
import { DelayFallback } from "@/components/common";

export default function Optimistic({ redirect = "/home", children }) {
  const { elevated, isLoading } = usePrivilege();

  if (isLoading) return <DelayFallback />;
  if (elevated) return <Navigate to={redirect} />;

  return children;
}
