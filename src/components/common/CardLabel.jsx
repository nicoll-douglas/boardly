import { Flex, Text as ChakraText } from "@chakra-ui/react";
import ButtonLink from "./ButtonLink";

export default function CardLabel({
  preText,
  linkText,
  link,
  postText,
  ...props
}) {
  const { fontSize = "sm", ...rest } = props;

  return (
    <Flex gap={1} alignItems={"center"} maxW="full">
      {preText && <Text fontSize={fontSize}>{preText}</Text>}
      <ButtonLink to={link} py={0} h={"fit-content"} size={fontSize} {...rest}>
        {linkText}
      </ButtonLink>
      {postText && <Text fontSize={fontSize}>{postText}</Text>}
    </Flex>
  );
}

function Text({ children, fontSize }) {
  return (
    <ChakraText
      fontSize={fontSize}
      h={"19px"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      {children}
    </ChakraText>
  );
}
