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
      description:
        "Something went wrong, please try again. If the problem persists, please come back later.",
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

  const notFound = () =>
    toast({
      status: "error",
      title: "Not Found",
      description: "The requested resource could not be found or was deleted.",
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
    notFound,
    toast,
  };
}
