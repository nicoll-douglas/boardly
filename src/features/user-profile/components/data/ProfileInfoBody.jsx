import {
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Box,
  Stack,
  StackDivider,
  Divider,
  SlideFade,
} from "@chakra-ui/react";
import { formatISOString } from "@/lib/utils";
import AgeEditable from "../form/AgeEditable";
import PronounEditable from "../form/PronounEditable";
import BioEditable from "../form/BioEditable";
import AvatarEditable from "../form/AvatarEditable";
import useEditProfile from "../../hooks/useEditProfile";
import { StackData } from "@/components/common";

export default function ProfileInfoBody({ profile }) {
  const editor = useEditProfile(profile);

  return (
    <SlideFade in={!!profile}>
      <CardHeader>
        <Flex gap={2} flexDir={"column"}>
          <AvatarEditable />
          <Box>
            <Heading size={"md"} as={"h1"}>
              {profile.username}
            </Heading>
            <BioEditable editor={editor} />
          </Box>
        </Flex>
      </CardHeader>
      <Divider my={{ base: 4, md: 0 }} />
      <CardBody>
        <Stack divider={<StackDivider />} gap={1}>
          <AgeEditable editor={editor} />
          <PronounEditable editor={editor} />
          <StackData
            name="Joined On"
            value={formatISOString(profile.createdAt)}
          />
          <StackData name="Threads" value={profile.threads.length} />
          <StackData name="Replies" value={profile.replies.length} />
          <StackData name="Boards" value={profile.boards.length} />
        </Stack>
      </CardBody>
    </SlideFade>
  );
}
