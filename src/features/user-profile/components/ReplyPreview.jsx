import {
  Card,
  CardHeader,
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
import config from "@/config";
import Tag from "./Tag";
import CardLabel from "./CardLabel";
import { useCompactView } from "@/features/ui/compactView";
import { noWrap } from "@/lib/constants";

export default function ReplyPreview({ reply, userRole }) {
  const parent = reply.parent || reply.thread;
  const { compactView } = useCompactView();

  return (
    <LinkBox w={"full"}>
      <Card size={"sm"} variant={"filled"}>
        <CardHeader>
          <Box>
            <Flex w={"full"} alignItems={"start"} gap={4}>
              <Box w={"calc(100% - 210px)"} flex={1}>
                <Collapse in={!compactView} animateOpacity>
                  <CardLabel
                    preText={"On"}
                    linkText={reply.thread.board.name}
                    link={`/boards/${reply.thread.board.name}`}
                  />
                </Collapse>
                <CardLabel
                  preText="In"
                  linkText={reply.thread.title}
                  link={`/threads/${reply.thread._id}`}
                />
              </Box>
              <Flex gap={2} alignItems={"start"} minW={"fit-content"}>
                <Tag display={{ base: "none", lg: "flex" }}>
                  {`${reply.replies.length} replies`}
                </Tag>
                <Tag>{timeAgo(reply.createdAt)}</Tag>
              </Flex>
            </Flex>
          </Box>
        </CardHeader>
        <Divider />
        <CardBody>
          <LinkOverlay
            as={Link}
            to={`/threads/${reply.thread._id}#${reply._id}`}
          >
            <Text {...(compactView ? noWrap : {})}>
              {`${parent.author.username} says: ${parent.body}`}
            </Text>
            <Text {...(compactView ? noWrap : {})}>
              {userRole === config.userRoles.self
                ? `You say: ${reply.body}`
                : `${reply.author.username} says: ${reply.body}`}
            </Text>
          </LinkOverlay>
        </CardBody>
      </Card>
    </LinkBox>
  );
}
