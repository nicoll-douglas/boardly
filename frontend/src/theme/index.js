import {
  extendTheme,
  withDefaultColorScheme,
  withDefaultVariant,
} from "@chakra-ui/react";
import styles from "./styles";

const theme = extendTheme(
  {
    config: {
      initialColorMode: "dark",
      useSystemColorMode: false,
    },
    styles,
  },
  withDefaultColorScheme({ colorScheme: "orange" }),
  withDefaultVariant({
    variant: "filled",
    components: ["Input", "Textarea"],
  })
);

export default theme;
