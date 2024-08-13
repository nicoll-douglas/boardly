import { Button, useDisclosure } from "@chakra-ui/react";
import FormModal from "@/components/common/FormModal";
import LoginForm from "./LoginForm";

export default function LoginBtn(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button variant={"link"} onClick={onOpen} {...props}>
        Login
      </Button>
      <FormModal heading={"Login"} isOpen={isOpen} onClose={onClose}>
        <LoginForm />
      </FormModal>
    </>
  );
}
