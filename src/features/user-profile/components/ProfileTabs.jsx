import {
  Card,
  CardBody,
  CardHeader,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  Divider,
} from "@chakra-ui/react";
import ThreadsTab from "./ThreadsTab";
import ControlBar from "./ControlBar";

export default function ProfileTabs() {
  return (
    <Card variant={"outline"} flex={1} size={"sm"}>
      <CardHeader>
        <ControlBar />
      </CardHeader>
      <Divider />
      <CardBody>
        <Tabs>
          <TabList>
            <Tab>Threads</Tab>
            <Tab>Replies</Tab>
            <Tab>Boards</Tab>
          </TabList>
          <TabPanels>
            <ThreadsTab />
          </TabPanels>
        </Tabs>
      </CardBody>
    </Card>
  );
}
