import { useSubmitHandlers, useNotif } from "@/hooks";
import register from "../services/register";
import { useMemo } from "react";

export default function useRegister(form, onClose) {
  const { toast, ...notifs } = useNotif();
  const submit = async () => register(form);

  const handlers = useMemo(
    () => ({
      400: async (response) => {
        const { feedback } = await response.json();
        feedback.forEach(({ subject, message }) =>
          form.setError(subject, { message: message })
        );
      },
      409: async (response) => {
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
          title: "Account Created",
          description:
            "Please check your email and click the link to verify your account.",
        });
        if (onClose) onClose();
      },
    }),
    []
  );

  const onSubmit = useSubmitHandlers(submit, handlers);
  return onSubmit;
}
