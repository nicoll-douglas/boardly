import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { networkError, serverError, tooMany } from "@/lib/constants/toasts";

export default function useProtected(query) {
  const { data, isLoading, isError } = query;
  const toast = useToast();

  useEffect(() => {
    if (isError) toast(networkError);
  }, [isError]);

  useEffect(() => {
    if (!data) return;
    if (data.bodyUsed) return;
  }, [data]);
}
