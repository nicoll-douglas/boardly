import useAuth from "@/lib/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import sendVerificationToken from "../services/sendVerificationToken";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useNotif from "@/lib/hooks/useNotif";

export default function useEmailVerification(token) {
  const { setAccessToken } = useAuth();
  const [UIFeedback, setUIFeedback] = useState(null);
  const navigate = useNavigate();
  const { toast, ...notifs } = useNotif();

  const { error, data, isLoading } = useQuery({
    queryKey: ["PATCH /api/auth/verify"],
    queryFn: async () => sendVerificationToken(token),
    staleTime: 0,
    retry: false,
  });

  useEffect(() => {
    if (!error) return;
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
        break;
    }
  }, [error]);

  useEffect(() => {
    if (!data) return;
    const { accessToken } = data;
    setAccessToken(accessToken);
    setUIFeedback({
      heading: "Email Verified",
      text: "You will be redirected shortly, welcome to Lorem!",
    });

    const timeout = setTimeout(() => {
      navigate("/boards/main");
      toast({
        status: "success",
        title: "Successfully logged in",
      });
    }, 3000);
    return () => clearTimeout(timeout);
  }, [data]);

  return { isLoading, UIFeedback };
}
