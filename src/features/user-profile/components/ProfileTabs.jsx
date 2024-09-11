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
import ControlBar from "./ControlBar";
import NoData from "./NoData";
import ProfileTabPanel from "./ProfileTabPanel";
import useProfile from "../hooks/useProfile";
import ThreadPreview from "./ThreadPreview";
import ReplyPreview from "./ReplyPreview";
import BoardPreview from "./BoardPreview";
import boardUrl from "@/assets/images/board.svg";
import chatting2Url from "@/assets/images/chatting-2.svg";

export default function ProfileTabs() {
  const { profile, userRole } = useProfile();

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
        <Tabs>
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
            <ProfileTabPanel>
              {profile.threads.length === 0 ? (
                <NoData text={"Create a thread to get started!"} />
              ) : (
                profile.threads.map((thread) => (
                  <ThreadPreview key={thread._id} thread={thread} />
                ))
              )}
            </ProfileTabPanel>
            <ProfileTabPanel>
              {profile.replies.length === 0 ? (
                <NoData
                  text={"Your replies to other users will show up here!"}
                  imageUrl={chatting2Url}
                />
              ) : (
                profile.replies.map((reply) => (
                  <ReplyPreview
                    key={reply._id}
                    reply={reply}
                    userRole={userRole}
                  />
                ))
              )}
            </ProfileTabPanel>
            <ProfileTabPanel gap={2}>
              {profile.boards.length === 0 ? (
                <NoData
                  text="Any boards you administrate will show up here!"
                  imageUrl={boardUrl}
                />
              ) : (
                profile.boards.map((board) => (
                  <BoardPreview
                    key={board._id}
                    board={board}
                    userRole={userRole}
                  />
                ))
              )}
            </ProfileTabPanel>
          </TabPanels>
        </Tabs>
      </CardBody>
    </Card>
  );
}
