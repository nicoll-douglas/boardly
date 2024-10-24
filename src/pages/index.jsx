import {
  Center,
  useDisclosure,
  Text,
  Button,
  Link,
  VStack,
  Heading,
  Image,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { useState } from "react";

import { Container, Logo, Header } from "@/components/common";

import ToggleableForm from "@/features/ui/formToggle";
import { RegisterBtn, LoginBtn } from "@/features/auth";
import ToggleThemeBtn from "@/features/ui/dark-mode";
import { TryDemoBtn } from "@/features/demo";
import MobileMenu from "@/features/ui/mobileMenu";

import chattingUrl from "@/assets/images/chatting.svg";

export default function Index() {
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
        <Spacer />
        <TryDemoBtn display={{ base: "none", md: "flex" }} />
        <LoginBtn
          ml={6}
          data-cy="LoginForm-open"
          onClick={openLoginForm}
          display={{ base: "none", md: "flex" }}
        />
        <RegisterBtn
          ml={6}
          data-cy="RegisterForm-open"
          onClick={openRegisterForm}
          display={{ base: "none", md: "flex" }}
        />
        <ToggleableForm
          isOpen={isOpen}
          isLoginForm={isLoginForm}
          onClose={onClose}
          onToggle={() => setIsLoginForm(!isLoginForm)}
        />
        <ToggleThemeBtn ml={3} />
        <MobileMenu display={{ base: "flex", md: "none" }} ml={1} />
      </Header>
      <Center flex={1} mt={12} px={4}>
        <VStack gap={4} maxW={"2xl"} as={"main"}>
          <Heading
            as="h1"
            size={{ base: "2xl", sm: "3xl" }}
            wordBreak={"break-word"}
          >
            Expression, freedom, connection.
          </Heading>
          <Text fontSize={{ sm: "lg" }}>
            Browse threads, share your thoughts, participate in open dialogue or
            just come and hang out with like-minded people. Join the messaging
            board today.
          </Text>
          <Flex w={"full"} flexDir={{ base: "column", sm: "row" }}>
            <RegisterBtn
              maxW="fit-content"
              mt={{ base: 0, md: 4 }}
              size={{ base: "md", sm: "lg" }}
              onClick={openRegisterForm}
            >
              Join for free
            </RegisterBtn>
            <Image
              src={chattingUrl}
              w={{ base: "300px", md: "380px" }}
              h={{ base: "300px", md: "380px" }}
              ml="auto"
              mt={-4}
              mr={{ sm: "auto", md: 0 }}
              alt="graphic displaying dialogue"
            />
          </Flex>
        </VStack>
      </Center>
      <Center mb={16}>
        <Text display={"flex"} gap={1} as={"footer"}>
          {"A project by"}
          <Button
            as={Link}
            href="https://github.com/nicoll-douglas"
            target="_blank"
            variant={"link"}
          >
            Nicoll Douglas
          </Button>
        </Text>
      </Center>
    </Container>
  );
}
