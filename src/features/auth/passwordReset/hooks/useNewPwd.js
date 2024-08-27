import useSubmitHandlers from "@/lib/hooks/useSubmitHandlers";
import submitNewPwd from "../services/submitNewPwd";
import { useNavigate } from "react-router-dom";
import useNotif from "@/lib/hooks/useNotif";

export default function useNewPwd(form, token) {
  const { toast, ...notifs } = useNotif();
  const navigate = useNavigate();

  const handlers = {
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
