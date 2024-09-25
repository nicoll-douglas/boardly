import { Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

export default function NewThreadBtn() {
  return (
    <Button variant={"ghost"} size={"sm"} leftIcon={<AddIcon />}>
      New Thread
    </Button>
  );
}
