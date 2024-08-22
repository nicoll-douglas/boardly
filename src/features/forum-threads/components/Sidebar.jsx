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
        <Heading size={"sm"}>Threads</Heading>
      </CardHeader>
      <CardBody pt={0} p={4}>
        <UnorderedList styleType={"none"} ml={0}>
          <ListItem mb={"2px"}>
            <SidebarLink to="/home">_main</SidebarLink>
          </ListItem>
          <ListItem>
            <SidebarLink to="/">_alt</SidebarLink>
          </ListItem>
        </UnorderedList>
      </CardBody>
    </Card>
  );
}
