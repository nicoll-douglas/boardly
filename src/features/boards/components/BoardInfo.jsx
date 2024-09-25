import { Card, CardBody, CardHeader } from "@chakra-ui/react";

export default function BoardInfo(props) {
  return (
    <Card
      variant={"outline"}
      w={{ base: "full", md: 64, lg: 80 }}
      minW={{ base: "full", md: 64, lg: 80 }}
      position={{ base: "static", md: "sticky" }}
      top={"72px"}
      h={{ md: "calc(100vh - 88px)" }}
      size={"sm"}
      overflowY={"auto"}
      display={{ base: "none", md: "flex" }}
      {...props}
    >
      <CardHeader></CardHeader>
      <CardBody></CardBody>
    </Card>
  );
}
