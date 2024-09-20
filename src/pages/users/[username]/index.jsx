import { Container, Header, Logo } from "@/components/common";
import { Spacer } from "@chakra-ui/react";
import { ProfileProvider, Profile } from "@/features/user-profile";
import ToggleThemeBtn from "@/features/ui/dark-mode";

export default function User() {
  return (
    <ProfileProvider>
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
