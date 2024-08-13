import { useToast } from "@chakra-ui/react";
import { networkError } from "@/lib/constants/toasts";

export default function useSubmitHandlers(submit, handlers) {
  const toast = useToast();

  const onSubmit = async () => {
    try {
      const response = await submit();
      handlers[response.status](response);
    } catch {
      toast(networkError);
    }
  };

  return onSubmit;
}
