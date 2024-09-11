import {
  Card,
  CardBody,
  Avatar,
  CardHeader,
  Flex,
  Heading,
  Box,
  Text,
  Stack,
  StackDivider,
  CardFooter,
  Divider,
  Button,
} from "@chakra-ui/react";
import ProfileField from "./ProfileField";
import { EditIcon } from "@chakra-ui/icons";
import { formatISOString } from "@/lib/utils";
import useProfile from "../hooks/useProfile";
import config from "@/config";

export default function ProfileInfo() {
  const data = useProfile();
  const profile = data.profile;
  const userRole = data.userRole;

  return (
    <Card
      variant={{ base: "unstyled", md: "outline" }}
      w={{ base: "full", md: 64, lg: 80 }}
      position={{ base: "static", md: "sticky" }}
      top={"72px"}
      h={{ md: "calc(100vh - 88px)" }}
      size={"sm"}
      overflowY={"auto"}
    >
      <CardHeader>
        <Flex gap={4} alignItems={"center"} flexWrap={"wrap"}>
          <Avatar size={"lg"} src={profile.avatar} name={profile.username} />
          <Box>
            <Heading size={"md"} as={"h1"}>
              {profile.username}
            </Heading>
            {profile.bio && <Text>{profile.bio}</Text>}
          </Box>
        </Flex>
      </CardHeader>
      <Divider my={{ base: 4, md: 0 }} />
      <CardBody>
        <Stack divider={<StackDivider />} gap={1}>
          <ProfileField value={profile.age ?? "-"} title={"Age"} />
          <ProfileField value={profile.pronouns || "-"} title="Pronouns" />
          <ProfileField
            value={formatISOString(profile.createdAt)}
            title={"Joined"}
          />
        </Stack>
      </CardBody>
      {userRole === config.userRoles.self && (
        <>
          <Divider my={{ base: 4, md: 0 }} />
          <CardFooter>
            <Button variant={"ghost"} size={"sm"} leftIcon={<EditIcon />}>
              Edit
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
