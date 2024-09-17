import {
  Editable,
  EditableTextarea,
  EditablePreview,
  FormControl,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";
import EditableControls from "./EditableControls";
import useProfileEditable from "../../hooks/useProfileEditable";
import validation from "../../data/profileValidation";

export default function BioEditable({ defaultValue, isDisabled }) {
  const { form, onSubmit, onCancel, value } = useProfileEditable(
    "bio",
    defaultValue
  );
  const error = form.formState.errors.bio;

  return (
    <FormControl isInvalid={error}>
      <Editable
        value={value}
        onSubmit={onSubmit}
        onCancel={onCancel}
        isDisabled={isDisabled}
        placeholder="-"
      >
        <EditablePreview minH={8} lineHeight={"22px"} w={"full"} />
        <Textarea
          as={EditableTextarea}
          variant={"flushed"}
          py={1}
          resize={"none"}
          rows={3}
          {...form.register("bio", validation.bio)}
        />
        <EditableControls mt={1} />
      </Editable>
      <FormErrorMessage mt={1}>{error?.message}</FormErrorMessage>
    </FormControl>
  );
}
