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
  VStack,
} from "@chakra-ui/react";
import ControlBar from "./ControlBar";
import ThreadsTab from "./ThreadsTab";
import { ThreadsTabProvider } from "../contexts/ThreadsTabContext";
import RepliesTab from "./RepliesTab";
import { RepliesTabProvider } from "../contexts/RepliesTabContext";
import BoardsTab from "./BoardsTab";
import { BoardsTabProvider } from "../contexts/BoardsTabContext";
import { useCompactView } from "@/features/ui/compactView";

export default function ProfileTabs() {
  const { compactView } = useCompactView();

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
        <Tabs isLazy>
          <TabList
            position={{ base: "sticky", md: "static" }}
            top={"72px"}
            zIndex={100}
            bg={"gray.800"}
          >
            <Tab>Threads</Tab>
            <Tab>Replies</Tab>
            <Tab>Boards</Tab>
          </TabList>
          <TabPanels>
            <TabPanel px={{ base: 0, lg: 4 }}>
              <VStack gap={compactView ? 2 : 3}>
                <ThreadsTabProvider>
                  <ThreadsTab />
                </ThreadsTabProvider>
              </VStack>
            </TabPanel>
            <TabPanel px={{ base: 0, lg: 4 }}>
              <VStack gap={compactView ? 2 : 3}>
                <RepliesTabProvider>
                  <RepliesTab />
                </RepliesTabProvider>
              </VStack>
            </TabPanel>
            <TabPanel px={{ base: 0, lg: 4 }}>
              <VStack gap={2}>
                <BoardsTabProvider>
                  <BoardsTab />
                </BoardsTabProvider>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </CardBody>
    </Card>
  );
}
