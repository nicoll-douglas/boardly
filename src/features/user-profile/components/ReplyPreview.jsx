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
  Heading,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { timeAgo } from "@/lib/utils";
import config from "@/config";
import Tag from "./Tag";
import CardLabel from "./CardLabel";
import { useCompactView } from "@/features/ui/compactView";
import { noWrap } from "@/lib/constants";
import useProfile from "../hooks/useProfile";

export default function ReplyPreview({ reply, userPrivilege }) {
  const parent = reply.parent || reply.thread;
  const { compactView } = useCompactView();
  const data = useProfile();

  return (
    <LinkBox w={"full"}>
      <Card size={"sm"} variant={"filled"}>
        <CardHeader>
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
              <Tag>{timeAgo(reply.createdAt)}</Tag>
            </Flex>
          </Flex>
        </CardHeader>
        <Divider />
        <CardBody>
          <LinkOverlay
            as={Link}
            to={`/threads/${reply.thread._id}#${reply._id}`}
          >
            <Heading
              size={"sm"}
              {...(compactView ? noWrap : {})}
            >{`${parent.author.username} said:`}</Heading>
            <Text
              {...(compactView ? noWrap : {})}
              whiteSpace={compactView ? "nowrap" : "pre-wrap"}
            >
              {parent.body || parent.title}
            </Text>
            <Heading
              size={"sm"}
              mt={compactView ? 0 : 4}
              {...(compactView ? noWrap : {})}
            >{`${
              userPrivilege === config.userPrivilege.self
                ? "You"
                : data.profile.username
            } said:`}</Heading>
            <Text
              {...(compactView ? noWrap : {})}
              whiteSpace={compactView ? "nowrap" : "pre-wrap"}
            >
              {reply.body}
            </Text>
          </LinkOverlay>
        </CardBody>
      </Card>
    </LinkBox>
  );
}
