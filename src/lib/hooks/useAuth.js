import { AuthContext } from "@/lib/contexts/AuthContext";
import { useContext } from "react";

export default function useAuth() {
  return useContext(AuthContext);
}
