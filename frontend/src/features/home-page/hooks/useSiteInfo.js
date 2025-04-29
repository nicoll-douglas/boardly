import { useContext } from "react";
import { SiteInfoContext } from "../contexts/SiteInfoContext";

export default function useSiteInfo() {
  return useContext(SiteInfoContext);
}
