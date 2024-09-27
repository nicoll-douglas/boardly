import { Container, Header, Logo } from "@/components/common";
import ToggleThemeBtn from "@/features/ui/dark-mode";
import { Spacer, Flex } from "@chakra-ui/react";
import { ProfileLink } from "@/features/user-profile";
import { Outlet } from "react-router-dom";
import { NewThreadBtn } from "@/features/threads";

export default function HeaderLayout() {
  return (
    <Container>
      <Header>
        <Logo to="/home" />
        <Spacer />
        <NewThreadBtn mr={4} btnStyle="icon" />
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
        <Outlet />
      </Flex>
    </Container>
  );
}
