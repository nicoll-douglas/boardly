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
import Tag from "../ui/Tag";
import CardLabel from "../ui/CardLabel";
import { noWrap } from "@/lib/constants";

export default function ThreadPreview({ thread }) {
  const { createdAt, title, body, _id, board } = thread;
  const { compactView } = useCompactView();

  return (
    <LinkBox w={"full"}>
      <Card size={"sm"} variant={"filled"}>
        <CardHeader>
          <Flex w={"full"} gap={4}>
            <Box w={"calc(100% - 180px)"} flex={1}>
              <CardLabel
                preText={"On"}
                linkText={board.name}
                link={`/boards/${board.name}`}
              />
            </Box>
            <Flex gap={2} minW={"fit-content"} alignItems={"start"}>
              <Tag>{timeAgo(createdAt)}</Tag>
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
