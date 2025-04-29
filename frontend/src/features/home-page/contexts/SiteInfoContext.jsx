import { createContext } from "react";
import { Protected } from "@/components/utility";
import mockSiteData from "../data/mockSiteData";

const SiteInfoContext = createContext();

function SiteInfoProvider({ children }) {
  return (
    <Protected
      endpoint={"/api/info"}
      Context={SiteInfoContext}
      mockData={mockSiteData}
    >
      {children}
    </Protected>
  );
}

export { SiteInfoContext, SiteInfoProvider };
