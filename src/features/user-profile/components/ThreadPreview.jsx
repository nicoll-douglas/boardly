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
  Spacer,
  Divider,
  Collapse,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { timeAgo } from "@/lib/utils";
import { useCompactView } from "@/features/ui/compactView";
import Tag from "./Tag";
import CardLabel from "./CardLabel";
import { noWrap } from "@/lib/constants";

export default function ThreadPreview({ thread }) {
  const { createdAt, title, body, _id, board, replies } = thread;
  const { compactView } = useCompactView();

  return (
    <LinkBox w={"full"}>
      <Card size={"sm"} variant={"filled"}>
        <CardHeader>
          <Box>
            <Flex w={"full"}>
              <CardLabel
                preText={"On"}
                linkText={board.name}
                link={`/boards/${board.name}`}
              />
              <Spacer />
              <Flex gap={2}>
                <Tag>{`${replies.length} replies`}</Tag>
                <Tag>{timeAgo(createdAt)}</Tag>
              </Flex>
            </Flex>
          </Box>
        </CardHeader>
        <Divider />
        <CardBody>
          <LinkOverlay as={Link} to={`/threads/${_id}`}>
            <Heading as={"h1"} size={"md"} {...(compactView ? noWrap : {})}>
              {title}
            </Heading>
          </LinkOverlay>
          <Collapse in={!compactView} animateOpacity>
            <Text mt={2}>{body}</Text>
          </Collapse>
        </CardBody>
      </Card>
    </LinkBox>
  );
}
