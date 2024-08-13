import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Logo(props) {
  return (
    <Button
      variant={"link"}
      fontFamily={"Jersey10"}
      lineHeight={0.8}
      fontSize={"5xl"}
      fontWeight={100}
      as={Link}
      {...props}
    >
      Lorem
    </Button>
  );
}
