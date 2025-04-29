import { useSubmitHandlers, useNotif } from "@/hooks";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import logout from "../services/logout";

export default function useLogout() {
  const { toast, ...notifs } = useNotif();
  const navigate = useNavigate();

  const handlers = useMemo(
    () => ({
      500: () => notifs.serverError(),
      429: () => notifs.tooMany(),
      200: () => {
        toast({
          status: "success",
          title: "Successfully logged out",
        });
        setTimeout(navigate, 500, "/");
      },
    }),
    []
  );

  const onSubmit = useSubmitHandlers(logout, handlers);
  return onSubmit;
}
