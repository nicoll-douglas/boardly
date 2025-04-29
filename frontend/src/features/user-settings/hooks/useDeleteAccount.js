import { useSubmitHandlers, useNotif } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import deleteAccount from "../services/deleteAccount";

export default function useDeleteAccount() {
  const form = useForm();
  const { toast, ...notifs } = useNotif();
  const navigate = useNavigate();
  const submit = async () => deleteAccount(form.getValues());

  const handlers = useMemo(
    () => ({
      400: async (response) => {
        const { feedback } = await response.json();
        feedback.forEach(({ subject, message }) =>
          form.setError(subject, { message: message })
        );
      },
      429: () => notifs.tooMany15(),
      500: () => notifs.serverError(),
      200: () => {
        toast({
          status: "success",
          title: "Account successfully deleted",
          description: "You will be redirected shortly.",
        });
        setTimeout(navigate, 3000, "/");
      },
      401: () => {
        notifs.unauthorized();
        navigate("/auth/login");
      },
    }),
    []
  );

  const onSubmit = useSubmitHandlers(submit, handlers);
  return { form, onSubmit };
}
