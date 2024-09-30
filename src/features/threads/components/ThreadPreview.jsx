import {
  Card,
  CardHeader,
  Heading,
  LinkBox,
  LinkOverlay,
  Box,
  Text,
  CardBody,
  Flex,
  Divider,
  Collapse,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { timeAgo } from "@/lib/utils";
import { useCompactView } from "@/features/ui/compactView";
import { CardLabel, Tag } from "@/components/common";
import { noWrap } from "@/lib/constants";
import DeleteThreadBtn from "./DeleteThreadBtn";
import { useIsMe } from "@/features/user-profile";

export default function ThreadPreview({
  thread,
  isInProfile = true,
  authorLabel,
}) {
  const { createdAt, title, body, _id, board, author, replies } = thread;
  const { compactView } = useCompactView();
  const [isMe] = useIsMe();

  return (
    <LinkBox w={"full"}>
      <Card size={"sm"} variant={"filled"}>
        <CardHeader>
          <Flex w={"full"} gap={4}>
            <Box w={"calc(100% - 180px)"} flex={1}>
              {authorLabel && (
                <Collapse in={!compactView} animateOpacity>
                  <CardLabel
                    preText={"By"}
                    linkText={`${author.username}`}
                    link={`/users/${author.username}`}
                    fontSize="md"
                    pb="1px"
                  />
                </Collapse>
              )}
              <CardLabel
                preText={isInProfile ? "On" : "By"}
                linkText={isInProfile ? `/${board.name}` : author.username}
                link={
                  isInProfile
                    ? `/boards/${board.name}`
                    : `/users/${author.username}`
                }
                pb="1px"
                fontSize="md"
              />
            </Box>
            <Flex gap={2} minW={"fit-content"} alignItems={"start"}>
              <Tag display={{ base: "none", sm: "flex" }}>{`${
                replies.length
              } repl${replies.length === 1 ? "y" : "ies"}`}</Tag>
              <Tag>{timeAgo(createdAt)}</Tag>
              {isInProfile && isMe && (
                <DeleteThreadBtn threadId={_id} boardName={board.name} />
              )}
            </Flex>
          </Flex>
        </CardHeader>
        <Divider />
        <CardBody>
          <LinkOverlay as={Link} to={`/threads/${_id}`}>
            <Heading
              as={"h1"}
              size={{ base: "sm", md: "md" }}
              {...(compactView ? noWrap : {})}
            >
              {title}
            </Heading>
          </LinkOverlay>
          {body && (
            <Collapse in={!compactView} animateOpacity>
              <Text
                mt={{ base: 1, md: 2 }}
                whiteSpace={"pre-wrap"}
                lineHeight={1.25}
              >
                {body}
              </Text>
            </Collapse>
          )}
        </CardBody>
      </Card>
    </LinkBox>
  );
}
