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
  Button,
  Spacer,
  Divider,
  Tag,
  Collapse,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { timeAgo } from "@/lib/utils";
import { useCompactView } from "@/features/ui/compactView";

export default function ThreadPreview({ thread }) {
  const { createdAt, title, body, _id, board } = thread;
  const { compactView } = useCompactView();

  return (
    <LinkBox w={"full"}>
      <Card size={"sm"} variant={"filled"}>
        <CardHeader>
          <Box>
            <Flex w={"full"} mb={1}>
              <Box>
                {"In "}
                <Button
                  variant={"link"}
                  as={Link}
                  to={`/boards/${board.name}`}
                  minW={"fit-content"}
                >
                  {board.name}
                </Button>
              </Box>
              <Spacer />
              <Tag>{timeAgo(createdAt)}</Tag>
            </Flex>
            <LinkOverlay as={Link} to={`/threads/${_id}`}>
              <Heading as={"h1"} size={"md"}>
                {title}
              </Heading>
            </LinkOverlay>
          </Box>
        </CardHeader>
        <Collapse in={!compactView} animateOpacity>
          <Divider />
          <CardBody>
            <Text>{body}</Text>
          </CardBody>
        </Collapse>
      </Card>
    </LinkBox>
  );
}
