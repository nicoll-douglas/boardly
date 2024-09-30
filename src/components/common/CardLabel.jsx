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
      {preText && <Text {...props}>{preText}</Text>}
      <ButtonLink
        overlay={overlay}
        to={link}
        py={0}
        h={"fit-content"}
        {...props}
      >
        {linkText}
      </ButtonLink>
      {postText && <Text {...props}>{postText}</Text>}
    </Flex>
  );
}

function Text({ children, ...rest }) {
  return (
    <ChakraText
      fontSize={"md"}
      h={"19px"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      {...rest}
    >
      {children}
    </ChakraText>
  );
}
