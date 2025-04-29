import useEmailVerification from "../hooks/useEmailVerification";
import { Heading, Text, Spinner, Flex } from "@chakra-ui/react";

export default function Verification({ token }) {
  const { isLoading, UIFeedback } = useEmailVerification(token);

  return (
    <Flex
      flex={1}
      flexDir={"column"}
      alignItems={"center"}
      py={16}
      textAlign={"center"}
    >
      {UIFeedback && (
        <>
          <Heading
            data-cy="emailVerification-feedback-heading"
            as={"h1"}
            size={"3xl"}
            mb={6}
          >
            {UIFeedback.heading}
          </Heading>
          <Text data-cy="emailVerification-feedback-text" fontSize={"xl"}>
            {UIFeedback.text}
          </Text>
        </>
      )}
      {isLoading && <Spinner size={"xl"} />}
    </Flex>
  );
}
