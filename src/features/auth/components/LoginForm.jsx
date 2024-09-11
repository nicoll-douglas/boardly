import { useForm } from "react-hook-form";
import { FormControl } from "@/components/form";
import { Button } from "@chakra-ui/react";
import useLogin from "../hooks/useLogin";

export default function LoginForm() {
  const form = useForm({ shouldUnregister: true });
  const onSubmit = useLogin(form);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormControl
        label="Username"
        formRef={form}
        registerKey="username"
        placeholder="Enter username"
        data-testid="login-username"
        {...form.register("username", { required: "Username is required" })}
      />
      <FormControl
        label="Password"
        formRef={form}
        registerKey="password"
        placeholder="Enter password"
        data-testid="login-password"
        password={{ forgot: true }}
        {...form.register("password", { required: "Password is required" })}
      />
      <Button
        type="submit"
        data-testid="login-submit"
        w={"full"}
        isLoading={form.formState.isSubmitting}
      >
        Submit
      </Button>
    </form>
  );
}
