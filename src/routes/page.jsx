import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import Header from "@/components/common/Header";
import LoginBtn from "@/features/auth/login/components/LoginBtn";
import RegisterBtn from "@/features/auth/register/components/RegisterBtn";
import { Center, useDisclosure } from "@chakra-ui/react";
import Hero from "@/components/common/Hero";
import Authorship from "@/components/common/Authorship";
import ToggleableForm from "@/features/ui/formToggle/components/ToggleableForm";
import { useState } from "react";

export default function IndexPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoginForm, setIsLoginForm] = useState(null);

  function openLoginForm() {
    setIsLoginForm(true);
    onOpen();
  }

  function openRegisterForm() {
    setIsLoginForm(false);
    onOpen();
  }

  return (
    <Container>
      <Header>
        <Logo to="/" />
        <LoginBtn ml="auto" onClick={openLoginForm} />
        <RegisterBtn ml={6} onClick={openRegisterForm} />
        <ToggleableForm
          isOpen={isOpen}
          isLoginForm={isLoginForm}
          onClose={onClose}
          onToggle={() => setIsLoginForm(!isLoginForm)}
        />
      </Header>
      <Center flex={1} mt={12}>
        <Hero onJoin={openRegisterForm} />
      </Center>
      <Center py={16}>
        <Authorship />
      </Center>
    </Container>
  );
}
