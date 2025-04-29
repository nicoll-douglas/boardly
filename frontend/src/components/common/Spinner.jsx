import { Center, Spinner as ChakraSpinner } from "@chakra-ui/react";
import { useShowDelay } from "@/hooks";

export default function Spinner({ size = "lg", ...props }) {
  const show = useShowDelay();

  return (
    show && (
      <Center p={4} flex={1} {...props}>
        <ChakraSpinner size={size} />
      </Center>
    )
  );
}
