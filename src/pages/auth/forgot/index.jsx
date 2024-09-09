import FormModal from "@/components/common/FormModal";
import ForgotPwdForm from "@/features/auth/passwordReset/components/ForgotPwdForm";

export default function ForgotPasswordPage() {
  return (
    <FormModal isOpen={true} heading="Forgot Password" motionPreset={"none"}>
      <ForgotPwdForm />
    </FormModal>
  );
}
