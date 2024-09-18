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
import { CloseIcon, CheckIcon } from "@chakra-ui/icons";
import useEditAvatar from "../../hooks/useEditAvatar";

export default function AvatarEditable() {
  const { data } = useProfile();
  const profile = data.profile;
  const { form, avatarSrc, handleReset, handleEdit, inputProps, onSubmit } =
    useEditAvatar(profile.avatar);
  const error = form.formState.errors.avatar;

  if (data.userPrivilege === config.userPrivilege.basic) {
    return <Avatar size={"lg"} src={profile.avatar} name={profile.username} />;
  }

  return (
    <FormControl isInvalid={error} display={"flex"} gap={4}>
      <Avatar
        size={"lg"}
        src={avatarSrc}
        name={profile.username}
        onClick={handleEdit}
        cursor={"pointer"}
      >
        <VisuallyHiddenInput
          type="file"
          multiple={false}
          accept={config.imgUploads.allowedTypes.join()}
          {...inputProps}
        />
      </Avatar>
      <Flex flexDir={"column"} gap={1} my={"auto"}>
        {avatarSrc !== profile.avatar && (
          <Flex gap={1}>
            <IconButton
              variant={"ghost"}
              size={"xs"}
              icon={<CheckIcon />}
              colorScheme="green"
              onClick={onSubmit}
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
