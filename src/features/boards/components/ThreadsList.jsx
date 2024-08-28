import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Skeleton,
  Flex,
} from "@chakra-ui/react";
import ThreadLink from "./ThreadLink";
import useBoard from "../hooks/useBoard";
import NothingToShow from "@/components/common/NothingToShow";

export default function ThreadsList() {
  const { isLoading, board } = useBoard();
  const isLoaded = !isLoading;
  const threads = board?.threads;
  const length = threads?.length ?? -1;

  return (
    <Card h={"full"} w={"full"}>
      <CardHeader p={4}>
        <Heading size={"sm"}>Threads</Heading>
      </CardHeader>
      <CardBody p={4} pt={0} display={"flex"} flexDir={"column"}>
        {length > 0 &&
          threads.map(({ _id, title, author }) => (
            <ThreadLink
              key={_id}
              threadName={title}
              authorName={author.username}
              authorLink={`/users/${author._id}`}
              link={`/boards/${board.name}/threads/${_id}`}
            />
          ))}
        {length === 0 && <NothingToShow />}
        {length < 0 && (
          <Flex flexDir={"column"} gap={2}>
            {Array.from({ length: 6 }, (_, index) => (
              <Skeleton key={index} isLoaded={isLoaded} h={6} />
            ))}
          </Flex>
        )}
      </CardBody>
    </Card>
  );
}
