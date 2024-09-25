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

export default function AvatarCard({ tagValues, user, children, ...props }) {
  return (
    <Card variant={"filled"} size={"sm"} w={"full"} {...props}>
      {tagValues && (
        <>
          <CardHeader>
            <Flex gap={2}>
              {tagValues.map((value, index) => (
                <Tag key={index}>{value}</Tag>
              ))}
            </Flex>
          </CardHeader>
          <Divider />
        </>
      )}
      <CardBody>
        <Flex gap={3}>
          <VStack alignItems={"start"} pr={3} borderRightWidth={1}>
            <ButtonLink
              to={`/users/${user.username}`}
              py={0}
              h="fit-content"
              size="sm"
            >
              {user.username}
            </ButtonLink>
            <Avatar
              name={user.username}
              src={user.avatar}
              borderRadius={0}
              size={"xl"}
            />
          </VStack>
          <VStack alignItems={"start"} w={"full"} gap={0}>
            {children}
          </VStack>
        </Flex>
      </CardBody>
    </Card>
  );
}
