import useSubmitHandlers from "@/lib/hooks/useSubmitHandlers";
import getSubmit from "../services/submit";
import { tooMany15, serverError } from "@/lib/constants/toasts";
import { useToast } from "@chakra-ui/react";

export default function useRegister(form) {
  const submit = getSubmit(form);
  const toast = useToast();

  const handlers = {
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
    429: () => toast(tooMany15),
    500: () => toast(serverError),
    200: () =>
      toast({
        status: "success",
        title: "Account Created",
      }),
  };

  const onSubmit = useSubmitHandlers(submit, handlers);
  return onSubmit;
}
