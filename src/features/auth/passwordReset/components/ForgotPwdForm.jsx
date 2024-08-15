import FormControl from "@/components/form/FormControl";
import { Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useForgotPassword from "../hooks/useForgotPassword";

export default function ForgotPwdForm() {
  const form = useForm();
  const onSubmit = useForgotPassword(form);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormControl
        formRef={form}
        registerKey="email"
        placeholder="Enter email"
        label="Email"
        helperText="We'll send you an email to help you reset your password."
        helpersAsList={false}
        {...form.register("email", { required: "Email is required" })}
      />
      <FormControl
        formRef={form}
        registerKey="confirmEmail"
        placeholder="Re-enter email"
        label="Confirm email"
        {...form.register("confirmEmail", {
          required: "Please confirm your email",
          validate: (value) =>
            value === form.getValues("email") || "Emails do not match",
        })}
      />
      <Button type="Submit" w={"full"} isLoading={form.formState.isSubmitting}>
        Submit
      </Button>
    </form>
  );
}
