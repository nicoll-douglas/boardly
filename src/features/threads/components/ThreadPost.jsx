import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Link,
  Skeleton,
  Text,
  SkeletonText,
  Avatar,
} from "@chakra-ui/react";
import useThread from "../hooks/useThread";
import { Link as RouterLink } from "react-router-dom";
import Separator from "@/components/common/Separator";
import timeAgo from "@/lib/utils/timeAgo";
import noWrap from "@/lib/constants/noWrap";
import DOMPurify from "dompurify";
import NotFoundCard from "@/components/common/NotFoundCard";

export default function ThreadPost() {
  const { isLoading, thread, notFound } = useThread();
  const isLoaded = !isLoading;

  return (
    <Card w={"full"} as={"main"}>
      {notFound || (
        <CardHeader p={4}>
          <Skeleton
            h={8}
            isLoaded={isLoaded}
            display={"flex"}
            alignItems={"center"}
          >
            <Avatar
              name={thread?.author.username}
              src={thread?.author.avatar}
              p={0}
              size={"sm"}
              mr={2}
              display={{ base: "none", sm: "unset" }}
            />
            <Link
              fontWeight={"bold"}
              display={"block"}
              maxW={"fit-content"}
              as={RouterLink}
              to={thread && `/users/${thread.author.username}`}
              {...noWrap}
            >
              {thread?.author.username}
            </Link>
            <Separator />
            <Text {...noWrap}>{timeAgo(thread?.createdAt)}</Text>
          </Skeleton>
        </CardHeader>
      )}
      <SkeletonText isLoaded={isLoaded}>
        {notFound ? (
          <NotFoundCard />
        ) : (
          <CardBody p={4} pt={0}>
            <Heading mb={2} minH={6} size={"md"}>
              {thread?.title && DOMPurify.sanitize(thread.title)}
            </Heading>
            <Text>{thread?.body && DOMPurify.sanitize(thread.body)}</Text>
          </CardBody>
        )}
      </SkeletonText>
    </Card>
  );
}
