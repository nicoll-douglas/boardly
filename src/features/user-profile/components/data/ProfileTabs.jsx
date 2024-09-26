import {
  Card,
  CardBody,
  CardHeader,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  Divider,
  TabPanel,
} from "@chakra-ui/react";
import ControlBar from "../ui/ControlBar";
import ThreadsTab from "./ThreadsTab";
import { ThreadsTabProvider } from "../../contexts/ThreadsTabContext";
import RepliesTab from "./RepliesTab";
import { RepliesTabProvider } from "../../contexts/RepliesTabContext";
import BoardsTab from "./BoardsTab";
import { BoardsTabProvider } from "../../contexts/BoardsTabContext";

export default function ProfileTabs() {
  return (
    <Card
      variant={{ base: "unstyled", md: "outline" }}
      flex={1}
      size={"sm"}
      minH={{ md: "calc(100vh - 88px)" }}
      maxW={"full"}
    >
      <CardHeader>
        <ControlBar />
      </CardHeader>
      <Divider my={{ base: 4, md: 0 }} />
      <CardBody>
        <Tabs isLazy display={"flex"} flexDir={"column"} h={"full"}>
          <TabList>
            <Tab>Threads</Tab>
            <Tab>Replies</Tab>
            <Tab>Boards</Tab>
          </TabList>
          <TabPanels flex={1} display={"flex"} flexDir={"column"}>
            <TabPanel
              px={{ base: 0, lg: 4 }}
              flex={1}
              display={"flex"}
              flexDir={"column"}
            >
              <ThreadsTabProvider>
                <ThreadsTab />
              </ThreadsTabProvider>
            </TabPanel>
            <TabPanel
              px={{ base: 0, lg: 4 }}
              flex={1}
              display={"flex"}
              flexDir={"column"}
            >
              <RepliesTabProvider>
                <RepliesTab />
              </RepliesTabProvider>
            </TabPanel>
            <TabPanel
              px={{ base: 0, lg: 4 }}
              flex={1}
              display={"flex"}
              flexDir={"column"}
            >
              <BoardsTabProvider>
                <BoardsTab />
              </BoardsTabProvider>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </CardBody>
    </Card>
  );
}
