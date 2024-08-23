import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import DataBar from "@/components/common/DataBar";

export default function BoardDetailsCard() {
  return (
    <Card w={"full"} h={"full"}>
      <CardHeader p={4}>
        <Heading size={"lg"}>_main</Heading>
      </CardHeader>
      <CardBody p={4} pt={0} overflowY={"auto"}>
        <DataBar name="Members" value="2345" dividerTop />
        <DataBar name="Admin" value="mogadon69" dividerTop />
      </CardBody>
    </Card>
  );
}
