import { Center, Spinner } from "@chakra-ui/react";

export default function Loader(props) {
  return (
    <Center flex={1} {...props}>
      <Spinner size={"lg"} />
    </Center>
  );
}
