import { Flex, Text as ChakraText } from "@chakra-ui/react";
import ButtonLink from "./ButtonLink";

export default function CardLabel({
  preText,
  linkText,
  link,
  postText,
  overlay,
  ...props
}) {
  return (
    <Flex gap={1} alignItems={"center"} maxW="full">
      {preText && <Text>{preText}</Text>}
      <ButtonLink
        overlay={overlay}
        to={link}
        py={0}
        h={"fit-content"}
        {...props}
      >
        {linkText}
      </ButtonLink>
      {postText && <Text>{postText}</Text>}
    </Flex>
  );
}

function Text({ children }) {
  return (
    <ChakraText
      fontSize={"md"}
      h={"19px"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      {children}
    </ChakraText>
  );
}
