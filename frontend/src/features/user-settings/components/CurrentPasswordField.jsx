import * as Ch from "@chakra-ui/react";
import { PasswordInput } from "@/components/form";

export default function CurrentPasswordField({ form }) {
  return (
    <Ch.FormControl
      isRequired
      isInvalid={form.formState.errors.currentPassword}
      mb={6}
    >
      <Ch.FormLabel>Current Password</Ch.FormLabel>
      <PasswordInput
        placeholder="Enter current password"
        {...form.register("currentPassword", {
          required: "Please enter your current password",
        })}
      />
      <Ch.FormErrorMessage>
        {form.formState.errors.currentPassword?.message}
      </Ch.FormErrorMessage>
    </Ch.FormControl>
  );
}
