import { useSubmitHandlers, useNotif } from "@/hooks";
import resetPwd from "../services/resetPwd";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

export default function useNewPwd(form, token) {
  const { toast, ...notifs } = useNotif();
  const navigate = useNavigate();
  const submit = async () => resetPwd(form, token);

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
        form.reset();
        toast({
          status: "success",
          title: "Password Successfully Reset",
          description: "You will be redirected to login shortly.",
        });
        setTimeout(navigate, 3000, "/auth/login");
      },
      401: () =>
        toast({
          status: "error",
          title: "Failed to Reset Password",
          description: "The link is either invalid or expired.",
        }),
    }),
    []
  );

  const onSubmit = useSubmitHandlers(submit, handlers);
  return onSubmit;
}
