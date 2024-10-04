import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import theme from "@/theme";
import { CompactViewProvider } from "@/features/ui/compactView";
import { AuthProvider } from "@/features/auth";

const queryClient = new QueryClient();

export default function GlobalContexts({ children }) {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <AuthProvider>
            <CompactViewProvider>{children}</CompactViewProvider>
          </AuthProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
