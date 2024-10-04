import { SettingsIcon } from "@chakra-ui/icons";
import * as Ch from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function UserSettingsBtn(props) {
  return (
    <Ch.IconButton
      icon={<SettingsIcon />}
      variant={"ghost"}
      as={Link}
      to={"/settings"}
      aria-label="User Settings"
      {...props}
    />
  );
}
