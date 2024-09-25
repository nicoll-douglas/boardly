import { noWrap } from "@/lib/constants";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function ButtonLink({ to, children, bold, ...rest }) {
  return (
    <Button
      variant={"link"}
      as={Link}
      to={to}
      maxW={"fit-content"}
      py={1}
      h={8}
      borderRadius={0}
      fontWeight={bold ? 600 : 400}
      {...noWrap}
      {...rest}
    >
      {children}
    </Button>
  );
}
