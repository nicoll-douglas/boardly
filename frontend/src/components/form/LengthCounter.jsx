import { Tag } from "@chakra-ui/react";

export default function LengthCounter({ length, maxLength, ...rest }) {
  return (
    <Tag colorScheme={length > maxLength ? "red" : "gray"} {...rest}>
      {maxLength - length}
    </Tag>
  );
}
