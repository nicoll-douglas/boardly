import { useAuth } from "@/features/auth";
import { useSubmitHandlers, useProtectedSubmission } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import editProfile from "../services/editProfile";

export default function useProfileEditable(key, defaultValue) {
  const formOptions = { defaultValues: {} };
  formOptions.defaultValues[key] = defaultValue;

  const form = useForm(formOptions);
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries([`GET /api/users/${currentUser.username}`]);
  };
  const handlers = useProtectedSubmission(onSuccess);
  const submit = async () => editProfile(currentUser, form);
  const submitHandler = useSubmitHandlers(submit, handlers);

  const currentValue = form.watch(key);
  const absentValue =
    Number.isNaN(currentValue) ||
    currentValue === null ||
    currentValue === undefined;

  const renderValue = absentValue ? "" : currentValue;

  const onSubmit =
    currentValue === defaultValue ? null : form.handleSubmit(submitHandler);

  const onCancel = () => form.reset();

  return { form, onSubmit, onCancel, value: renderValue };
}
