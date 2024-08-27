import getSubmit from "../services/submit";
import useSubmitHandlers from "@/lib/hooks/useSubmitHandlers";
import useAuth from "@/lib/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useNotif from "@/lib/hooks/useNotif";

export default function useLogin(form) {
  const submit = getSubmit(form);
  const { setAccessToken } = useAuth();
  const navigate = useNavigate();
  const { toast, ...notifs } = useNotif();

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
    429: () => notifs.tooMany15(),
    500: () => notifs.serverError(),
    200: async (response) => {
      const { accessToken } = await response.json();
      setAccessToken(accessToken);
      toast({
        status: "success",
        title: "Successfully logged in",
      });
      navigate("/boards/main");
    },
  };

  const onSubmit = useSubmitHandlers(submit, handlers);
  return onSubmit;
}
