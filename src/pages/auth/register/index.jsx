import { FormModal } from "@/components/common";
import { RegisterForm } from "@/features/auth";
import { Optimistic } from "@/components/utility";

export default function Register() {
  return (
    <Optimistic>
      <FormModal isOpen={true} motionPreset="none" heading="Sign Up">
        <RegisterForm />
      </FormModal>
    </Optimistic>
  );
}
