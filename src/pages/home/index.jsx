import { Container, Header, Logo } from "@/components/common";
import ToggleThemeBtn from "@/features/ui/dark-mode";
import { Spacer, Flex } from "@chakra-ui/react";
import { ProfileLink } from "@/features/user-profile";
import { BoardsListProvider, BoardsList } from "@/features/boards";

export default function Home() {
  return (
    <BoardsListProvider>
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
        >
          <BoardsList />
        </Flex>
      </Container>
    </BoardsListProvider>
  );
}
