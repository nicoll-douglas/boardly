import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import useNotif from "@/lib/hooks/useNotif";

export default function useProtectedSubmission(form, options = {}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast, ...notifs } = useNotif();

  const { onSuccess = { message: "Successfully updated", callback: null } } =
    options;

  const handlers = useMemo(
    () => ({
      401: () => {
        notifs.unauthorized();
        setTimeout(navigate, 250, "/");
      },
      500: () => notifs.serverError(),
      429: () => notifs.tooMany15(),
      200: () => {
        form.reset();
        toast({
          status: "success",
          title: onSuccess.message,
        });
        if (onSuccess.callback) onSuccess.callback();
        if (options?.invalidate) {
          queryClient.invalidateQueries({
            queryKey: options.invalidate,
          });
        }
      },
    }),
    []
  );

  return { handlers };
}
