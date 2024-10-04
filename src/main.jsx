import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { GlobalContexts } from "./contexts";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";

createRoot(document.getElementById("root")).render(
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <StrictMode>
      <GlobalContexts>
        <App />
      </GlobalContexts>
    </StrictMode>
  </>
);
