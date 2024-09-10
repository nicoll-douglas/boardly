import {
  Card,
  CardBody,
  Tab,
  TabList,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

export default function ProfileTabs({ children }) {
  return (
    <Card variant={"outline"} flex={1}>
      <CardBody>
        <Tabs>
          <TabList>
            <Tab>Threads</Tab>
            <Tab>Replies</Tab>
            <Tab>Boards</Tab>
          </TabList>
          <TabPanels>{children}</TabPanels>
        </Tabs>
      </CardBody>
    </Card>
  );
}
