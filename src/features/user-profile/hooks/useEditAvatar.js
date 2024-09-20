import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import validation from "../data/profileValidation";
import editAvatar from "../services/editAvatar";
import { useSubmitHandlers, useProtectedSubmission } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import useProfile from "./useProfile";
import { useToast } from "@chakra-ui/react";

export default function useEditAvatar() {
  const { data } = useProfile();
  const queryClient = useQueryClient();
  const [avatarSrc, setAvatarSrc] = useState(data.profile.avatar);
  const form = useForm();
  const elementRef = useRef(null);
  const { ref, ...rest } = form.register("avatar", validation.avatar);
  const toast = useToast();

  const files = form.watch("avatar");

  const inputRef = (e) => {
    ref(e);
    elementRef.current = e;
  };

  const inputProps = { ref: inputRef, ...rest };

  const handleReset = () => {
    form.reset();
    setAvatarSrc(data.profile.avatar);
    elementRef.current.value = "";
  };

  const handleEdit = () => {
    elementRef.current.click();
  };

  const submit = async () => editAvatar(files?.[0]);
  const handlers = useProtectedSubmission(() => {
    queryClient.invalidateQueries({ queryKey: ["GET /api/me"] });
    toast({
      status: "success",
      title: "Successfully updated avatar",
    });
  });
  const onSubmit = useSubmitHandlers(submit, handlers);

  useEffect(() => {
    form.reset();
    setAvatarSrc(data.profile.avatar);
    if (elementRef.current) {
      elementRef.current.value = "";
    }
  }, [data]);

  useEffect(() => {
    URL.revokeObjectURL(avatarSrc);

    if (!files?.[0]) {
      setAvatarSrc(data.profile.avatar);
      return;
    }

    const uploadedUrl = URL.createObjectURL(files[0]);
    setAvatarSrc(uploadedUrl);

    return () => URL.revokeObjectURL(uploadedUrl);
  }, [files]);

  return {
    avatarSrc,
    handleReset,
    handleEdit,
    form,
    inputProps,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
