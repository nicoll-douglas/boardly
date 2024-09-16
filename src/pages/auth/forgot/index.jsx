import { FormModal } from "@/components/common";
import { ForgotPwdForm, Optimistic } from "@/features/auth";

export default function Forgot() {
  return (
    <Optimistic>
      <FormModal isOpen={true} heading="Forgot Password" motionPreset={"none"}>
        <ForgotPwdForm />
      </FormModal>
    </Optimistic>
  );
}
