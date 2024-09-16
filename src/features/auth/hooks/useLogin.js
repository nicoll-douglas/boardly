import login from "../services/login";
import { useSubmitHandlers, useNotif } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import useAuth from "./useAuth";

export default function useLogin(form) {
  const submit = async () => login(form);
  const navigate = useNavigate();
  const { toast, ...notifs } = useNotif();
  const { setCurrentUser } = useAuth();

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
        const { user } = await response.json();
        setCurrentUser(user);
        toast({
          status: "success",
          title: "Successfully logged in",
        });
        navigate("/home");
      },
    }),
    []
  );

  const onSubmit = useSubmitHandlers(submit, handlers);
  return onSubmit;
}
