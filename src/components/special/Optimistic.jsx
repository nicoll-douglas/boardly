import usePrivilege from "@/lib/hooks/usePrivilege";
import { Navigate } from "react-router-dom";

export default function Optimistic({ onElevated = "/" }) {
  const { elevated, isLoading } = usePrivilege();

  if (isLoading) return <Navigate to={onElevated} />;
  if (elevated) return;
}
