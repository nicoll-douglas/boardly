import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import Header from "@/components/common/Header";
import LoginBtn from "@/features/auth/login/components/LoginBtn";
import RegisterBtn from "@/features/auth/register/components/RegisterBtn";
import { Center } from "@chakra-ui/react";
import Hero from "@/components/common/Hero";
import Authorship from "@/components/common/Authorship";

export default function IndexPage() {
  return (
    <Container>
      <Header>
        <Logo to="/" />
        <LoginBtn ml="auto" />
        <RegisterBtn ml={6} />
      </Header>
      <Center flex={1} mt={12}>
        <Hero />
      </Center>
      <Center py={16}>
        <Authorship />
      </Center>
    </Container>
  );
}
