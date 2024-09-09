import { Center, Spinner } from "@chakra-ui/react";

export default function Loader() {
  return (
    <Center pos={"fixed"} top={0} left={0} w={"100vw"} minH={"100vh"}>
      <Spinner size={"xl"} color="orange.200" />
    </Center>
  );
}
