import {
  Card,
  CardBody,
  Flex,
  VStack,
  Avatar,
  Divider,
  CardHeader,
} from "@chakra-ui/react";
import { Tag, ButtonLink } from "@/components/common";
import { Link } from "react-router-dom";
import { ReplyBtn } from "@/features/replies";

export default function AvatarCard({
  tagValues,
  user,
  children,
  replyBtn,
  reply,
  ...props
}) {
  return (
    <Card variant={"filled"} size={"sm"} w={"full"} {...props}>
      <CardHeader>
        <Flex gap={2}>
          {tagValues?.map((value, index) => (
            <Tag key={index}>{value}</Tag>
          ))}
          {replyBtn && <ReplyBtn ml="auto" reply={reply} />}
        </Flex>
      </CardHeader>
      <Divider />
      <CardBody>
        <Flex gap={{ base: 2, sm: 3 }} flexDir={{ base: "column", sm: "row" }}>
          <Flex
            flexDir={{ base: "row-reverse", sm: "column" }}
            alignItems={{ base: "center", sm: "start" }}
            pr={{ base: 0, sm: 3 }}
            borderRightWidth={{ base: 0, sm: 1 }}
            gap={{ base: 2, sm: 1 }}
            justifyContent={"start"}
          >
            <ButtonLink
              to={`/users/${user.username}`}
              py={0}
              h="fit-content"
              pb={{ base: 1, sm: 0 }}
            >
              {user.username}
            </ButtonLink>
            <Link to={`/users/${user.username}`}>
              <Avatar
                name={user.username}
                src={user.avatar}
                borderLeftRadius={{ base: "full", sm: 0 }}
                borderRightRadius={{ base: "full", sm: 0 }}
                borderRadius={{ base: "full", sm: 0 }}
                size={{ base: "sm", sm: "lg", lg: "xl" }}
              />
            </Link>
          </Flex>
          <Divider display={{ base: "flex", sm: "none" }} />
          <VStack alignItems={"start"} w={"full"} gap={0}>
            {children}
          </VStack>
        </Flex>
      </CardBody>
    </Card>
  );
}
