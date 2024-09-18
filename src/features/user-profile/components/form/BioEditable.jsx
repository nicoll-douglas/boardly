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
import useProfile from "../../hooks/useProfile";
import config from "@/config";

export default function BioEditable() {
  const { data } = useProfile();
  const { form, onSubmit, onCancel, value } = useProfileEditable(
    "bio",
    data.profile.bio
  );
  const error = form.formState.errors.bio;

  return (
    <FormControl isInvalid={error}>
      <Editable
        value={value}
        onSubmit={onSubmit}
        onCancel={onCancel}
        isDisabled={data.userPrivilege === config.userPrivilege.basic}
        placeholder="-"
      >
        <EditablePreview minH={8} lineHeight={"22px"} w={"full"} />
        <Textarea
          as={EditableTextarea}
          variant={"flushed"}
          py={1}
          resize={"none"}
          rows={3}
          spellCheck={false}
          {...form.register("bio", validation.bio)}
        />
        <EditableControls mt={1} withLength={value.length} maxLength={100} />
      </Editable>
      <FormErrorMessage mt={1}>{error?.message}</FormErrorMessage>
    </FormControl>
  );
}
