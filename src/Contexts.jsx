import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/index";

export default function Contexts({ children }) {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </BrowserRouter>
  );
}
