import { useForm } from "react-hook-form";
import { FormControl } from "@/components/form";
import { Button } from "@chakra-ui/react";
import useLogin from "../hooks/useLogin";

export default function LoginForm() {
  const form = useForm({ shouldUnregister: true });
  const onSubmit = useLogin(form);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} aria-label="Login Form">
      <FormControl
        label="Username"
        formRef={form}
        registerKey="username"
        inputTestId="LoginForm-username"
        errorTestId="LoginForm-username-error"
        placeholder="Enter username"
        {...form.register("username", { required: "Username is required" })}
      />
      <FormControl
        label="Password"
        formRef={form}
        registerKey="password"
        inputTestId="LoginForm-password"
        errorTestId="LoginForm-password-error"
        placeholder="Enter password"
        password={{ forgot: true }}
        {...form.register("password", { required: "Password is required" })}
      />
      <Button
        type="submit"
        w={"full"}
        data-cy="LoginForm-submit"
        isLoading={form.formState.isSubmitting}
      >
        Submit
      </Button>
    </form>
  );
}
