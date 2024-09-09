import { Button } from "@chakra-ui/react";

export default function LoginBtn(props) {
  return (
    <Button variant={"link"} data-testid="login-btn" {...props}>
      Login
    </Button>
  );
}
