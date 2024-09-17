import {
  Card,
  CardBody,
  Avatar,
  CardHeader,
  Flex,
  Heading,
  Box,
  Stack,
  StackDivider,
  Divider,
} from "@chakra-ui/react";
import { formatISOString } from "@/lib/utils";
import useProfile from "../../hooks/useProfile";
import AgeEditable from "../form/AgeEditable";
import PronounEditable from "../form/PronounEditable";
import config from "@/config";
import ProfileField from "../ui/ProfileField";
import BioEditable from "../form/BioEditable";

export default function ProfileInfo() {
  const { data } = useProfile();
  const profile = data.profile;
  const editingDisabled = data.userPrivilege === config.userPrivilege.basic;

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
        <Flex gap={2} flexDir={"column"}>
          <Avatar size={"lg"} src={profile.avatar} name={profile.username} />
          <Box>
            <Heading size={"md"} as={"h1"}>
              {profile.username}
            </Heading>
            <BioEditable
              defaultValue={profile.bio}
              isDisabled={editingDisabled}
            />
          </Box>
        </Flex>
      </CardHeader>
      <Divider my={{ base: 4, md: 0 }} />
      <CardBody>
        <Stack divider={<StackDivider />} gap={1}>
          <AgeEditable
            defaultValue={profile.age}
            isDisabled={editingDisabled}
          />
          <PronounEditable
            defaultValue={profile.pronouns}
            isDisabled={editingDisabled}
          />
          <ProfileField
            title="Joined On"
            value={formatISOString(profile.createdAt)}
          />
        </Stack>
      </CardBody>
    </Card>
  );
}
