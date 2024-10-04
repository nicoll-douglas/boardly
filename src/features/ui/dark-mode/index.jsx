import { IconButton, useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

export default function ToggleThemeBtn(props) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      onClick={toggleColorMode}
      icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      variant={"ghost"}
      aria-label="Toggle dark mode"
      aria-pressed={colorMode === "dark"}
      {...props}
    />
  );
}
