import useAuth from "@/lib/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import sendVerificationToken from "../services/sendVerificationToken";
import useQueryHandlers from "@/lib/hooks/useQueryHandlers";
import { useState } from "react";
import { serverError, tooMany15 } from "@/lib/constants/toasts";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

export default function useEmailVerification(token) {
  const { setAccessToken } = useAuth();
  const [UIFeedback, setUIFeedback] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  const query = useQuery({
    queryKey: ["PATCH /api/auth/verify"],
    queryFn: async () => sendVerificationToken(token),
    staleTime: 0,
    retry: false,
  });

  const handlers = {
    401: () =>
      setUIFeedback({
        heading: "Failed to Verify",
        text: "We could not verify your email address. The link is either invalid or expired.",
      }),
    500: () =>
      setUIFeedback({
        heading: serverError.title,
        text: serverError.description,
      }),
    429: () =>
      setUIFeedback({
        heading: tooMany15.title,
        text: tooMany15.description,
      }),
    200: async (response) => {
      const { accessToken } = await response.json();
      setAccessToken(accessToken);
      setTimeout(() => {
        navigate("/main");
        toast({
          status: "success",
          title: "Successfully logged in",
        });
      }, 3000);
      setUIFeedback({
        heading: "Email Verified",
        text: "You will be redirected shortly, welcome to Lorem!",
      });
    },
  };

  useQueryHandlers(query, handlers);
  return { isLoading: query.isLoading, UIFeedback };
}
