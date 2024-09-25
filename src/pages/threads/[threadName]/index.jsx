import { Container, Header, Logo } from "@/components/common";
import ToggleThemeBtn from "@/features/ui/dark-mode";
import { Spacer, Flex, Card } from "@chakra-ui/react";
import { ProfileLink, ProfileProvider } from "@/features/user-profile";
import {
  BoardsListProvider,
  BoardsList,
  BoardProvider,
  BoardInfo,
} from "@/features/boards";
import { ThreadProvider, Thread as ThreadData } from "@/features/threads";
import { useParams } from "react-router-dom";

export default function Thread() {
  const { boardName } = useParams();

  return (
    <BoardsListProvider>
      <Container>
        <Header>
          <Logo to="/home" />
          <Spacer />
          <ProfileProvider user={{ isMe: true }} preventEarlyRender={false}>
            <ProfileLink mr={3} />
          </ProfileProvider>
          <ToggleThemeBtn />
        </Header>
        <Flex
          flex={1}
          pb={4}
          px={4}
          gap={4}
          flexDir={{ base: "column", md: "row" }}
          w={"full"}
        >
          <BoardsList />
          <BoardProvider boardName={boardName}>
            <Flex
              flexDir={"column"}
              gap={4}
              flex={1}
              as={Card}
              variant={"unstyled"}
            >
              <ThreadProvider>
                <ThreadData />
              </ThreadProvider>
              <BoardInfo
                display={{ base: "flex", xl: "none" }}
                position="static"
                h="fit"
                w="full"
              />
            </Flex>
            <BoardInfo display={{ base: "none", xl: "flex" }} />
          </BoardProvider>
        </Flex>
      </Container>
    </BoardsListProvider>
  );
}
