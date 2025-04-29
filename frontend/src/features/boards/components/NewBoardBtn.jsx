import { Button, useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { FormModal } from "@/components/common";
import NewBoardForm from "./NewBoardForm";

export default function NewBoardBtn({ ...rest }) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Button
        variant={"ghost"}
        size={"sm"}
        leftIcon={<AddIcon />}
        onClick={onOpen}
        {...rest}
      >
        New Board
      </Button>
      <FormModal isOpen={isOpen} onClose={onClose} heading="New Board">
        <NewBoardForm onClose={onClose} />
      </FormModal>
    </>
  );
}
