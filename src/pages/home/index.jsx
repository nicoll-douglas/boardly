import { Container, Header, Logo } from "@/components/common";
import ToggleThemeBtn from "@/features/ui/dark-mode";
import { Spacer } from "@chakra-ui/react";
import { ProfileLink, ProfileProvider } from "@/features/user-profile";
import { BoardsListProvider } from "@/features/boards";

export default function Home() {
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
      </Container>
    </BoardsListProvider>
  );
}
