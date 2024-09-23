import { Container, Header, Logo } from "@/components/common";
import { Spacer } from "@chakra-ui/react";
import { ProfileProvider, Profile, useIsMe } from "@/features/user-profile";
import ToggleThemeBtn from "@/features/ui/dark-mode";

export default function User() {
  const [isMe, username] = useIsMe();

  return (
    <ProfileProvider user={{ isMe, username }}>
      <Container maxW="8xl">
        <Header>
          <Logo to="/home" />
          <Spacer />
          <ToggleThemeBtn />
        </Header>
        <Profile />
      </Container>
    </ProfileProvider>
  );
}
