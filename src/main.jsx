import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { GlobalContexts } from "./contexts";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalContexts>
      <App />
    </GlobalContexts>
  </StrictMode>
);
