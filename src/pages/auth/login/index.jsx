import { FormModal } from "@/components/common";
import { LoginForm, Optimistic } from "@/features/auth";

export default function Login() {
  return (
    <Optimistic>
      <FormModal isOpen={true} motionPreset="none" heading="Login">
        <LoginForm />
      </FormModal>
    </Optimistic>
  );
}
