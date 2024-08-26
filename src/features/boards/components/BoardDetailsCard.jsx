import {
  Card,
  SkeletonText,
  CardBody,
  CardHeader,
  Heading,
  Skeleton,
} from "@chakra-ui/react";
import DataBar from "@/components/common/DataBar";
import useMainBoard from "../hooks/useMainBoard";

export default function BoardDetailsCard() {
  const { isLoading, board } = useMainBoard();
  const isLoaded = !isLoading;

  return (
    <Card w={"full"} h={"full"} as={"section"} aria-label="Board details">
      <CardHeader p={4}>
        <Skeleton isLoaded={isLoaded} h={9}>
          <Heading size={"lg"}>{board?.name}</Heading>
        </Skeleton>
      </CardHeader>
      <CardBody p={4} pt={0} overflowY={"auto"}>
        <SkeletonText noOfLines={8} isLoaded={isLoaded}>
          {isLoaded && (
            <>
              <DataBar name="Members" value={board?.memberCount} dividerTop />
              <DataBar name="Admin" value={board?.admin.username} dividerTop />
              <DataBar name="Threads" value={board?.threadCount} dividerTop />
            </>
          )}
        </SkeletonText>
      </CardBody>
    </Card>
  );
}
