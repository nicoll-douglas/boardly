import { FormModal } from "@/components/common";
import { LoginForm, RegisterForm } from "@/features/auth";
import { Button } from "@chakra-ui/react";

export default function ToggleableForm({
  isOpen,
  onClose,
  isLoginForm,
  onToggle,
}) {
  return (
    <FormModal
      heading={isLoginForm ? "Login" : "Sign Up"}
      isOpen={isOpen}
      onClose={onClose}
    >
      {isLoginForm ? <LoginForm /> : <RegisterForm onClose={onClose} />}
      <Button
        variant={"link"}
        mx={"auto"}
        size={"sm"}
        display={"block"}
        mt={2}
        onClick={onToggle}
      >
        {isLoginForm ? "Not a member?" : "Already a member?"}
      </Button>
    </FormModal>
  );
}
