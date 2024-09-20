import {
  Editable,
  EditableInput,
  EditablePreview,
  Input,
  Flex,
  Spacer,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import EditableControls from "./EditableControls";
import validation from "../../data/profileValidation";
import useIsMe from "../../hooks/useIsMe";

export default function PronounEditable({ editor }) {
  const { form, onSubmit, onCancel, values } = editor;
  const error = form.formState.errors.pronouns;
  const [isMe] = useIsMe();

  return (
    <FormControl isInvalid={error}>
      <Editable
        h={14}
        value={values.pronouns}
        onSubmit={onSubmit}
        onCancel={onCancel}
        isDisabled={!isMe}
        placeholder="-"
      >
        <Flex>
          <FormLabel mb={0}>Pronouns</FormLabel>
          <Spacer />
          <EditableControls />
        </Flex>
        <EditablePreview h={8} minW={"full"} />
        <Input
          as={EditableInput}
          height={8}
          variant={"flushed"}
          data-cy="Profile-editable-input"
          {...form.register("pronouns", validation.pronouns)}
        />
      </Editable>
      <FormErrorMessage mt={1}>{error?.message}</FormErrorMessage>
    </FormControl>
  );
}
