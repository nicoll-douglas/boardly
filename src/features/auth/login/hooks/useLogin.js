import { useToast } from "@chakra-ui/react";
import getSubmit from "../services/submit";
import useSubmitHandlers from "@/lib/hooks/useSubmitHandlers";
import { serverError, tooMany15 } from "@/lib/constants/toasts";
import useAuth from "@/lib/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function useLogin(form) {
  const submit = getSubmit(form);
  const toast = useToast();
  const { setAccessToken } = useAuth();
  const navigate = useNavigate();

  const handlers = {
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
    429: () => toast(tooMany15),
    500: () => toast(serverError),
    200: async (response) => {
      const { accessToken } = await response.json();
      setAccessToken(accessToken);
      toast({
        status: "success",
        title: "Successfully logged in",
      });
      navigate("/main");
    },
  };

  const onSubmit = useSubmitHandlers(submit, handlers);
  return onSubmit;
}
