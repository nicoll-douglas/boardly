import { Button, IconButton, useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { FormModal } from "@/components/common";
import NewThreadForm from "./NewThreadForm";

export default function NewThreadBtn({ btnStyle, ...rest }) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  if (btnStyle === "icon") {
    return (
      <>
        <IconButton
          icon={<AddIcon />}
          variant="ghost"
          size={"sm"}
          onClick={onOpen}
          {...rest}
        />
        <Modal onClose={onClose} isOpen={isOpen} />
      </>
    );
  }

  return (
    <>
      <Button
        variant={"ghost"}
        size={"sm"}
        leftIcon={<AddIcon />}
        onClick={onOpen}
        {...rest}
      >
        New Thread
      </Button>
      <Modal onClose={onClose} isOpen={isOpen} />
    </>
  );
}

function Modal({ isOpen, onClose }) {
  return (
    <FormModal isOpen={isOpen} onClose={onClose} heading="New Thread" size="lg">
      <NewThreadForm closeFormModal={onClose} />
    </FormModal>
  );
}
