import { FormModal } from "@/components/common";
import { ForgotPwdForm } from "@/features/auth";

export default function Forgot() {
  return (
    <FormModal isOpen={true} heading="Forgot Password" motionPreset={"none"}>
      <ForgotPwdForm />
    </FormModal>
  );
}
