import {
  Card,
  CardHeader,
  CardBody,
  Text,
  Avatar,
  Link,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import timeAgo from "@/lib/utils/timeAgo";
import noWrap from "@/lib/constants/noWrap";
import Separator from "@/components/common/Separator";
import DOMPurify from "dompurify";

export default function ThreadReply({ reply = {} }) {
  const { body, createdAt, author } = reply;

  return (
    <Card w={"full"} role="region" aria-label="reply">
      <CardHeader p={4} display={"flex"} alignItems={"center"}>
        <Avatar
          name={author?.username}
          src={author?.avatar}
          p={0}
          size={"sm"}
          mr={2}
          display={{ base: "none", sm: "flex" }}
        />
        <Link
          fontWeight={"bold"}
          display={"block"}
          maxW={"fit-content"}
          as={RouterLink}
          to={author && `/users/${author.username}`}
          {...noWrap}
        >
          {author?.username}
        </Link>
        <Separator />
        <Text {...noWrap}>{timeAgo(createdAt)}</Text>
      </CardHeader>
      <CardBody p={4} pt={0}>
        <Text>{body && DOMPurify.sanitize(body)}</Text>
      </CardBody>
    </Card>
  );
}
