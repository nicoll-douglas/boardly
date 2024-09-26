import { Container, Header, Logo } from "@/components/common";
import ToggleThemeBtn from "@/features/ui/dark-mode";
import { Spacer, Flex, Card } from "@chakra-ui/react";
import { ProfileLink } from "@/features/user-profile";
import {
  BoardsListProvider,
  BoardsList,
  BoardProvider,
  BoardFeed,
  BoardInfo,
} from "@/features/boards";
import { useParams } from "react-router-dom";

export default function Board() {
  const { boardName } = useParams();

  return (
    <BoardProvider boardName={boardName}>
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
          <Flex
            flexDir={"column"}
            gap={4}
            flex={1}
            as={Card}
            variant={"unstyled"}
          >
            <BoardInfo variant="base" />
            <BoardFeed />
          </Flex>
          <BoardInfo variant="xl" />
        </Flex>
      </Container>
    </BoardProvider>
  );
}
