import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import styles from "./styles";
import fonts from "./fonts";

const theme = extendTheme(
  {
    config: {
      initialColorMode: "dark",
      useSystemColorMode: false,
    },
    styles,
    fonts,
  },
  withDefaultColorScheme({ colorScheme: "teal" })
);

export default theme;
