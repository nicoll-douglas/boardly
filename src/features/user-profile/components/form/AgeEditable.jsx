import {
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Spacer,
  NumberInputField,
  NumberInput,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import EditableControls from "./EditableControls";
import { isDigits } from "@/lib/utils";
import validation from "../../data/profileValidation";
import useIsMe from "../../hooks/useIsMe";

export default function AgeEditable({ editor }) {
  const { form, onSubmit, onCancel, values } = editor;
  const error = form.formState.errors.age;
  const [isMe] = useIsMe();

  return (
    <FormControl isInvalid={error}>
      <Editable
        value={values.age}
        onSubmit={onSubmit}
        onCancel={onCancel}
        h={14}
        isDisabled={!isMe}
        placeholder="-"
      >
        <Flex>
          <FormLabel mb={0}>Age</FormLabel>
          <Spacer />
          <EditableControls />
        </Flex>
        <EditablePreview minW={"full"} h={8} />
        <NumberInput variant={"flushed"} isValidCharacter={isDigits}>
          <NumberInputField
            as={EditableInput}
            height={8}
            data-cy="Profile-editable-input"
            {...form.register("age", validation.age)}
          />
        </NumberInput>
      </Editable>
      <FormErrorMessage mt={1}>{error?.message}</FormErrorMessage>
    </FormControl>
  );
}
