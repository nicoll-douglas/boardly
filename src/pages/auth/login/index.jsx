import { FormModal } from "@/components/common";
import { LoginForm } from "@/features/auth";
import { Optimistic } from "@/components/utility";

export default function Login() {
  return (
    <Optimistic>
      <FormModal isOpen={true} motionPreset="none" heading="Login">
        <LoginForm />
      </FormModal>
    </Optimistic>
  );
}
