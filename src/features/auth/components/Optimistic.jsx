import usePrivilege from "../hooks/usePrivilege";
import { Navigate, Outlet } from "react-router-dom";
import { DelayFallback } from "@/components/common";

export default function Optimistic({ redirect = "/home" }) {
  const { elevated, isLoading } = usePrivilege();

  if (isLoading) return <DelayFallback />;
  if (elevated) return <Navigate to={redirect} />;

  return <Outlet />;
}
