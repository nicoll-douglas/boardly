import { Container, Header, Logo } from "@/components/common";
import { Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import {
  ProfileProvider,
  ProfileInfo,
  ProfileTabs,
} from "@/features/user-profile";

export default function User() {
  const { username } = useParams();

  return (
    <ProfileProvider username={username}>
      <Container maxW="8xl">
        <Header>
          <Logo to="/home" />
        </Header>
        <Flex flex={1} pb={4} gap={4} flexDir={{ base: "column", md: "row" }}>
          <ProfileInfo />
          <ProfileTabs />
        </Flex>
      </Container>
    </ProfileProvider>
  );
}
