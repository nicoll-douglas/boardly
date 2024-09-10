import { createContext, useEffect, useState } from "react";

const CompactViewContext = createContext();

function CompactViewProvider({ children }) {
  const [compactView, setCompactView] = useState(
    JSON.parse(localStorage.getItem("compactView")) || false
  );

  useEffect(() => {
    localStorage.setItem("compactView", JSON.stringify(compactView));
  }, [compactView]);

  return (
    <CompactViewContext.Provider value={{ compactView, setCompactView }}>
      {children}
    </CompactViewContext.Provider>
  );
}

export { CompactViewContext, CompactViewProvider };
