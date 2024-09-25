import {
  Card,
  Spinner,
  Center,
  Heading,
  CardBody,
  Text,
  Textarea,
  VStack,
  Image,
} from "@chakra-ui/react";
import useThread from "../hooks/useThread";
import chatting2Url from "@/assets/images/chatting-2.svg";
import ReplyCard from "./ReplyCard";
import ThreadCard from "./ThreadCard";

export default function Thread() {
  const { data, isLoading } = useThread();
  const thread = data?.thread;

  return (
    <Card variant={{ base: "unstyled", md: "outline" }} flex={1} size={"sm"}>
      {isLoading ? (
        <Center flex={1}>
          <Spinner size={"lg"} />
        </Center>
      ) : (
        <>
          <CardBody>
            <ThreadCard thread={thread} />
            <Textarea rows={4} placeholder="What are your thoughts?" />
            {thread.replies.length === 0 ? (
              <VStack gap={0} textAlign={"center"} mb={10}>
                <Image src={chatting2Url} width={240} height={240} />
                <Heading size={"md"}>Nothing to show</Heading>
                <Text mt={1}>
                  This thread has no replies, be the first start the
                  conversation!
                </Text>
              </VStack>
            ) : (
              <VStack gap={4} mt={4}>
                {thread.replies
                  .sort(
                    (a, b) =>
                      new Date(a.createdAt).valueOf() -
                      new Date(b.createdAt).valueOf()
                  )
                  .map((reply) => (
                    <ReplyCard key={reply._id} reply={reply} />
                  ))}
              </VStack>
            )}
          </CardBody>
        </>
      )}
    </Card>
  );
}
