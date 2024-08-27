import useSubmitHandlers from "@/lib/hooks/useSubmitHandlers";
import getSubmit from "../services/submit";
import useNotif from "@/lib/hooks/useNotif";

export default function useRegister(form, onClose) {
  const submit = getSubmit(form);
  const { toast, ...notifs } = useNotif();

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
    429: () => notifs.tooMany15(),
    500: () => notifs.serverError(),
    200: () => {
      toast({
        status: "success",
        title: "Account Created",
        description:
          "Please check your email and click the link to verify your account.",
      });
      onClose();
    },
  };

  const onSubmit = useSubmitHandlers(submit, handlers);
  return onSubmit;
}
