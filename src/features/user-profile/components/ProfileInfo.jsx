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
import mockProfile from "../data/mockProfile.json";
import formatISOString from "@/lib/utils/formatISOString";

export default function ProfileInfo({ data }) {
  data = mockProfile;
  const profile = data?.profile;

  return (
    <Card variant={"outline"} w={80}>
      <CardHeader>
        <Flex gap={4} alignItems={"center"} flexWrap={"wrap"}>
          <Avatar size={"lg"} />
          <Box>
            <Heading size={"md"} as={"h1"}>
              {profile?.username}
            </Heading>
            <Text>{profile?.bio}</Text>
          </Box>
        </Flex>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} gap={1}>
          <ProfileField value={profile?.age} title={"Age"} />
          <ProfileField value={profile?.pronouns} title="Pronouns" />
          <ProfileField
            value={formatISOString(profile?.createdAt)}
            title={"Joined"}
          />
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button variant={"ghost"} size={"sm"} leftIcon={<EditIcon />}>
          Edit
        </Button>
      </CardFooter>
    </Card>
  );
}
