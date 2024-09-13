import { Container, Header, Logo } from "@/components/common";
import { Flex, Divider, Spacer } from "@chakra-ui/react";
import {
  ProfileProvider,
  ProfileInfo,
  ProfileTabs,
} from "@/features/user-profile";
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
        <Flex flex={1} pb={4} gap={4} flexDir={{ base: "column", md: "row" }}>
          <ProfileInfo />
          <Divider display={{ md: "none" }} />
          <ProfileTabs />
        </Flex>
      </Container>
    </ProfileProvider>
  );
}
