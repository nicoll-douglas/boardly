import * as Ch from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import replyValidation from "../data/replyValidation";
import { LengthCounter } from "@/components/form";
import {
  useProtectedSubmission,
  useSubmitHandlers,
  useMaxLength,
} from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import createReply from "../services/createReply";

export default function ReplyTextarea({ threadId }) {
  const queryClient = useQueryClient();
  const toast = Ch.useToast();
  const form = useForm();
  const { onChange, ...rest } = form.register("body", replyValidation);
  const { length, onChange: onLengthChange, setLength } = useMaxLength();
  const handlers = useProtectedSubmission(() => {
    queryClient.invalidateQueries({ queryKey: ["GET /api/me/replies"] });
    queryClient.invalidateQueries({
      queryKey: [`GET /api/threads/${threadId}`],
    });
    form.reset();
    setLength(0);
    toast({
      status: "success",
      title: "Successfully replied",
    });
  });
  const onSubmit = useSubmitHandlers(
    async () => createReply(form.getValues("body"), threadId, null),
    handlers
  );

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Ch.FormControl isRequired isInvalid={form.formState.errors.body} mb={2}>
        <Ch.Textarea
          rows={4}
          placeholder="What are your thoughts?"
          resize={"none"}
          onChange={(e) => {
            onChange(e);
            onLengthChange(e);
          }}
          {...rest}
        />
        <Ch.FormErrorMessage>
          {form.formState.errors.body?.message}
        </Ch.FormErrorMessage>
      </Ch.FormControl>
      <Ch.Flex gap={2}>
        <Ch.Button type="submit" size={"sm"}>
          Submit
        </Ch.Button>
        <LengthCounter
          length={length}
          maxLength={replyValidation.maxLength.value}
        />
      </Ch.Flex>
    </form>
  );
}
