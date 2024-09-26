import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export default function BoardSearchInput({ onChange, value }) {
  return (
    <InputGroup size={"sm"} mb={{ base: 2, md: 0 }}>
      <InputLeftElement pointerEvents="none">
        <SearchIcon color={"gray.500"} />
      </InputLeftElement>
      <Input placeholder="Search..." onChange={onChange} value={value} />
    </InputGroup>
  );
}
