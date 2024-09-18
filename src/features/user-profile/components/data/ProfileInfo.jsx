import {
  Card,
  CardBody,
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
import ProfileField from "../ui/ProfileField";
import BioEditable from "../form/BioEditable";
import AvatarEditable from "../form/AvatarEditable";

export default function ProfileInfo() {
  const { data } = useProfile();
  const profile = data.profile;

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
          <AvatarEditable />
          <Box>
            <Heading size={"md"} as={"h1"}>
              {profile.username}
            </Heading>
            <BioEditable />
          </Box>
        </Flex>
      </CardHeader>
      <Divider my={{ base: 4, md: 0 }} />
      <CardBody>
        <Stack divider={<StackDivider />} gap={1}>
          <AgeEditable />
          <PronounEditable />
          <ProfileField
            title="Joined On"
            value={formatISOString(profile.createdAt)}
          />
        </Stack>
      </CardBody>
    </Card>
  );
}
