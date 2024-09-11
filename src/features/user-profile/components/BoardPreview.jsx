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
import Tag from "./Tag";
import { noWrap } from "@/lib/constants";

export default function BoardPreview({ board, userRole }) {
  return (
    <LinkBox w={"full"}>
      <Card size={"sm"} w={"full"}>
        <CardBody>
          <Flex justifyContent={"space-between"} gap={4}>
            <LinkOverlay
              as={Link}
              to={`/boards/${board._id}`}
              maxW={{ base: "calc(100% - 40px)", sm: "calc(100% - 165px)" }}
            >
              <Heading size={"md"} {...noWrap}>
                {board.name}
              </Heading>
            </LinkOverlay>
            {userRole === config.userRoles.self && (
              <Flex gap={2} minW={"fit-content"}>
                <Tag display={{ base: "none", sm: "flex" }}>
                  {`members: ${board.members.length}`}
                </Tag>
                <IconButton icon={<EditIcon />} variant={"ghost"} size={"xs"} />
              </Flex>
            )}
          </Flex>
        </CardBody>
      </Card>
    </LinkBox>
  );
}
