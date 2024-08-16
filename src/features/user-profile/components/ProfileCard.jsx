import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
} from "@chakra-ui/react";

export default function ProfileCard() {
  return (
    <Card w={"full"} h={"full"}>
      <CardHeader p={4} display={"flex"}>
        <Avatar size={"lg"}></Avatar>
        <Flex flexDir={"column"}>
          <Heading>Username</Heading>
        </Flex>
      </CardHeader>
      <CardBody pt={0} p={4}></CardBody>
    </Card>
  );
}
