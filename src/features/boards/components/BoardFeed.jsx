import { ThreadPreview } from "@/features/Threads";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Spacer,
  VStack,
  Spinner,
  Center,
  Image,
  Text,
} from "@chakra-ui/react";
import useBoard from "../hooks/useBoard";
import { CompactViewBtn, useCompactView } from "@/features/ui/compactView";
import { NewThreadBtn } from "@/features/threads";
import creativeUrl from "@/assets/images/creative.svg";

export default function BoardFeed() {
  const { data, isLoading } = useBoard();
  const { compactView } = useCompactView();

  return (
    <Card variant={"outline"} flex={1} size={"sm"}>
      {isLoading ? (
        <Center p={4} flex={1}>
          <Spinner size={"lg"} />
        </Center>
      ) : (
        <>
          <CardHeader>
            <Flex alignItems={"center"} gap={2}>
              <Heading size={"md"}>Threads</Heading>
              <Spacer />
              <NewThreadBtn />
              <CompactViewBtn />
            </Flex>
          </CardHeader>
          <Divider />
          <CardBody>
            {data.board.threads.length === 0 ? (
              <VStack gap={0} textAlign={"center"}>
                <Image src={creativeUrl} width={230} height={230} />
                <Heading size={"md"}>Nothing to show</Heading>
                <Text mt={1}>
                  This board has no threads, be the first to create one!
                </Text>
              </VStack>
            ) : (
              <VStack gap={compactView ? 2 : 3}>
                {data.board.threads
                  .sort(
                    (a, b) =>
                      new Date(b.createdAt).valueOf() -
                      new Date(a.createdAt).valueOf()
                  )
                  .map((thread) => (
                    <ThreadPreview
                      key={thread._id}
                      thread={thread}
                      isInProfile={false}
                    />
                  ))}
              </VStack>
            )}
          </CardBody>
        </>
      )}
    </Card>
  );
}
