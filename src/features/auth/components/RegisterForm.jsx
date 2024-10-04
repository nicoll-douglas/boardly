import { FormControl } from "@/components/form";
import { Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import usernameValidation from "../data/usernameValidation";
import passwordValidation from "../data/passwordValidation";
import useRegister from "../hooks/useRegister";
import { helperText } from "@/lib/constants";

export default function RegisterForm({ onClose }) {
  const form = useForm({ shouldUnregister: true });
  const onSubmit = useRegister(form, onClose);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} aria-label="Registration Form">
      <FormControl
        formRef={form}
        registerKey={"email"}
        placeholder="Enter email"
        label="Email"
        helperText="We'll use your email to help you sign up"
        helpersAsList={false}
        inputTestId="RegisterForm-email"
        errorTestId="RegisterForm-email-error"
        {...form.register("email", { required: "Email is required" })}
      />
      <FormControl
        formRef={form}
        registerKey={"confirmEmail"}
        placeholder="Re-enter email"
        inputTestId="RegisterForm-confirmEmail"
        errorTestId="RegisterForm-confirmEmail-error"
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
        inputTestId="RegisterForm-username"
        errorTestId="RegisterForm-username-error"
        label="Username"
        helperText={helperText.newUn}
        {...form.register("username", usernameValidation)}
      />
      <FormControl
        formRef={form}
        registerKey="password"
        placeholder="Enter password"
        label="Password"
        inputTestId="RegisterForm-password"
        errorTestId="RegisterForm-password-error"
        helperText={helperText.newPwd}
        password={true}
        {...form.register("password", passwordValidation)}
      />
      <Button
        type="submit"
        data-cy="RegisterForm-submit"
        w={"full"}
        isLoading={form.formState.isSubmitting}
      >
        Submit
      </Button>
    </form>
  );
}
