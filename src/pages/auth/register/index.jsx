import FormModal from "@/components/common/FormModal";
import RegisterForm from "@/features/auth/components/RegisterForm";
import Optimistic from "@/components/utility/Optimistic";

export default function Register() {
  return (
    <Optimistic>
      <FormModal isOpen={true} motionPreset="none" heading="Sign Up">
        <RegisterForm />
      </FormModal>
    </Optimistic>
  );
}
