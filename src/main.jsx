import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Contexts from "./Contexts.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Contexts>
      <App />
    </Contexts>
  </StrictMode>
);
