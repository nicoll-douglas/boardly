import { useSubmitHandlers, useProtectedSubmission } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import editProfile from "../services/editProfile";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";

function valuesChanged(currentValues, defaultValues) {
  let changed = false;
  const values = Object.entries(currentValues);
  for (let i = 0; i < values.length; i++) {
    const [name, value] = values[i];
    if (defaultValues[name] !== value) {
      changed = true;
      break;
    }
  }
  return changed;
}

export default function useEditProfile(profile) {
  const defaultValues = {
    bio: profile.bio || "",
    pronouns: profile.pronouns || "",
    age: profile.age ?? "",
  };
  const form = useForm({ defaultValues });
  const queryClient = useQueryClient();
  const toast = useToast();

  const currentValues = form.watch();

  useEffect(() => {
    form.reset(defaultValues);
  }, [profile]);

  const handlers = useProtectedSubmission(() => {
    queryClient.invalidateQueries({ queryKey: ["GET /api/me"] });
    toast({
      status: "success",
      title: "Successfully updated profile",
    });
  });
  const submit = async () => editProfile(currentValues);
  const submitHandler = useSubmitHandlers(submit, handlers);

  const onSubmit = valuesChanged(currentValues, defaultValues)
    ? form.handleSubmit(submitHandler)
    : null;
  const onCancel = () => form.reset();

  return { form, onSubmit, onCancel, values: currentValues };
}
