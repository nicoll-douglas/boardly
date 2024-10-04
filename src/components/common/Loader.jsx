import { Center, Spinner, useColorModeValue } from "@chakra-ui/react";

export default function Loader() {
  const bgColor = useColorModeValue("white", "gray.800");

  return (
    <Center
      pos={"fixed"}
      top={0}
      left={0}
      w={"100vw"}
      minH={"100vh"}
      zIndex={150}
      bg={bgColor}
    >
      <Spinner size={"xl"} />
    </Center>
  );
}
