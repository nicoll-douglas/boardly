import { Button, IconButton, useDisclosure, useToast } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { FormModal } from "@/components/common";
import { useForm } from "react-hook-form";
import RulesFormControl from "./RulesFormControl";
import { useProtectedSubmission, useSubmitHandlers } from "@/hooks";
import editBoard from "../services/editBoard";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

export default function EditBoardBtn({ board, ...props }) {
  const defaultValues = useMemo(() => ({ rules: board.rules || "" }), [board]);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const queryClient = useQueryClient();
  const toast = useToast();
  const form = useForm({
    shouldUnregister: true,
    defaultValues,
  });
  const handlers = useProtectedSubmission(() => {
    queryClient.invalidateQueries({ queryKey: ["GET /api/me/boards"] });
    queryClient.invalidateQueries({
      queryKey: [`GET /api/boards/${board.name}`],
    });
    toast({
      status: "success",
      title: "Successfully updated board",
    });
    onClose();
  });
  const onSubmit = useSubmitHandlers(
    async () => editBoard(board._id, form.getValues()),
    handlers
  );

  useEffect(() => {
    form.reset(defaultValues);
  }, [board]);

  return (
    <>
      <IconButton
        variant={"ghost"}
        size={"xs"}
        icon={<EditIcon />}
        onClick={onOpen}
        {...props}
      />
      <FormModal
        heading={`Edit /${board.name}`}
        isOpen={isOpen}
        onClose={onClose}
      >
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <RulesFormControl
            initialLength={board.rules?.length ?? 0}
            form={form}
          />
          <Button w={"full"} type="submit">
            Save
          </Button>
        </form>
      </FormModal>
    </>
  );
}
