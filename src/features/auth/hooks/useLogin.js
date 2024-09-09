import login from "../services/login";
import useSubmitHandlers from "@/lib/hooks/useSubmitHandlers";
import { useNavigate } from "react-router-dom";
import useNotif from "@/lib/hooks/useNotif";
import { useMemo } from "react";
import useAuth from "@/lib/hooks/useAuth";

export default function useLogin(form) {
  const submit = async () => login(form);
  const navigate = useNavigate();
  const { toast, ...notifs } = useNotif();
  const { setAccessToken } = useAuth();

  const handlers = useMemo(
    () => ({
      400: async (response) => {
        const { feedback } = await response.json();
        feedback.forEach(({ subject, message }) =>
          form.setError(subject, { message: message })
        );
      },
      404: () => {
        form.setError("username", {
          message: "Username or password is incorrect",
        });
        form.setError("password", {
          message: "Username or password is incorrect",
        });
      },
      401: () => {
        toast({
          status: "warning",
          title: "Verification Needed",
          description: "Please check your email to verify your account.",
        });
      },
      429: () => notifs.tooMany15(),
      500: () => notifs.serverError(),
      200: async (response) => {
        const { accessToken } = await response.json();
        if (accessToken) setAccessToken(accessToken);
        toast({
          status: "success",
          title: "Successfully logged in",
        });
        navigate("/boards/main");
      },
    }),
    []
  );

  const onSubmit = useSubmitHandlers(submit, handlers);
  return onSubmit;
}
