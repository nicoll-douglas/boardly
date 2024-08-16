import { Button } from "@chakra-ui/react";

export default function RegisterBtn({ children = "Sign up", ...rest }) {
  return <Button {...rest}>{children}</Button>;
}
