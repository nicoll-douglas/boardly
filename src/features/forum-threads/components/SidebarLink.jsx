import { Button } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import noWrap from "@/lib/constants/noWrap";

export default function SidebarLink({ children, ...rest }) {
  return (
    <Button
      as={NavLink}
      px={2}
      w={"full"}
      color={"orange.200"}
      variant={"ghost"}
      justifyContent={"start"}
      h={8}
      pt={"6px"}
      style={({ isActive }) => ({
        backgroundColor: isActive && "rgba(251, 211, 141, 0.24)",
      })}
      {...noWrap}
      {...rest}
    >
      {children}
    </Button>
  );
}
