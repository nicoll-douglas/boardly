import { useForm } from "react-hook-form";
import AvatarField from "./AvatarField";
import useProfileContext from "../../hooks/useProfileContext";
import { useEffect, useState } from "react";
import Avatar from "../ui/Avatar";
import { Button, Flex, Box, Heading } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import useProtectedSubmission from "@/lib/hooks/useProtectedSubmission";
import changeAvatar from "../../services/changeAvatar";
import useSubmitHandlers from "@/lib/hooks/useSubmitHandlers";

export default function AvatarForm({ onClose }) {
  const { isLoading, profile } = useProfileContext();
  const { avatar = null } = profile;
  const [preview, setPreview] = useState(avatar);
  const [method, setMethod] = useState(null);
  const form = useForm({ shouldUnregister: true });
  const { accessToken, handlers } = useProtectedSubmission(form, {
    onSuccess: {
      message: "Successfully updated profile picture",
      callback: onClose,
    },
    invalidate: ["GET /api/me"],
  });
  const onSubmit = useSubmitHandlers(
    async () => changeAvatar(accessToken, form, method),
    handlers
  );

  const files = form.watch("avatar");
  useEffect(() => {
    if (!files) return;
    if (files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setMethod("PUT");
      };
      reader.readAsDataURL(files[0]);
    }
  }, [files]);

  const isLoaded = !isLoading;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Flex flexDir={"column"} alignItems={"center"} mb={2} gap={2}>
        <Heading size={"sm"}>Preview</Heading>
        <Box mx={"auto"} maxW={"fit-content"}>
          <Avatar name={profile.username} src={preview} isLoaded={isLoaded} />
        </Box>
        <Button
          colorScheme="red"
          variant={"ghost"}
          onClick={() => {
            form.reset();
            setPreview(null);
            setMethod(avatar ? "DELETE" : null);
          }}
          leftIcon={<DeleteIcon />}
        >
          Remove
        </Button>
      </Flex>
      <AvatarField isLoaded={isLoaded} form={form} />
      <Button
        isDisabled={isLoading || preview === avatar}
        w={"full"}
        isLoading={form.formState.isSubmitting}
        type="submit"
        flex={1}
      >
        Save
      </Button>
    </form>
  );
}
