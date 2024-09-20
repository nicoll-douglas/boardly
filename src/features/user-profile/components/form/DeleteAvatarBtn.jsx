import { DeleteIcon } from "@chakra-ui/icons";
import { IconButton, useToast } from "@chakra-ui/react";
import deleteAvatar from "../../services/deleteAvatar";
import { useProtectedSubmission, useSubmitHandlers } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";

export default function DeleteAvatarBtn() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const handlers = useProtectedSubmission(() => {
    queryClient.invalidateQueries({ queryKey: ["GET /api/me"] });
    toast({
      status: "success",
      title: "Successfully removed avatar",
    });
  });
  const onSubmit = useSubmitHandlers(deleteAvatar, handlers);

  return (
    <IconButton
      size={"xs"}
      variant={"ghost"}
      colorScheme="red"
      icon={<DeleteIcon />}
      onClick={onSubmit}
    />
  );
}
