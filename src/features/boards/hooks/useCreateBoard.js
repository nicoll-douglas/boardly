import { useSubmitHandlers, useNotif } from "@/hooks";
import createBoard from "../services/createBoard";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export default function useRegister(onSuccess) {
  const form = useForm({ shouldUnregister: true });
  const { toast, ...notifs } = useNotif();
  const submit = async () => createBoard(form.getValues());
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handlers = useMemo(
    () => ({
      401: () => {
        notifs.unauthorized();
        navigate("/auth/login");
      },
      409: async (response) => {
        const { feedback } = await response.json();
        feedback.forEach(({ subject, message }) =>
          form.setError(subject, { message: message })
        );
      },
      429: () => notifs.tooMany(),
      500: () => notifs.serverError(),
      200: () => {
        queryClient.invalidateQueries({ queryKey: ["GET /api/me/boards"] });
        queryClient.invalidateQueries({ queryKey: ["GET /api/boards"] });
        toast({
          status: "success",
          title: "Successfully created board",
        });
        if (onSuccess) onSuccess();
      },
    }),
    []
  );

  const onSubmit = useSubmitHandlers(submit, handlers);
  return { form, onSubmit };
}
