import { DeleteIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  HStack,
  IconButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useProtectedSubmission, useSubmitHandlers } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import deleteBoard from "../services/deleteBoard";

export default function DeleteBoardBtn({ board }) {
  const queryClient = useQueryClient();
  const cancelRef = useRef();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handlers = useProtectedSubmission(() => {
    queryClient.invalidateQueries({ queryKey: ["GET /api/me/boards"] });
    queryClient.invalidateQueries({
      queryKey: [`GET /api/boards`],
    });
    onClose();
    toast({
      status: "success",
      title: "Successfully deleted board",
    });
  });
  const onSubmit = useSubmitHandlers(
    async () => deleteBoard(board._id),
    handlers
  );

  return (
    <>
      <IconButton
        icon={<DeleteIcon />}
        colorScheme="red"
        variant={"ghost"}
        size={"xs"}
        onClick={onOpen}
        zIndex={80}
        aria-label="Delete board"
      />
      <AlertDialog isOpen={isOpen} onClose={onClose} size={"sm"}>
        <AlertDialogOverlay />
        <AlertDialogContent mx={4}>
          <AlertDialogHeader>{`Delete /${board.name}?`}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to delete this board? This action cannot be
            undone.
          </AlertDialogBody>
          <AlertDialogFooter>
            <HStack gap={3}>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onSubmit}>
                Delete
              </Button>
            </HStack>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
