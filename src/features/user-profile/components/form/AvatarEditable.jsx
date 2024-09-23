import {
  Avatar,
  Flex,
  FormControl,
  FormErrorMessage,
  IconButton,
  VisuallyHiddenInput,
} from "@chakra-ui/react";
import useProfile from "../../hooks/useProfile";
import config from "@/config";
import { CloseIcon, CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import useEditAvatar from "../../hooks/useEditAvatar";
import useIsMe from "../../hooks/useIsMe";
import validation from "../../data/profileValidation";

export default function AvatarEditable() {
  const { data } = useProfile();
  const {
    form,
    inputRef,
    avatarSrc,
    editHidden,
    handleReset,
    handleEdit,
    onEdit,
    onDelete,
  } = useEditAvatar();
  const [isMe] = useIsMe();
  const { ref, ...inputProps } = form.register("avatar", validation.avatar);
  const error = form.formState.errors.avatar;

  if (!isMe) {
    return (
      <Avatar
        size={"lg"}
        src={data.profile.avatar}
        name={data.profile.username}
      />
    );
  }

  return (
    <FormControl isInvalid={error} display={"flex"} gap={4}>
      <Avatar
        size={"lg"}
        src={avatarSrc}
        name={data.profile.username}
        onClick={handleEdit}
        cursor={"pointer"}
      >
        <VisuallyHiddenInput
          type="file"
          multiple={false}
          accept={config.imgUploads.allowedTypes.join()}
          data-cy="Profile-editable-input"
          ref={(e) => {
            ref(e);
            inputRef.current = e;
          }}
          {...inputProps}
        />
      </Avatar>
      <Flex flexDir={"column"} gap={1} my={"auto"}>
        {editHidden ? (
          data.profile.hasAvatar && (
            <IconButton
              size={"xs"}
              variant={"ghost"}
              colorScheme="red"
              icon={<DeleteIcon />}
              onClick={onDelete}
            />
          )
        ) : (
          <Flex gap={1}>
            <IconButton
              variant={"ghost"}
              size={"xs"}
              icon={<CheckIcon />}
              colorScheme="green"
              onClick={onEdit}
            />
            <IconButton
              variant={"ghost"}
              size={"xs"}
              colorScheme="red"
              icon={<CloseIcon boxSize={"10px"} />}
              onClick={handleReset}
            />
          </Flex>
        )}
        <FormErrorMessage mt={0}>{error?.message}</FormErrorMessage>
      </Flex>
    </FormControl>
  );
}
