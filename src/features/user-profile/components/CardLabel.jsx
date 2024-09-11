import { Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { noWrap } from "@/lib/constants";

export default function CardLabel({ preText, linkText, link }) {
  return (
    <Flex gap={1} maxW={"full"}>
      {preText}
      <Button
        variant={"link"}
        as={Link}
        to={link}
        minW={"unset"}
        pt={"1px"}
        {...noWrap}
      >
        {linkText}
      </Button>
    </Flex>
  );
}
