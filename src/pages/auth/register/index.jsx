import { FormModal } from "@/components/common";
import { RegisterForm, Optimistic } from "@/features/auth";

export default function Register() {
  return (
    <Optimistic>
      <FormModal isOpen={true} motionPreset="none" heading="Sign Up">
        <RegisterForm />
      </FormModal>
    </Optimistic>
  );
}
