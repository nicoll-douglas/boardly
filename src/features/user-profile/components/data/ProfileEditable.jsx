import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  Heading,
  Input,
  Tooltip,
} from "@chakra-ui/react";

export default function ProfileEditable({ defaultValue }) {
  return (
    <Box>
      <Heading size={"sm"}>Pronouns</Heading>
      <Editable defaultValue={defaultValue}>
        <Tooltip label="Click to edit" shouldWrapChildren={true} size={"sm"}>
          <EditablePreview />
        </Tooltip>
        <Input as={EditableInput} height={8} variant={"flushed"} />
      </Editable>
    </Box>
  );
}
