import { FormModal } from "@/components/common";
import { ForgotPwdForm } from "@/features/auth";
import { Optimistic } from "@/components/utility";

export default function Forgot() {
  return (
    <Optimistic>
      <FormModal isOpen={true} heading="Forgot Password" motionPreset={"none"}>
        <ForgotPwdForm />
      </FormModal>
    </Optimistic>
  );
}
