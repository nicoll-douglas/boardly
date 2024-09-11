import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import Header from "@/components/common/Header";
import LoginBtn from "@/features/auth/components/LoginBtn";
import RegisterBtn from "@/features/auth/components/RegisterBtn";
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
} from "@chakra-ui/react";
import ToggleableForm from "@/features/ui/formToggle/components/ToggleableForm";
import { useState } from "react";
import Optimistic from "@/components/special/Optimistic";
import { Spacer } from "@chakra-ui/react";
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
    <Optimistic>
      <Container>
        <Header>
          <Logo to="/" />
          <Spacer />
          <LoginBtn onClick={openLoginForm} />
          <RegisterBtn
            ml={6}
            data-testid="register-btn"
            onClick={openRegisterForm}
          />
          <ToggleableForm
            isOpen={isOpen}
            isLoginForm={isLoginForm}
            onClose={onClose}
            onToggle={() => setIsLoginForm(!isLoginForm)}
          />
        </Header>
        <Center flex={1} mt={12}>
          <VStack gap={4} maxW={"2xl"} as={"main"}>
            <Heading
              as="h1"
              size={{ base: "2xl", sm: "3xl" }}
              wordBreak={"break-word"}
            >
              Expression, freedom, connection.
            </Heading>
            <Text fontSize={{ sm: "lg" }}>
              Browse threads, share your thoughts, participate in open dialogue
              or just come and hang out with like-minded people. Join the forum
              today.
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
    </Optimistic>
  );
}
