import { FormModal } from "@/components/common";
import { LoginForm, Optimistic } from "@/features/auth";
import { Button, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <Optimistic>
      <FormModal isOpen={true} motionPreset="none" heading="Login">
        <LoginForm />
        <Center>
          <Button
            variant={"link"}
            mx={"auto"}
            size={"sm"}
            display={"block"}
            mt={2}
            as={Link}
            to={"/auth/register"}
          >
            Not a member?
          </Button>
        </Center>
      </FormModal>
    </Optimistic>
  );
}
