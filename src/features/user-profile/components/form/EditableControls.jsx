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

export default function EditableControls({ withLength, maxLength, ...rest }) {
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
          {...getSubmitButtonProps()}
        />
        <IconButton
          variant={"ghost"}
          size={"xs"}
          colorScheme="red"
          icon={<CloseIcon boxSize={"10px"} />}
          {...getCancelButtonProps()}
        />
        <Spacer />
        {Number.isInteger(withLength) && (
          <Flex fontSize={"13px"}>
            <Text color={withLength > maxLength && errorTextColor}>
              {withLength}
            </Text>
            /{maxLength}
          </Flex>
        )}
      </Flex>
    </Fade>
  );
}
