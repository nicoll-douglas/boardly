import { Container, Header, Logo } from "@/components/common";
import { Flex, Divider } from "@chakra-ui/react";
import {
  ProfileProvider,
  ProfileInfo,
  ProfileTabs,
} from "@/features/user-profile";

export default function User() {
  return (
    <ProfileProvider>
      <Container maxW="8xl">
        <Header>
          <Logo to="/home" />
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
