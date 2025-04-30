import { useQuery } from "@tanstack/react-query";
import verify from "../services/verify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotif, useQueryHandlers } from "@/hooks";
// import useAuth from "./useAuth";

export default function useEmailVerification(token) {
  const [UIFeedback, setUIFeedback] = useState(null);
  const navigate = useNavigate();
  const { toast, ...notifs } = useNotif();
  // const { setCurrentUser } = useAuth();

  const { error, data, isLoading } = useQuery({
    queryKey: ["POST /api/auth/verify"],
    queryFn: async () => verify(token),
    staleTime: 0,
    retry: false,
  });

  const onError = () => {
    switch (error.status) {
      case 401:
        setUIFeedback({
          heading: "Failed to Verify",
          text: "We could not verify your email address. The link is either invalid or expired.",
        });
        break;
      case 500:
        notifs.serverError();
        break;
      case 429:
        notifs.tooMany15();
        break;
      case 0:
        notifs.networkError();
    }
  };

  const onData = () => {
    setUIFeedback({
      heading: "Email Verified",
      text: `You will be redirected shortly, welcome to ${
        import.meta.env.VITE_APP_TITLE
      }!`,
    });
    // setCurrentUser(data.user);
    const timeout = setTimeout(() => {
      navigate("/home");
      toast({
        status: "success",
        title: "Successfully logged in",
      });
    }, 3000);
    return () => clearTimeout(timeout);
  };

  useQueryHandlers(error, data, onError, onData);

  return { isLoading, UIFeedback };
}
