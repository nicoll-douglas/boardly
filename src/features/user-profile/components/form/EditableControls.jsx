import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Flex,
  IconButton,
  useEditableControls,
  Fade,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function EditableControls({
  withLength,
  maxLength,
  submitId,
  cancelId,
  ...rest
}) {
  const { isEditing, getSubmitButtonProps, getCancelButtonProps } =
    useEditableControls();
  const errorTextColor = useColorModeValue("red.500", "red.300");

  if (!isEditing) return;

  return (
    <Fade in={isEditing}>
      <Flex gap={1} {...rest}>
        <IconButton
          variant={"ghost"}
          size={"xs"}
          icon={<CheckIcon />}
          colorScheme="green"
          data-cy={submitId}
          aria-label="Confirm"
          {...getSubmitButtonProps()}
        />
        <IconButton
          variant={"ghost"}
          size={"xs"}
          colorScheme="red"
          data-cy={cancelId}
          icon={<CloseIcon boxSize={"10px"} />}
          aria-label="Cancel"
          {...getCancelButtonProps()}
        />
        <Spacer />
        {Number.isInteger(withLength) && (
          <Flex fontSize={"13px"}>
            <Text color={withLength > maxLength && errorTextColor}>
              {maxLength - withLength}
            </Text>
          </Flex>
        )}
      </Flex>
    </Fade>
  );
}
