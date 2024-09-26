import { Container, Header, Logo } from "@/components/common";
import ToggleThemeBtn from "@/features/ui/dark-mode";
import { Spacer, Flex, Card } from "@chakra-ui/react";
import { ProfileLink } from "@/features/user-profile";
import { BoardsListProvider, BoardsList } from "@/features/boards";
import {
  ThreadProvider,
  Thread as ThreadData,
  BoardInfo,
} from "@/features/threads";
import { useParams } from "react-router-dom";

export default function Thread() {
  const { threadId } = useParams();

  return (
    <Container>
      <Header>
        <Logo to="/home" />
        <Spacer />
        <ProfileLink mr={3} />
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
        <BoardsListProvider>
          <BoardsList />
        </BoardsListProvider>
        <ThreadProvider threadId={threadId}>
          <Flex
            flexDir={"column"}
            gap={4}
            flex={1}
            as={Card}
            variant={"unstyled"}
          >
            <BoardInfo variant="base" />
            <ThreadData />
          </Flex>
          <BoardInfo variant="xl" />
        </ThreadProvider>
      </Flex>
    </Container>
  );
}
