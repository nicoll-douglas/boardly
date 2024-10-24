import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { TryDemoBtn } from "@/features/demo";

export default function MobileMenu(props) {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<HamburgerIcon />}
        variant={"ghost"}
        {...props}
      />
      <MenuList>
        <TryDemoBtn variant="menu" />
        <MenuItem as={Link} to={"/auth/login"}>
          Login
        </MenuItem>
        <MenuItem as={Link} to={"/auth/register"}>
          Sign up
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
