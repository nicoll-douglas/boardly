import { Button, Card } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

export default function ButtonsCard() {
  return (
    <Card mt={4} p={4} as={"section"} aria-label="Interact">
      <Button
        leftIcon={<AddIcon boxSize={3} />}
        variant={"ghost"}
        maxW={"fit-content"}
      >
        New Thread
      </Button>
    </Card>
  );
}
