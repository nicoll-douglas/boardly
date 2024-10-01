import {
  Card,
  CardHeader,
  LinkBox,
  Box,
  Text,
  CardBody,
  Flex,
  Divider,
  Collapse,
} from "@chakra-ui/react";
import { timeAgo } from "@/lib/utils";
import { Tag, CardLabel, DeletedLabel } from "@/components/common";
import { useCompactView } from "@/features/ui/compactView";
import { noWrap } from "@/lib/constants";
import { DeleteReplyBtn } from "@/features/replies";
import useProfile from "../../hooks/useProfile";
import useIsMe from "../../hooks/useIsMe";

export default function ReplyPreview({ reply }) {
  const parent = reply.parent || reply.thread;
  const { compactView } = useCompactView();
  const { data } = useProfile();
  const [isMe] = useIsMe();

  const threadDeleted = reply.thread.deleted;
  const boardDeleted = reply.thread.board.deleted;

  return (
    <LinkBox w={"full"}>
      <Card size={"sm"} variant={"filled"}>
        <CardHeader>
          <Flex w={"full"} alignItems={"start"} gap={4}>
            <Box w={"calc(100% - 210px)"} flex={1}>
              <Collapse in={!compactView} animateOpacity>
                {boardDeleted ? (
                  <DeletedLabel preText="On">deleted board</DeletedLabel>
                ) : (
                  <CardLabel
                    preText={"On"}
                    linkText={`/${reply.thread.board.name}`}
                    link={`/boards/${reply.thread.board.name}`}
                    fontSize="md"
                    pb="1px"
                  />
                )}
              </Collapse>
              {threadDeleted ? (
                <DeletedLabel preText="In">deleted thread</DeletedLabel>
              ) : (
                <CardLabel
                  preText="In"
                  linkText={reply.thread.title}
                  link={`/threads/${reply.thread._id}`}
                  fontSize="md"
                  pb={"1px"}
                  overlay
                />
              )}
            </Box>
            <Flex gap={2} alignItems={"start"} minW={"fit-content"}>
              <Tag>{timeAgo(reply.createdAt)}</Tag>
              {isMe && (
                <DeleteReplyBtn
                  replyId={reply._id}
                  threadId={reply.thread._id}
                />
              )}
            </Flex>
          </Flex>
        </CardHeader>
        <Divider />
        <CardBody>
          {reply.parent?.deleted && (
            <>
              <Text fontStyle={"italic"} color={"gray.500"}>
                Reply was deleted
              </Text>
              <Divider my={compactView ? 2 : 3} />
            </>
          )}
          {!parent.deleted && (
            <>
              <CardLabel
                postText="said:"
                linkText={`${parent.author.username}`}
                link={`/users/${parent.author.username}`}
                fontSize="md"
              />
              <Text
                {...(compactView ? noWrap : {})}
                whiteSpace={compactView ? "nowrap" : "pre-wrap"}
                lineHeight={1.25}
              >
                {parent.body || parent.title}
              </Text>
              <Divider my={compactView ? 2 : 3} />
            </>
          )}
          {isMe ? (
            <Text size={"sm"} h={"21px"}>
              You replied:
            </Text>
          ) : (
            <CardLabel
              postText="replied:"
              linkText={data.profile.username}
              link={`/users/${data.profile.username}`}
              fontSize="md"
            />
          )}
          <Text
            {...(compactView ? noWrap : {})}
            whiteSpace={compactView ? "nowrap" : "pre-wrap"}
            lineHeight={1.25}
          >
            {reply.body}
          </Text>
        </CardBody>
      </Card>
    </LinkBox>
  );
}
