import FormControl from "@/components/form/FormControl";
import { Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import usernameValidation from "../data/usernameValidation";
import passwordValidation from "../data/passwordValidation";
import useRegister from "../hooks/useRegister";

export default function RegisterForm() {
  const form = useForm({ shouldUnregister: true });
  const onSubmit = useRegister(form);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormControl
        formRef={form}
        registerKey={"email"}
        placeholder="Enter email"
        label="Email"
        helperText="We'll use your email to help you sign up"
        helpersAsList={false}
        {...form.register("email", { required: "Email is required" })}
      />
      <FormControl
        formRef={form}
        registerKey={"confirmEmail"}
        placeholder="Re-enter email"
        label="Confirm email"
        {...form.register("confirmEmail", {
          required: "Please confirm your email",
          validate: (value) =>
            value === form.getValues("email") || "Emails do not match",
        })}
      />
      <FormControl
        formRef={form}
        registerKey={"username"}
        placeholder="Enter username"
        label="Username"
        helperText={[
          "Must be no more than 20 characters long",
          "May only contain letters, numbers, underscores and hyphens",
        ]}
        {...form.register("username", usernameValidation)}
      />
      <FormControl
        formRef={form}
        registerKey="password"
        placeholder="Enter password"
        label="Password"
        helperText={[
          "Must be at least 5 characters long",
          "Must be no more than 30 characters long",
          "Must contain at least one letter",
          "Must contain at least one number",
        ]}
        password={true}
        {...form.register("password", passwordValidation)}
      />
      <Button type="submit" w={"full"} isLoading={form.formState.isSubmitting}>
        Submit
      </Button>
    </form>
  );
}
