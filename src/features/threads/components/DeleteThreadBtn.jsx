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
import deleteThread from "../services/deleteThread";

export default function DeleteThreadBtn({ threadId, boardName }) {
  const queryClient = useQueryClient();
  const cancelRef = useRef();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handlers = useProtectedSubmission(() => {
    queryClient.invalidateQueries({ queryKey: ["GET /api/me"] });
    queryClient.invalidateQueries({
      queryKey: [`GET /api/boards/${boardName}`],
    });
    onClose();
    toast({
      status: "success",
      title: "Successfully deleted thread",
    });
  });
  const onSubmit = useSubmitHandlers(
    async () => deleteThread(threadId),
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
      />
      <AlertDialog isOpen={isOpen} onClose={onClose} size={"sm"}>
        <AlertDialogOverlay />
        <AlertDialogContent mx={4}>
          <AlertDialogHeader>Delete Thread?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to delete this thread? This action cannot be
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
