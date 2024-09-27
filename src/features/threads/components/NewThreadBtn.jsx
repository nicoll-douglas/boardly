import { Button, IconButton, useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { FormModal } from "@/components/common";
import NewThreadForm from "./NewThreadForm";
import { BoardsListProvider } from "@/features/boards";

export default function NewThreadBtn({ btnStyle, currentBoardName, ...rest }) {
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
        <Modal
          currentBoardName={currentBoardName}
          onClose={onClose}
          isOpen={isOpen}
        />
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
      <Modal
        currentBoardName={currentBoardName}
        onClose={onClose}
        isOpen={isOpen}
      />
    </>
  );
}

function Modal({ isOpen, onClose, currentBoardName }) {
  return (
    <FormModal isOpen={isOpen} onClose={onClose} heading="New Thread" size="lg">
      {isOpen && (
        <BoardsListProvider>
          <NewThreadForm
            closeFormModal={onClose}
            currentBoardName={currentBoardName}
          />
        </BoardsListProvider>
      )}
    </FormModal>
  );
}
