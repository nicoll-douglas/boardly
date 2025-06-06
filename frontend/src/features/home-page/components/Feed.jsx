import { ThreadPreview } from "@/features/threads";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Spacer,
  VStack,
  Image,
  Text,
  SlideFade,
} from "@chakra-ui/react";
import useFeed from "../hooks/useFeed";
import { CompactViewBtn, useCompactView } from "@/features/ui/compactView";
import creativeUrl from "@/assets/images/creative.svg";
import { Spinner } from "@/components/common";

export default function Feed() {
  const { data, isLoading } = useFeed();
  const { compactView } = useCompactView();

  return (
    <Card
      variant={{ base: "unstyled", md: "outline" }}
      flex={1}
      size={"sm"}
      as={"section"}
      aria-label="Recent Threads"
    >
      {isLoading ? (
        <Spinner p={4} />
      ) : (
        <SlideFade in={!!data}>
          <CardHeader>
            <Flex alignItems={"center"} gap={2}>
              <Heading size={"md"}>Recent Threads</Heading>
              <Spacer />
              <CompactViewBtn />
            </Flex>
          </CardHeader>
          <Divider my={{ base: 4, md: 0 }} />
          <CardBody>
            {data.threads.length === 0 ? (
              <VStack gap={0} textAlign={"center"}>
                <Image src={creativeUrl} width={250} height={250} />
                <Heading size={"md"}>Nothing to show</Heading>
                <Text mt={1}>
                  {import.meta.env.VITE_APP_TITLE} currently has no threads, be
                  the first to create one!
                </Text>
              </VStack>
            ) : (
              <VStack
                gap={compactView ? 2 : 3}
                as={"ul"}
                listStyleType={"none"}
              >
                {data.threads
                  .sort(
                    (a, b) =>
                      new Date(b.createdAt).valueOf() -
                      new Date(a.createdAt).valueOf()
                  )
                  .map((thread) => (
                    <ThreadPreview
                      key={thread._id}
                      thread={thread}
                      authorLabel
                      isInProfile
                    />
                  ))}
              </VStack>
            )}
          </CardBody>
        </SlideFade>
      )}
    </Card>
  );
}
