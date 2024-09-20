import {
  Editable,
  EditableTextarea,
  EditablePreview,
  FormControl,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";
import EditableControls from "./EditableControls";
import validation from "../../data/profileValidation";
import useIsMe from "../../hooks/useIsMe";

export default function BioEditable({ editor }) {
  const { form, onSubmit, onCancel, values } = editor;
  const error = form.formState.errors.bio;
  const [isMe] = useIsMe();

  return (
    <FormControl isInvalid={error}>
      <Editable
        value={values.bio}
        onSubmit={onSubmit}
        onCancel={onCancel}
        isDisabled={!isMe}
        placeholder="-"
      >
        <EditablePreview
          data-cy="Profile-bio-editable-preview"
          minH={8}
          lineHeight={"22px"}
          w={"full"}
        />
        <Textarea
          as={EditableTextarea}
          variant={"flushed"}
          py={1}
          resize={"none"}
          rows={3}
          id="bio-editable-input"
          data-cy="Profile-editable-input"
          spellCheck={false}
          {...form.register("bio", validation.bio)}
        />
        <EditableControls
          mt={1}
          withLength={values.bio.length}
          maxLength={100}
          submitId={"Profile-bio-submit"}
          cancelId={"Profile-bio-cancel"}
        />
      </Editable>
      <FormErrorMessage mt={1}>{error?.message}</FormErrorMessage>
    </FormControl>
  );
}
