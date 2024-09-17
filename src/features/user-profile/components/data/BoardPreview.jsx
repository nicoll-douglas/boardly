import {
  Card,
  CardBody,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  IconButton,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { EditIcon } from "@chakra-ui/icons";
import config from "@/config";
import { noWrap } from "@/lib/constants";
import { useCompactView } from "@/features/ui/compactView";

export default function BoardPreview({ board, userPrivilege }) {
  const { compactView } = useCompactView();

  return (
    <LinkBox w={"full"}>
      <Card size={"sm"} w={"full"}>
        <CardBody py={compactView ? 2 : 3}>
          <Flex justifyContent={"space-between"} alignItems={"center"} gap={4}>
            <LinkOverlay
              as={Link}
              to={`/boards/${board._id}`}
              maxW={{ base: "calc(100% - 40px)", sm: "calc(100% - 165px)" }}
            >
              <Heading size={"md"} {...noWrap}>
                {board.name}
              </Heading>
            </LinkOverlay>
            {userPrivilege === config.userPrivilege.self && (
              <Flex gap={2} minW={"fit-content"}>
                <IconButton icon={<EditIcon />} variant={"ghost"} size={"xs"} />
              </Flex>
            )}
          </Flex>
        </CardBody>
      </Card>
    </LinkBox>
  );
}
