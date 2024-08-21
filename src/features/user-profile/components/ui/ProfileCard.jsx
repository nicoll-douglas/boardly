import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Text,
  SkeletonText,
} from "@chakra-ui/react";
import noWrap from "@/lib/constants/noWrap";
import EditProfileBtn from "./EditProfileBtn";
import ProfileTags from "./ProfileTags";
import useProfileContext from "../../hooks/useProfileContext";
import Avatar from "./Avatar";

export default function ProfileCard() {
  const { isLoading, profile = {} } = useProfileContext();
  const isLoaded = !isLoading;
  const { username, bio, tags, avatar } = profile;

  return (
    <Card w={"full"} h={"full"} as={"section"} aria-label="Profile">
      <CardHeader p={4} gap={3} display={"flex"}>
        <Avatar
          name={username}
          isLoaded={isLoaded}
          src={avatar}
          withEditing={true}
        />
        <Flex
          maxW={"calc(100% - 120px)"}
          gap={2}
          flexDir={"column"}
          my={"auto"}
        >
          <SkeletonText noOfLines={2} isLoaded={isLoaded}>
            <Heading
              fontSize={"2xl"}
              as={"h1"}
              mb={1}
              lineHeight={"normal"}
              maxW={"full"}
              minW={28}
              {...noWrap}
            >
              {username}
            </Heading>
            <ProfileTags tags={tags} />
          </SkeletonText>
        </Flex>
        <EditProfileBtn ml="auto" />
      </CardHeader>
      <CardBody pt={0} p={4}>
        <SkeletonText noOfLines={4} isLoaded={isLoaded}>
          <Heading size={"xs"} textTransform={"uppercase"} color={"gray.300"}>
            Bio
          </Heading>
          <Text fontSize={"sm"}>{bio}</Text>
        </SkeletonText>
      </CardBody>
    </Card>
  );
}
