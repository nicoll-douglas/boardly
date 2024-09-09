import FormModal from "@/components/common/FormModal";
import RegisterForm from "@/features/auth/components/RegisterForm";

export default function Register() {
  return (
    <FormModal isOpen={true} motionPreset="none" heading="Sign Up">
      <RegisterForm />
    </FormModal>
  );
}
