import { Button, useDisclosure } from "@chakra-ui/react";
import ToggleableForm from "@/features/ui/formToggle/components/ToggleableForm";

export default function LoginBtn(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        variant={"link"}
        onClick={onOpen}
        data-testid="login-btn"
        {...props}
      >
        Login
      </Button>
      <ToggleableForm
        isOpen={isOpen}
        onClose={onClose}
        initiallyLoginForm={true}
      />
    </>
  );
}
