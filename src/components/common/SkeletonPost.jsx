import {
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";

export default function SkeletonPost({ isLoaded, noOfLines = 4 }) {
  if (isLoaded) return;

  return (
    <Card w={"full"}>
      <CardHeader p={4}>
        <Skeleton h={9} isLoaded={isLoaded} />
      </CardHeader>
      <CardBody p={4} pt={0}>
        <SkeletonText noOfLines={noOfLines} isLoaded={isLoaded} />
      </CardBody>
    </Card>
  );
}
