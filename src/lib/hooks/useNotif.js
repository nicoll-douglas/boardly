import { useToast } from "@chakra-ui/react";

export default function useNotif() {
  const toast = useToast();

  const networkError = () =>
    toast({
      status: "error",
      title: "Network Error",
      description: "Something went wrong, please try again.",
    });

  const serverError = () =>
    toast({
      status: "error",
      title: "Server Error",
      description: "Something went wrong, please try again later.",
    });

  const tooMany15 = () =>
    toast({
      status: "warning",
      title: "Too Many Requests",
      description: "Please try again in 15 minutes.",
    });

  const tooMany = () =>
    toast({
      status: "warning",
      title: "Too many requests",
    });

  const unauthorized = () =>
    toast({
      status: "warning",
      title: "Unauthorized",
      description: "Please login to continue.",
    });

  const genericError = () =>
    toast({
      status: "error",
      title: "Error",
    });

  return {
    networkError,
    serverError,
    tooMany15,
    tooMany,
    unauthorized,
    genericError,
    toast,
  };
}
