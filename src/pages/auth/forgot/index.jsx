import FormModal from "@/components/common/FormModal";
import ForgotPwdForm from "@/features/auth/components/ForgotPwdForm";

export default function Forgot() {
  return (
    <FormModal isOpen={true} heading="Forgot Password" motionPreset={"none"}>
      <ForgotPwdForm />
    </FormModal>
  );
}
