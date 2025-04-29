import { Center } from "@chakra-ui/react";

export default function Separator(props) {
  return (
    <Center maxW={"fit-content"} maxH="fit-content" mx={1} {...props}>
      {"\u2022"}
    </Center>
  );
}
