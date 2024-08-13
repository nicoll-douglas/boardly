import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/index";
import { AuthProvider } from "./lib/contexts/AuthContext";

export default function Contexts({ children }) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
