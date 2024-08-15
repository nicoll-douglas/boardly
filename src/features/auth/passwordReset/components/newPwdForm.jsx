import FormControl from "@/components/form/FormControl";
import { useForm } from "react-hook-form";
import { newPwdHelperText } from "@/lib/constants/helperText";
import passwordValidation from "@/features/auth/register/data/passwordValidation";
import { Button } from "@chakra-ui/react";
import useNewPwd from "../hooks/useNewPwd";

export default function NewPwdForm({ token }) {
  const form = useForm();
  const onSubmit = useNewPwd(form, token);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormControl
        formRef={form}
        registerKey="password"
        placeholder="Enter password"
        label="Password"
        helperText={newPwdHelperText}
        type="password"
        {...form.register("password", passwordValidation)}
      />
      <FormControl
        formRef={form}
        registerKey="confirmPassword"
        placeholder="Re-enter password"
        label="Confirm password"
        type="password"
        {...form.register("confirmPassword", {
          required: "Please confirm your new password",
          validate: (value) =>
            value === form.getValues("password") || "Passwords do not match",
        })}
      />
      <Button type="submit" w="full" isLoading={form.formState.isSubmitting}>
        Submit
      </Button>
    </form>
  );
}
