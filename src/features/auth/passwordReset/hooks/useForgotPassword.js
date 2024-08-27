import useSubmitHandlers from "@/lib/hooks/useSubmitHandlers";
import submitEmail from "../services/submitEmail";
import useNotif from "@/lib/hooks/useNotif";

export default function useForgotPassword(form) {
  const { toast, ...notifs } = useNotif();

  const handlers = {
    404: () =>
      form.setError("email", {
        message: "Count not find a user with this email address",
      }),
    429: () => notifs.tooMany15(),
    500: () => notifs.serverError(),
    200: () => {
      form.reset();
      toast({
        title: "Email Sent",
        status: "success",
        description:
          "Please check your email and click the link to reset your password. It may be in your spam folder.",
      });
    },
  };

  const onSubmit = useSubmitHandlers(async () => submitEmail(form), handlers);
  return onSubmit;
}
