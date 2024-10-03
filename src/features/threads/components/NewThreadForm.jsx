import * as Ch from "@chakra-ui/react";
import { LabelWithCounter } from "@/components/form";
import { useForm } from "react-hook-form";
import validation from "../data/threadValidation";
import createPost from "../services/createPost";
import { useProtectedSubmission, useSubmitHandlers } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useBoardsList } from "@/features/boards";

export default function NewThreadForm({ closeFormModal, currentBoardName }) {
  const { data } = useBoardsList();
  const toast = Ch.useToast();

  const defaultValues = {
    title: "",
    body: "",
  };
  const { boardName } = useParams();
  if (currentBoardName) {
    defaultValues.board = currentBoardName;
  } else if (boardName) {
    defaultValues.board = boardName;
  }
  const form = useForm({
    shouldUnregister: true,
    defaultValues,
  });
  const values = form.watch();

  const queryClient = useQueryClient();
  const handlers = useProtectedSubmission(() => {
    queryClient.invalidateQueries({
      queryKey: [`GET /api/boards/${form.getValues("board")}`],
    });
    queryClient.invalidateQueries({
      queryKey: [`GET /api/me/threads`],
    });
    closeFormModal();
    toast({
      title: "Successfully posted",
      status: "success",
    });
  });
  const onSubmit = useSubmitHandlers(
    async () => createPost(form.getValues()),
    handlers
  );

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Ch.FormControl isRequired mb={6} isInvalid={form.formState.errors.board}>
        <Ch.FormLabel>Board</Ch.FormLabel>
        <Ch.Select
          placeholder="Select board"
          {...(defaultValues.board
            ? { defaultValue: defaultValues.board }
            : {})}
          {...form.register("board", validation.board)}
        >
          {data && (
            <>
              {data.boards.map(({ name, _id }) => (
                <option key={_id} value={name}>
                  {`/${name}`}
                </option>
              ))}
            </>
          )}
        </Ch.Select>
      </Ch.FormControl>
      <Ch.FormControl isRequired isInvalid={form.formState.errors.title} mb={6}>
        <LabelWithCounter
          length={values.title?.length ?? 0}
          maxLength={validation.title.maxLength.value}
        >
          Title
        </LabelWithCounter>
        <Ch.Input
          spellCheck={false}
          placeholder="What's on your mind?"
          {...form.register("title", validation.title)}
        />
        <Ch.FormErrorMessage>
          {form.formState.errors.body?.message}
        </Ch.FormErrorMessage>
      </Ch.FormControl>
      <Ch.FormControl isInvalid={form.formState.errors.body} mb={6}>
        <LabelWithCounter
          length={values.body?.length ?? 0}
          maxLength={validation.body.maxLength.value}
        >
          Body
        </LabelWithCounter>
        <Ch.Textarea
          resize={"none"}
          placeholder="Write something interesting!"
          rows={6}
          spellCheck={false}
          {...form.register("body", validation.body)}
        />
        <Ch.FormErrorMessage>
          {form.formState.errors.body?.message}
        </Ch.FormErrorMessage>
      </Ch.FormControl>
      <Ch.Button
        w={"full"}
        type="submit"
        isLoading={form.formState.isSubmitting}
      >
        Post
      </Ch.Button>
    </form>
  );
}
