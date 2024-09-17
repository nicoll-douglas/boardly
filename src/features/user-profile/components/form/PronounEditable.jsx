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
import useProfileEditable from "../../hooks/useProfileEditable";
import validation from "../../data/profileValidation";

export default function PronounEditable({ defaultValue, isDisabled }) {
  const { form, onSubmit, onCancel, value } = useProfileEditable(
    "pronouns",
    defaultValue
  );
  const error = form.formState.errors.pronouns;

  return (
    <FormControl isInvalid={error}>
      <Editable
        defaultValue={defaultValue}
        h={14}
        value={value}
        onSubmit={onSubmit}
        onCancel={onCancel}
        isDisabled={isDisabled}
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
          {...form.register("pronouns", validation.pronouns)}
        />
      </Editable>
      <FormErrorMessage mt={1}>{error?.message}</FormErrorMessage>
    </FormControl>
  );
}
