import { useQuery } from "@tanstack/react-query";
import verify from "../services/verify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotif } from "@/hooks/ui";

export default function useEmailVerification(token) {
  const [UIFeedback, setUIFeedback] = useState(null);
  const navigate = useNavigate();
  const { toast, ...notifs } = useNotif();

  const { error, data, isLoading } = useQuery({
    queryKey: ["POST /api/auth/verify"],
    queryFn: async () => verify(token),
    staleTime: 0,
    retry: false,
  });

  useEffect(() => {
    if (!error) return;
    notifs.networkError();
  }, [error]);

  useEffect(() => {
    if (!data) return;
    switch (data.status) {
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
      case 200: {
        setUIFeedback({
          heading: "Email Verified",
          text: "You will be redirected shortly, welcome to Lorem!",
        });
        const timeout = setTimeout(() => {
          navigate("/home");
          toast({
            status: "success",
            title: "Successfully logged in",
          });
        }, 3000);
        return () => clearTimeout(timeout);
      }
    }
  }, [data]);

  return { isLoading, UIFeedback };
}
