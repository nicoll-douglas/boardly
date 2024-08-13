import { Button, useDisclosure } from "@chakra-ui/react";
import FormModal from "@/components/common/FormModal";
import RegisterForm from "./RegisterForm";

export default function RegisterBtn({ children = "Sign up", ...rest }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} {...rest}>
        {children}
      </Button>
      <FormModal isOpen={isOpen} onClose={onClose} heading="Sign Up">
        <RegisterForm />
      </FormModal>
    </>
  );
}
