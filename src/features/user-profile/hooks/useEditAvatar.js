import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import editAvatar from "../services/editAvatar";
import deleteAvatar from "../services/deleteAvatar";
import { useSubmitHandlers, useProtectedSubmission } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import useProfile from "./useProfile";
import { useToast } from "@chakra-ui/react";

export default function useEditAvatar() {
  const { data } = useProfile();
  const [avatarSrc, setAvatarSrc] = useState(data.profile.avatar);
  const [editHidden, setEditHidden] = useState(true);

  const queryClient = useQueryClient();
  const form = useForm();
  const inputRef = useRef(null);
  const files = form.watch("avatar");

  const handleReset = () => {
    form.reset();
    setAvatarSrc(data.profile.avatar);
    setEditHidden(true);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  const handleEdit = () => inputRef.current.click();

  const toast = useToast();

  const editHandlers = useProtectedSubmission(() => {
    queryClient.invalidateQueries({ queryKey: ["GET /api/me"] });
    setEditHidden(true);
    setAvatarSrc(data.profile.avatar);
    toast({
      status: "success",
      title: "Successfully updated avatar",
    });
  });

  const deleteHandlers = useProtectedSubmission(() => {
    queryClient.invalidateQueries({ queryKey: ["GET /api/me"] });
    setEditHidden(true);
    setAvatarSrc(data.profile.avatar);
    toast({
      status: "success",
      title: "Successfully removed avatar",
    });
  });

  const onDelete = useSubmitHandlers(deleteAvatar, deleteHandlers);
  const onEdit = useSubmitHandlers(
    async () => editAvatar(files?.[0]),
    editHandlers
  );

  useEffect(() => {
    URL.revokeObjectURL(avatarSrc);
    if (!files?.[0]) {
      handleReset();
    } else {
      setAvatarSrc(URL.createObjectURL(files[0]));
      setEditHidden(false);
    }
    return () => URL.revokeObjectURL(avatarSrc);
  }, [files]);

  return {
    avatarSrc,
    editHidden,
    inputRef,
    form,
    handleReset,
    handleEdit,
    onEdit: form.handleSubmit(onEdit),
    onDelete,
  };
}
