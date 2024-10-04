import { FormModal } from "@/components/common";
import { RegisterForm } from "@/features/auth";
import { Center, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <FormModal isOpen={true} motionPreset="none" heading="Sign Up">
      <RegisterForm />
      <Center>
        <Button
          variant={"link"}
          mx={"auto"}
          size={"sm"}
          display={"block"}
          mt={2}
          as={Link}
          to={"/auth/login"}
        >
          Already a member?
        </Button>
      </Center>
    </FormModal>
  );
}
