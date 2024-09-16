import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import useNotif from "./useNotif";
import { useAuth } from "@/features/auth";

export default function useProtectedSubmission(form, options = {}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast, ...notifs } = useNotif();
  const { setCurrentUser } = useAuth();

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
      200: async (response) => {
        const { user } = await response.json();
        form.reset();
        toast({
          status: "success",
          title: onSuccess.message,
        });
        setCurrentUser(user);
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
