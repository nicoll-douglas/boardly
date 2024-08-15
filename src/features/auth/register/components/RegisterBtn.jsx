import { Button, useDisclosure } from "@chakra-ui/react";
import ToggleableForm from "@/features/ui/formToggle/components/ToggleableForm";

export default function RegisterBtn({ children = "Sign up", ...rest }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} {...rest}>
        {children}
      </Button>
      <ToggleableForm
        isOpen={isOpen}
        onClose={onClose}
        initiallyLoginForm={false}
      />
    </>
  );
}
