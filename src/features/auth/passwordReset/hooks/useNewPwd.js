import useSubmitHandlers from "@/lib/hooks/useSubmitHandlers";
import { tooMany15, serverError } from "@/lib/constants/toasts";
import submitNewPwd from "../services/submitNewPwd";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function useNewPwd(form, token) {
  const toast = useToast();
  const navigate = useNavigate();

  const handlers = {
    400: async (response) => {
      const { feedback } = await response.json();
      feedback.forEach(({ subject, message }) =>
        form.setError(subject, { message: message })
      );
    },
    429: () => toast(tooMany15),
    500: () => toast(serverError),
    200: () => {
      form.reset();
      toast({
        status: "success",
        title: "Password Successfully Reset",
        description: "You will be redirected to login shortly.",
      });
      setTimeout(navigate, 3000, "/");
    },
    401: () =>
      toast({
        status: "error",
        title: "Failed to Reset Password",
        description: "The link is either invalid or expired.",
      }),
  };

  const onSubmit = useSubmitHandlers(
    async () => submitNewPwd(form, token),
    handlers
  );
  return onSubmit;
}
