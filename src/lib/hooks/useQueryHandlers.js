import { useToast } from "@chakra-ui/react";
import { networkError } from "@/lib/constants/toasts";
import { useEffect } from "react";

export default function useQueryHandlers(query, handlers) {
  const { data, isError } = query;
  const toast = useToast();

  useEffect(() => {
    if (isError) toast(networkError);
  }, [isError]);

  useEffect(() => {
    if (!data) return;
    handlers[data.status](data);
  }, [data]);

  return query;
}
