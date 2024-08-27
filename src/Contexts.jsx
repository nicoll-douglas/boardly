import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/index";
import { AuthProvider } from "./lib/contexts/AuthContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Contexts({ children }) {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
