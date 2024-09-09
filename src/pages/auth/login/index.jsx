import FormModal from "@/components/common/FormModal";
import LoginForm from "@/features/auth/components/LoginForm";

export default function Login() {
  return (
    <FormModal isOpen={true} motionPreset="none" heading="Login">
      <LoginForm />
    </FormModal>
  );
}
