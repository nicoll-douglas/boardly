import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import SidebarLink from "./SidebarLink";

export default function Sidebar() {
  return (
    <Card w={"full"} h={"full"} as={"nav"}>
      <CardHeader p={4}>
        <Heading size={"sm"}>Boards</Heading>
      </CardHeader>
      <CardBody pt={0} p={4}>
        <UnorderedList styleType={"none"} ml={0}>
          <ListItem mb={"2px"}>
            <SidebarLink to="/boards/main">main</SidebarLink>
          </ListItem>
        </UnorderedList>
      </CardBody>
    </Card>
  );
}
