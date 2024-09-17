import { Container, Header, Logo } from "@/components/common";
import ToggleThemeBtn from "@/features/ui/dark-mode";
import { Spacer } from "@chakra-ui/react";

export default function Home() {
  return (
    <Container>
      <Header>
        <Logo to="/home" />
        <Spacer />
        <ToggleThemeBtn />
      </Header>
    </Container>
  );
}
