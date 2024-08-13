import FormControl from "@/components/form/FormControl";
import { useForm } from "react-hook-form";

export default function RegisterForm() {
  const form = useForm({ shouldUnregister: true });

  return (
    <form>
      <FormControl
        formRef={form}
        registerKey={"email"}
        placeholder="Enter email"
        label="Email"
        helperText="We'll use your email to help you sign up"
        helpersAsList={false}
      />
    </form>
  );
}
