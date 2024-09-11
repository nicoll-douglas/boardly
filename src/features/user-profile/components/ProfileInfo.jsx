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
  const USER_ROLE = data.USER_ROLE;

  return (
    <Card variant={"outline"} w={{ base: "full", md: 80 }}>
      <CardHeader>
        <Flex gap={4} alignItems={"center"} flexWrap={"wrap"}>
          <Avatar size={"lg"} src={profile.avatar} name={profile.username} />
          <Box>
            <Heading size={"md"} as={"h1"}>
              {profile.username}
            </Heading>
            <Text>{profile.bio}</Text>
          </Box>
        </Flex>
      </CardHeader>
      <Divider />
      <CardBody>
        <Stack divider={<StackDivider />} gap={1}>
          <ProfileField value={profile.age} title={"Age"} />
          <ProfileField value={profile.pronouns} title="Pronouns" />
          <ProfileField
            value={formatISOString(profile.createdAt)}
            title={"Joined"}
          />
        </Stack>
      </CardBody>
      {USER_ROLE === config.userRoles.self && (
        <>
          <Divider />
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
