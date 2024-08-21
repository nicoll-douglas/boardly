import useAuth from "./useAuth";
import { unauthorized, serverError, tooMany } from "@/lib/constants/toasts";
import { useToast } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

export default function useProtectedSubmission(form, options = {}) {
  const { accessToken, setAccessToken } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { onSuccess = { message: "Successfully updated", callback: null } } =
    options;

  const handlers = useMemo(
    () => ({
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
        if (options?.invalidate) {
          queryClient.invalidateQueries({
            queryKey: options.invalidate,
          });
        }
      },
    }),
    []
  );

  return { accessToken, handlers };
}
