import FormModal from "@/components/common/FormModal";
import LoginForm from "@/features/auth/components/LoginForm";
import Optimistic from "@/components/utility/Optimistic";

export default function Login() {
  return (
    <Optimistic>
      <FormModal isOpen={true} motionPreset="none" heading="Login">
        <LoginForm />
      </FormModal>
    </Optimistic>
  );
}
