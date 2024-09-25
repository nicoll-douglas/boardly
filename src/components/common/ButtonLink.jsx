import { noWrap } from "@/lib/constants";
import { Button, LinkOverlay } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function ButtonLink({ to, children, bold, overlay, ...rest }) {
  return overlay ? (
    <LinkOverlay as={Link} to={to} maxW="full">
      <ButtonLinkStyled bold={bold} {...rest}>
        {children}
      </ButtonLinkStyled>
    </LinkOverlay>
  ) : (
    <ButtonLinkStyled as={Link} to={to} bold={bold} {...rest}>
      {children}
    </ButtonLinkStyled>
  );
}

function ButtonLinkStyled({ bold, children, ...rest }) {
  return (
    <Button
      variant={"link"}
      py={1}
      h={8}
      maxW={"full"}
      borderRadius={0}
      fontWeight={bold ? 600 : 400}
      {...noWrap}
      {...rest}
    >
      {children}
    </Button>
  );
}
