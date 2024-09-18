import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import validation from "../data/profileValidation";
import editAvatar from "../services/editAvatar";
import { useAuth } from "@/features/auth";
import { useSubmitHandlers, useProtectedSubmission } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";

export default function useEditAvatar(initialSrc) {
  const queryClient = useQueryClient();
  const [avatarSrc, setAvatarSrc] = useState(initialSrc);
  const form = useForm();
  const elementRef = useRef(null);
  const { ref, ...rest } = form.register("avatar", validation.avatar);
  const { currentUser } = useAuth();

  const files = form.watch("avatar");

  const inputRef = (e) => {
    ref(e);
    elementRef.current = e;
  };

  const inputProps = { ref: inputRef, ...rest };

  const handleReset = () => {
    form.reset();
    setAvatarSrc(initialSrc);
    elementRef.current.value = "";
  };

  const handleEdit = () => {
    elementRef.current.click();
  };

  const onSuccess = () => {
    queryClient.invalidateQueries([`GET /api/users/${currentUser.username}`]);
  };
  const submit = async () => editAvatar(currentUser.username, files?.[0]);
  const handlers = useProtectedSubmission(onSuccess);
  const onSubmit = useSubmitHandlers(submit, handlers);

  useEffect(() => {
    URL.revokeObjectURL(avatarSrc);

    if (!files?.[0]) {
      setAvatarSrc(initialSrc);
      return;
    }

    const uploadedUrl = URL.createObjectURL(files[0]);
    setAvatarSrc(uploadedUrl);

    return () => URL.revokeObjectURL(uploadedUrl);
  }, [files]);

  return { avatarSrc, handleReset, handleEdit, form, inputProps, onSubmit };
}
