import { useContext } from "react";
import { ProfileContext } from "../contexts/ProfileContext";

export default function useProfileContext() {
  return useContext(ProfileContext);
}
