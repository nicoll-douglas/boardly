import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Flex, IconButton, useEditableControls, Fade } from "@chakra-ui/react";

export default function EditableControls() {
  const { isEditing, getSubmitButtonProps, getCancelButtonProps } =
    useEditableControls();

  if (!isEditing) return;

  return (
    <Fade in={isEditing}>
      <Flex gap={1}>
        <IconButton
          variant={"ghost"}
          size={"xs"}
          icon={<CheckIcon />}
          colorScheme="green"
          {...getSubmitButtonProps()}
        />
        <IconButton
          variant={"ghost"}
          size={"xs"}
          colorScheme="red"
          icon={<CloseIcon boxSize={"10px"} />}
          {...getCancelButtonProps()}
        />
      </Flex>
    </Fade>
  );
}
