import ThreadPost from "./ThreadPost";
import useThread from "../hooks/useThread";
import { VStack, Box, Divider, AbsoluteCenter } from "@chakra-ui/react";
import ThreadReply from "./ThreadReply";
import NothingToShow from "@/components/common/NothingToShow";
import SkeletonPost from "@/components/common/SkeletonPost";
import { Heading } from "@chakra-ui/react";

export default function Thread() {
  const { thread, isLoading, notFound } = useThread();
  const repliesLength = thread?.replies.length ?? -1;
  const isLoaded = !isLoading;

  return (
    <>
      <ThreadPost />
      {notFound || (
        <>
          <Box position="relative" my={6}>
            <Divider />
            <AbsoluteCenter bg="gray.800" px="4">
              <Heading size={"sm"}>Replies</Heading>
            </AbsoluteCenter>
          </Box>
          <VStack gap={4}>
            {repliesLength > 0 &&
              thread.replies.map((reply) => (
                <ThreadReply key={reply._id} reply={reply} />
              ))}
            {repliesLength === 0 && <NothingToShow />}
            {repliesLength < 0 && (
              <>
                <SkeletonPost isLoaded={isLoaded} />
                <SkeletonPost isLoaded={isLoaded} />
              </>
            )}
          </VStack>
        </>
      )}
    </>
  );
}
