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
import useProfileEditable from "../../hooks/useProfileEditable";
import validation from "../../data/profileValidation";
import useProfile from "../../hooks/useProfile";
import config from "@/config";

export default function AgeEditable() {
  const { data } = useProfile();
  const { form, onSubmit, onCancel, value } = useProfileEditable(
    "age",
    data.profile.age
  );
  const error = form.formState.errors.age;

  return (
    <FormControl isInvalid={error}>
      <Editable
        value={value}
        onSubmit={onSubmit}
        onCancel={onCancel}
        h={14}
        isDisabled={data.userPrivilege === config.userPrivilege.basic}
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
            {...form.register("age", validation.age)}
          />
        </NumberInput>
      </Editable>
      <FormErrorMessage mt={1}>{error?.message}</FormErrorMessage>
    </FormControl>
  );
}
