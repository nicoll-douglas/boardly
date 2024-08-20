import useAuth from "./useAuth";
import { unauthorized, serverError, tooMany } from "@/lib/constants/toasts";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useSubmitHandlers from "./useSubmitHandlers";
import submitToProtected from "@/services/submitToProtected";

export default function useProtectedSubmission(form, endpoint, options = {}) {
  const { accessToken, setAccessToken } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const {
    onSuccess = { message: "Successfully updated", callback: null },
    formData = false,
  } = options;

  const submit = async () =>
    submitToProtected(endpoint, accessToken, form, { formData });

  const handlers = {
    400: async (response) => {
      const { feedback } = await response.json();
      feedback.forEach(({ subject, message }) =>
        form.setError(subject, { message })
      );
    },
    401: () => {
      toast(unauthorized);
      setTimeout(navigate, 250, "/");
    },
    500: () => toast(serverError),
    429: () => toast(tooMany),
    200: async (response) => {
      const { accessToken: newAccessToken } = await response.json();
      if (newAccessToken) setAccessToken(newAccessToken);
      form.reset();
      toast({
        status: "success",
        title: onSuccess.message,
      });
      if (onSuccess.callback) onSuccess.callback();
    },
  };

  const onSubmit = useSubmitHandlers(submit, handlers);
  return onSubmit;
}
