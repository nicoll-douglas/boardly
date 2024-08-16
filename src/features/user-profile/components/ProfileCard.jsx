import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Tag,
  Heading,
  Text,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import noWrap from "@/lib/constants/noWrap";
import Separator from "@/components/common/Separator";
import EditProfileBtn from "./EditProfileBtn";
import useProtectedQuery from "@/lib/hooks/useProtectedQuery";

export default function ProfileCard() {
  const { isLoading, protectedData } = useProtectedQuery("/api/me");
  const isLoaded = !isLoading;

  return (
    <Card w={"full"} h={"full"} as={"section"} aria-label="Profile">
      <CardHeader p={4} gap={3} display={"flex"}>
        <SkeletonCircle size={16} isLoaded={isLoaded}>
          <Avatar size={"lg"} my={"auto"} name="mogadon69"></Avatar>
        </SkeletonCircle>
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
              {...noWrap}
            >
              {"mogadon69"}
            </Heading>
            <Flex>
              <Tag size={"sm"}>20</Tag>
              <Separator />
              <Tag size="sm">he/him</Tag>
            </Flex>
          </SkeletonText>
        </Flex>
        <EditProfileBtn ml="auto" />
      </CardHeader>
      <CardBody pt={0} p={4}>
        <SkeletonText noOfLines={4} isLoaded={isLoaded}>
          <Heading size={"xs"} textTransform={"uppercase"} color={"gray.300"}>
            Bio
          </Heading>
          <Text fontSize={"sm"}>{"Hi, I'm mogadon69, nice to meet you!"}</Text>
        </SkeletonText>
      </CardBody>
    </Card>
  );
}
